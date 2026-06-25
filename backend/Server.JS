// ============================================================
//  NihonGo! — Express API Server
//  Jalankan: node server.js
// ============================================================
const express = require("express");
const cors    = require("cors");
const pool    = require("./db");

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────
app.get("/", (_req, res) => {
  res.json({ message: "NihonGo! API berjalan ✓", version: "1.0" });
});

// ─────────────────────────────────────────────────────────────
//  LEVEL JLPT
// ─────────────────────────────────────────────────────────────
// GET /api/level
app.get("/api/level", async (_req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM level_jlpt ORDER BY nama DESC" // N5 dulu
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  KANJI
// ─────────────────────────────────────────────────────────────
// GET /api/kanji?level=N5          → list kanji per level
// GET /api/kanji?level=N5&limit=20 → dengan limit
app.get("/api/kanji", async (req, res) => {
  try {
    const { level, limit } = req.query;

    let query = `
      SELECT k.*, lj.nama AS level_nama
      FROM kanji k
      LEFT JOIN level_jlpt lj ON lj.id_jlpt = k.id_jlpt
    `;
    const params = [];

    if (level) {
      params.push(level.toUpperCase());
      query += ` WHERE lj.nama = $${params.length}`;
    }

    query += " ORDER BY k.karakter";

    if (limit) {
      params.push(parseInt(limit));
      query += ` LIMIT $${params.length}`;
    }

    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/kanji/:id → detail satu kanji
app.get("/api/kanji/:id", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT k.*, lj.nama AS level_nama
       FROM kanji k
       LEFT JOIN level_jlpt lj ON lj.id_jlpt = k.id_jlpt
       WHERE k.id_kanji = $1`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Kanji tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/kanji → tambah kanji baru
app.post("/api/kanji", async (req, res) => {
  const { id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count } = req.body;
  if (!karakter || !arti) return res.status(400).json({ error: "karakter dan arti wajib diisi" });
  try {
    const { rows } = await pool.query(
      `INSERT INTO kanji (id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  KANA
// ─────────────────────────────────────────────────────────────
// GET /api/kana?type=hiragana  atau  ?type=katakana
app.get("/api/kana", async (req, res) => {
  try {
    const { type } = req.query;
    let query  = "SELECT * FROM kana";
    const params = [];
    if (type) {
      params.push(type.toLowerCase());
      query += " WHERE type = $1";
    }
    query += " ORDER BY id_kana";
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  QUIZ
// ─────────────────────────────────────────────────────────────
// GET /api/quiz              → semua quiz
// GET /api/quiz?level=N5     → quiz per level
app.get("/api/quiz", async (req, res) => {
  try {
    const { level } = req.query;
    let query = `
      SELECT q.*, lj.nama AS level_nama,
             COUNT(p.id_pertanyaan) AS jumlah_soal
      FROM quiz q
      LEFT JOIN level_jlpt lj ON lj.id_jlpt = q.id_jlpt
      LEFT JOIN pertanyaan  p  ON p.id_quiz  = q.id_quiz
    `;
    const params = [];
    if (level) {
      params.push(level.toUpperCase());
      query += ` WHERE lj.nama = $${params.length}`;
    }
    query += " GROUP BY q.id_quiz, lj.nama ORDER BY q.id_quiz";
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/quiz/:id → detail quiz + semua pertanyaan & jawaban
app.get("/api/quiz/:id", async (req, res) => {
  try {
    // Info quiz
    const quizRes = await pool.query(
      `SELECT q.*, lj.nama AS level_nama
       FROM quiz q
       LEFT JOIN level_jlpt lj ON lj.id_jlpt = q.id_jlpt
       WHERE q.id_quiz = $1`,
      [req.params.id]
    );
    if (!quizRes.rows.length) return res.status(404).json({ error: "Quiz tidak ditemukan" });

    // Pertanyaan + jawaban
    const pertRes = await pool.query(
      `SELECT p.id_pertanyaan, p.pertanyaan,
              json_agg(
                json_build_object(
                  'id_jawaban',      j.id_jawaban,
                  'pilihan_jawaban', j.pilihan_jawaban,
                  'jawaban_benar',   j.jawaban_benar
                ) ORDER BY j.id_jawaban
              ) AS jawaban
       FROM pertanyaan p
       LEFT JOIN jawaban j ON j.id_pertanyaan = p.id_pertanyaan
       WHERE p.id_quiz = $1
       GROUP BY p.id_pertanyaan
       ORDER BY p.id_pertanyaan`,
      [req.params.id]
    );

    res.json({ ...quizRes.rows[0], pertanyaan: pertRes.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  KATEGORI
// ─────────────────────────────────────────────────────────────
app.get("/api/kategori", async (_req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM kategori ORDER BY nama");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  ARTIKEL
// ─────────────────────────────────────────────────────────────
// GET /api/artikel                    → semua artikel
// GET /api/artikel?kategori=kosakata  → filter by slug kategori
app.get("/api/artikel", async (req, res) => {
  try {
    const { kategori } = req.query;
    let query = `
      SELECT a.id_artikel, a.judul, a.slug, a.gambar,
             k.nama AS kategori_nama, k.slug AS kategori_slug
      FROM artikel a
      LEFT JOIN kategori k ON k.id_kategori = a.id_kategori
    `;
    const params = [];
    if (kategori) {
      params.push(kategori);
      query += ` WHERE k.slug = $${params.length}`;
    }
    query += " ORDER BY a.id_artikel DESC";
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/artikel/:slug → isi lengkap satu artikel
app.get("/api/artikel/:slug", async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT a.*, k.nama AS kategori_nama, k.slug AS kategori_slug
       FROM artikel a
       LEFT JOIN kategori k ON k.id_kategori = a.id_kategori
       WHERE a.slug = $1`,
      [req.params.slug]
    );
    if (!rows.length) return res.status(404).json({ error: "Artikel tidak ditemukan" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────
//  START SERVER
// ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ NihonGo! API berjalan di http://localhost:${PORT}`);
});