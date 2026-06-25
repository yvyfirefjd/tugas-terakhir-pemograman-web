import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Kanji.css";

const JLPT_LEVELS = [5, 4, 3, 2, 1];
const API = "http://localhost:5000/api"; // ← backend Express + PostgreSQL

// Bacaan on/kun disimpan sebagai teks dipisah koma di database,
// contoh: "ニチ、ジツ" → diubah jadi array untuk ditampilkan per chip
function splitReadings(str) {
  if (!str) return [];
  return str.split(/[、,]/).map((s) => s.trim()).filter(Boolean);
}

export default function Kanji() {
  // ── State ──────────────────────────────────────────────
  const [level, setLevel]             = useState(5);
  const [kanjiList, setKanjiList]     = useState([]); // array objek kanji dari DB
  const [selected, setSelected]       = useState(null); // id_kanji yang dipilih
  const [detail, setDetail]           = useState(null);
  const [loadingList, setLoadingList] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [errorList, setErrorList]     = useState(null);
  const [errorDetail, setErrorDetail] = useState(null);

  // ── Fetch daftar kanji setiap level berubah ────────────
  useEffect(() => {
    setKanjiList([]);
    setSelected(null);
    setDetail(null);
    setErrorList(null);
    setLoadingList(true);

    axios
      .get(`${API}/kanji`, { params: { level: `N${level}` } })
      .then((res) => setKanjiList(res.data))
      .catch(() =>
        setErrorList("Gagal memuat daftar kanji. Pastikan server backend (node server.js) berjalan.")
      )
      .finally(() => setLoadingList(false));
  }, [level]);

  // ── Fetch detail satu kanji by id ───────────────────────
  const handleSelectKanji = (item) => {
    if (selected === item.id_kanji) {
      setSelected(null);
      setDetail(null);
      return;
    }
    setSelected(item.id_kanji);
    setDetail(null);
    setErrorDetail(null);
    setLoadingDetail(true);

    axios
      .get(`${API}/kanji/${item.id_kanji}`)
      .then((res) => setDetail(res.data))
      .catch(() => setErrorDetail("Gagal memuat detail kanji."))
      .finally(() => setLoadingDetail(false));
  };

  const closeDetail = () => {
    setSelected(null);
    setDetail(null);
  };

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="kanji-page">
      {/* Header */}
      <div className="kanji-hero">
        <div className="kanji-hero__deco">漢字</div>
        <h1 className="kanji-hero__title">Daftar Kanji</h1>
        <p className="kanji-hero__sub">
          Pilih level JLPT lalu klik kanji untuk melihat informasi lengkapnya
        </p>

        {/* JLPT Filter */}
        <div className="kanji-filter">
          {JLPT_LEVELS.map((n) => (
            <button
              key={n}
              className={`kanji-filter__btn kanji-filter__btn--n${n} ${level === n ? "active" : ""}`}
              onClick={() => setLevel(n)}
            >
              N{n}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout */}
      <div className="kanji-layout">
        {/* Grid kanji */}
        <div className="kanji-grid-wrap">
          {/* Loading list */}
          {loadingList && (
            <div className="kanji-status">
              <div className="kanji-spinner" />
              <span>Memuat kanji N{level}...</span>
            </div>
          )}

          {/* Error list */}
          {errorList && <div className="kanji-error">{errorList}</div>}

          {/* Kosong (belum ada data di DB untuk level ini) */}
          {!loadingList && !errorList && kanjiList.length === 0 && (
            <div className="kanji-error" style={{ background: "#f5f5f5", borderColor: "#ddd", color: "#888" }}>
              Belum ada kanji untuk level N{level} di database.
            </div>
          )}

          {/* Info jumlah */}
          {!loadingList && !errorList && kanjiList.length > 0 && (
            <p className="kanji-count">
              <span>{kanjiList.length}</span> kanji ditemukan untuk level N{level}
            </p>
          )}

          {/* Grid */}
          <div className="kanji-grid">
            {kanjiList.map((item) => (
              <button
                key={item.id_kanji}
                className={`kanji-card ${selected === item.id_kanji ? "kanji-card--active" : ""}`}
                onClick={() => handleSelectKanji(item)}
                title={item.karakter}
              >
                {item.karakter}
              </button>
            ))}
          </div>
        </div>

        {/* Panel detail */}
        {selected && (
          <div className="kanji-detail">
            <button className="kanji-detail__close" onClick={closeDetail}>✕</button>

            {loadingDetail && (
              <div className="kanji-status">
                <div className="kanji-spinner" />
                <span>Memuat detail...</span>
              </div>
            )}

            {errorDetail && <div className="kanji-error">{errorDetail}</div>}

            {detail && !loadingDetail && (
              <>
                {/* Karakter besar */}
                <div className="kanji-detail__char">{detail.karakter}</div>

                {/* Badge level & stroke */}
                <div className="kanji-detail__badges">
                  {detail.level_nama && (
                    <span className={`kanji-badge kanji-badge--${detail.level_nama.toLowerCase()}`}>
                      JLPT {detail.level_nama}
                    </span>
                  )}
                  {detail.stroke_count && (
                    <span className="kanji-badge kanji-badge--stroke">
                      {detail.stroke_count} stroke
                    </span>
                  )}
                </div>

                {/* Arti */}
                <div className="kanji-detail__section">
                  <h3 className="kanji-detail__label">Arti</h3>
                  <p className="kanji-detail__meanings">
                    {detail.arti || "—"}
                  </p>
                </div>

                {/* Bacaan On */}
                <div className="kanji-detail__section">
                  <h3 className="kanji-detail__label">Bacaan On <span>音読み</span></h3>
                  <div className="kanji-detail__readings">
                    {splitReadings(detail.onyomi).length > 0
                      ? splitReadings(detail.onyomi).map((r) => (
                          <span key={r} className="kanji-reading kanji-reading--on">{r}</span>
                        ))
                      : <span className="kanji-reading__empty">—</span>}
                  </div>
                </div>

                {/* Bacaan Kun */}
                <div className="kanji-detail__section">
                  <h3 className="kanji-detail__label">Bacaan Kun <span>訓読み</span></h3>
                  <div className="kanji-detail__readings">
                    {splitReadings(detail.kunyomi).length > 0
                      ? splitReadings(detail.kunyomi).map((r) => (
                          <span key={r} className="kanji-reading kanji-reading--kun">{r}</span>
                        ))
                      : <span className="kanji-reading__empty">—</span>}
                  </div>
                </div>

                {/* ID di database (pengganti unicode) */}
                <div className="kanji-detail__footer">
                  ID Database: #{detail.id_kanji}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}