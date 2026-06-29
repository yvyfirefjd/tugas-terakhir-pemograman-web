import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Hiragana.css";

const API = "http://localhost:5000/api"; // ← backend Express + PostgreSQL

// Kuis sederhana tetap statis di frontend — bukan dari database,
// karena ini hanya latihan ringan tebak romaji, bukan bagian dari
// fitur Kuis Kanji (yang sudah pakai tabel quiz/pertanyaan/jawaban).
const QUIZ_DATA = [
  { question: "あ", options: ["a", "i", "u", "e"], answer: "a" },
  { question: "き", options: ["ka", "ki", "ku", "ke"], answer: "ki" },
  { question: "し", options: ["si", "chi", "shi", "hi"], answer: "shi" },
  { question: "つ", options: ["tu", "tsu", "su", "chu"], answer: "tsu" },
  { question: "ね", options: ["ne", "re", "wa", "nu"], answer: "ne" },
];

export default function Hiragana() {
  // ── State data dari backend ────────────────────────────────
  const [hiraganaData, setHiraganaData] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  // ── State UI ────────────────────────────────────────────────
  const [selected, setSelected]     = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // ── State kuis ──────────────────────────────────────────────
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore]                     = useState(0);
  const [showScore, setShowScore]              = useState(false);
  const [selectedAnswer, setSelectedAnswer]    = useState("");

  // ── Fetch data hiragana dari database ──────────────────────
  useEffect(() => {
    axios
      .get(`${API}/hiragana`)
      .then((res) => {
        setHiraganaData(res.data);
        setSelected(res.data[0] || null);
      })
      .catch(() =>
        setError("Gagal memuat data hiragana. Pastikan server backend (node server.js) berjalan.")
      )
      .finally(() => setLoading(false));
  }, []);

  const filteredData = hiraganaData.filter(
    (item) =>
      item.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.karakter.includes(searchTerm)
  );

  const handleAnswerClick = (option) => {
    setSelectedAnswer(option);
    if (option === QUIZ_DATA[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < QUIZ_DATA.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer("");
      } else {
        setShowScore(true);
      }
    }, 600);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer("");
  };

  return (
    <div className="hira-page-wrapper">
      <div className="hira-hero">
        <h1>Hiragana</h1>
        <p>Pahami fondasi utama penulisan bahasa Jepang untuk menulis kata asli, partikel, dan tata bahasa.</p>
      </div>

      <div className="hira-main-container">
        <section className="hira-intro-section">
          <div className="hira-intro-card">
            <h3>Apa itu Hiragana?</h3>
            <p>Hiragana (ひらがな) adalah sistem aksara fonetik utama dalam bahasa Jepang. Terdiri dari 46 karakter dasar, Hiragana merepresentasikan setiap suku kata tunggal yang digunakan untuk menulis kata asli Jepang, partikel struktur kalimat, serta konjugasi kata kerja (okurigana).</p>
          </div>
          <div className="hira-intro-card">
            <h3>Manfaat Mempelajari Hiragana</h3>
            <ul>
              <li>Fondasi membaca teks asli Jepang tingkat dasar.</li>
              <li>Mempermudah pelafalan suku kata bahasa Jepang dengan tepat.</li>
              <li>Syarat mutlak untuk melangkah ke materi tata bahasa dan huruf Kanji.</li>
            </ul>
          </div>
        </section>

        <section className="hira-workspace">
          <div className="hira-left-panel">
            <div className="hira-filter-box">
              <input
                type="text"
                placeholder="Cari Romaji atau Karakter Hiragana..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Loading */}
            {loading && <p className="hira-status">Memuat data hiragana...</p>}

            {/* Error */}
            {error && !loading && <p className="hira-status hira-status--error">{error}</p>}

            {/* Grid */}
            {!loading && !error && (
              <div className="hira-alphabet-grid">
                {filteredData.map((item) => (
                  <div
                    key={item.id_hiragana}
                    className={`hira-item-card ${selected?.id_hiragana === item.id_hiragana ? "active-item" : ""}`}
                    onClick={() => setSelected(item)}
                  >
                    <div className="hira-char">{item.karakter}</div>
                    <div className="hira-sub">{item.romaji}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="hira-right-panel">
            {selected && (
              <div className="hira-sticky-detail">
                <div className="hira-detail-header">
                  <h2>{selected.karakter}</h2>
                  <span>{selected.romaji.toUpperCase()}</span>
                </div>
                <div className="hira-detail-body">
                  <div className="detail-row">
                    <strong>Cara Baca:</strong>
                    <p>{selected.pengucapan}</p>
                  </div>
                  <div className="detail-row">
                    <strong>Contoh Kata:</strong>
                    <p className="jp-text">{selected.contoh}</p>
                  </div>
                  <div className="detail-row">
                    <strong>Arti Kata:</strong>
                    <p>{selected.arti}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="hira-study-tips">
          <h2>Tips Cepat Menguasai Hiragana</h2>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>1. Metode Asosiasi Gambar</h4>
              <p>Gunakan kartu memori (*flashcard*) bergambar yang menyerupai bentuk huruf Hiragana untuk memicu ingatan visual jangka panjang.</p>
            </div>
            <div className="tip-card">
              <h4>2. Latihan Menulis Konsisten</h4>
              <p>Ikuti urutan goresan (*stroke order*) yang benar. Menulis secara berulang akan membentuk memori otot (*muscle memory*).</p>
            </div>
            <div className="tip-card">
              <h4>3. Membaca Teks Ber-Furigana</h4>
              <p>Cobalah membaca bacaan anak-anak atau lirik lagu Jepang yang menampilkan Hiragana kecil di atas huruf Kanji.</p>
            </div>
          </div>
        </section>

        <section className="hira-quiz-container">
          <h2>Uji Kemampuan Anda</h2>
          <div className="quiz-card-wrapper">
            {showScore ? (
              <div className="quiz-result-view">
                <h3>Kuis Selesai!</h3>
                <p className="score-display">Skor Anda: <span>{score}</span> / {QUIZ_DATA.length}</p>
                <button className="hira-primary-btn" onClick={restartQuiz}>Coba Lagi</button>
              </div>
            ) : (
              <div className="quiz-active-view">
                <p className="quiz-progress">Pertanyaan {currentQuestion + 1} dari {QUIZ_DATA.length}</p>
                <div className="quiz-target-char">{QUIZ_DATA[currentQuestion].question}</div>
                <p className="quiz-question-text">Pilih opsi Romaji yang tepat untuk karakter di atas:</p>
                <div className="quiz-options-grid">
                  {QUIZ_DATA[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      className={`quiz-option-btn ${selectedAnswer === option ? "chosen" : ""}`}
                      onClick={() => handleAnswerClick(option)}
                      disabled={selectedAnswer !== ""}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="hira-motivation-footer">
          <div className="motivation-inner">
            <h3>"Perjalanan Seribu Mil Dimulai dari Satu Langkah Kecil"</h3>
            <p>Menguasai Hiragana adalah gerbang emas utama Anda dalam memahami kebudayaan dan pengetahuan bahasa Jepang. Tetap semangat!</p>
          </div>
        </section>
      </div>
    </div>
  );
}