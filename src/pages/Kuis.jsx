import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Kuis.css";

const API = "http://localhost:5000/api";

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Kuis() {
  const [phase, setPhase]       = useState("select"); // select | loading | playing | result
  const [quizList, setQuizList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ]   = useState(0);
  const [chosen, setChosen]       = useState(null);
  const [answered, setAnswered]   = useState(false);
  const [score, setScore]         = useState(0);
  const [results, setResults]     = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [error, setError]         = useState(null);

  // ── Ambil daftar quiz dari backend ─────────────────────────
  useEffect(() => {
    axios
      .get(`${API}/quiz`)
      .then((res) => setQuizList(res.data))
      .catch(() => setError("Gagal memuat daftar kuis."))
      .finally(() => setLoadingList(false));
  }, []);

  // ── Mulai kuis ─────────────────────────────────────────────
  const startQuiz = async () => {
    if (!selectedQuiz) return;
    setPhase("loading");
    setError(null);

    try {
      // Ambil detail quiz + semua pertanyaan & jawaban dari backend
      const res = await axios.get(`${API}/quiz/${selectedQuiz.id_quiz}`);
      const data = res.data;

      // Bangun array soal — shuffle urutan jawaban
      const qs = data.pertanyaan.map((p) => ({
        id: p.id_pertanyaan,
        pertanyaan: p.pertanyaan,
        // Karakter kanji dari teks pertanyaan (opsional, diambil jika ada)
        kanji: extractKanji(p.pertanyaan),
        jawaban: shuffle(p.jawaban),
        benar: p.jawaban.find((j) => j.jawaban_benar)?.pilihan_jawaban,
      }));

      setQuestions(shuffle(qs));
      setCurrentQ(0);
      setScore(0);
      setResults([]);
      setChosen(null);
      setAnswered(false);
      setPhase("playing");
    } catch {
      setError("Gagal memuat soal kuis.");
      setPhase("select");
    }
  };

  // Ambil karakter kanji dari string pertanyaan (karakter 2–3 byte)
  const extractKanji = (text) => {
    const match = text.match(/[\u4E00-\u9FFF]/g);
    return match ? match[0] : null;
  };

  const handleAnswer = (jawaban) => {
    if (answered) return;
    const q = questions[currentQ];
    const isCorrect = jawaban.jawaban_benar;

    setChosen(jawaban.id_jawaban);
    setAnswered(true);
    if (isCorrect) setScore((s) => s + 1);

    setResults((prev) => [
      ...prev,
      {
        kanji: q.kanji,
        pertanyaan: q.pertanyaan,
        benar: q.benar,
        jawabanUser: jawaban.pilihan_jawaban,
        isCorrect,
      },
    ]);
  };

  const handleNext = () => {
    if (currentQ + 1 >= questions.length) {
      setPhase("result");
    } else {
      setCurrentQ((q) => q + 1);
      setChosen(null);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setPhase("select");
    setSelectedQuiz(null);
    setQuestions([]);
    setScore(0);
    setResults([]);
  };

  const q = questions[currentQ];
  const progress = questions.length > 0 ? ((currentQ) / questions.length) * 100 : 0;
  const scorePercent = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  return (
    <div className="quiz-page">
      {/* Hero */}
      <div className="quiz-hero">
        <div className="quiz-hero__deco">試験</div>
        <h1 className="quiz-hero__title">Kuis Kanji</h1>
        <p className="quiz-hero__sub">Uji pemahamanmu tentang kanji Jepang</p>
      </div>

      <div className="quiz-main">

        {/* ── SELECT ── */}
        {phase === "select" && (
          <div className="quiz-select">
            <h2>Pilih Kuis</h2>

            {loadingList && (
              <div className="quiz-status">
                <div className="quiz-spinner" />
                <span>Memuat daftar kuis...</span>
              </div>
            )}

            {error && <div className="quiz-error">{error}</div>}

            <div className="quiz-list">
              {quizList.map((quiz) => (
                <button
                  key={quiz.id_quiz}
                  className={`quiz-list__item ${selectedQuiz?.id_quiz === quiz.id_quiz ? "quiz-list__item--active" : ""}`}
                  onClick={() => setSelectedQuiz(quiz)}
                >
                  <div className="quiz-list__title">{quiz.judul}</div>
                  <div className="quiz-list__meta">
                    <span className={`quiz-badge quiz-badge--${quiz.level_nama?.toLowerCase()}`}>
                      {quiz.level_nama}
                    </span>
                    <span className="quiz-list__count">{quiz.jumlah_soal} soal</span>
                  </div>
                </button>
              ))}
            </div>

            <button
              className="quiz-start-btn"
              onClick={startQuiz}
              disabled={!selectedQuiz}
            >
              Mulai Kuis →
            </button>
          </div>
        )}

        {/* ── LOADING ── */}
        {phase === "loading" && (
          <div className="quiz-status quiz-status--center">
            <div className="quiz-spinner quiz-spinner--lg" />
            <p>Menyiapkan soal...</p>
            <p className="quiz-status__sub">Mengambil data dari database</p>
          </div>
        )}

        {/* ── PLAYING ── */}
        {phase === "playing" && q && (
          <div className="quiz-playing">
            {/* Progress */}
            <div className="quiz-progress-wrap">
              <div className="quiz-progress-bar">
                <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="quiz-progress-info">
                <span>Soal {currentQ + 1} / {questions.length}</span>
                <span className="quiz-score-live">✓ {score}</span>
              </div>
            </div>

            {/* Soal */}
            <div className="quiz-question-card">
              {q.kanji && <div className="quiz-question__kanji">{q.kanji}</div>}
              <p className="quiz-question__text">{q.pertanyaan}</p>
            </div>

            {/* Pilihan */}
            <div className="quiz-options">
              {q.jawaban.map((j, i) => {
                let cls = "quiz-option";
                if (answered) {
                  if (j.jawaban_benar)           cls += " quiz-option--correct";
                  else if (j.id_jawaban === chosen) cls += " quiz-option--wrong";
                }
                return (
                  <button
                    key={j.id_jawaban}
                    className={cls}
                    onClick={() => handleAnswer(j)}
                    disabled={answered}
                  >
                    <span className="quiz-option__letter">{["A","B","C","D"][i]}</span>
                    <span className="quiz-option__text">{j.pilihan_jawaban}</span>
                    {answered && j.jawaban_benar && <span className="quiz-option__check">✓</span>}
                    {answered && j.id_jawaban === chosen && !j.jawaban_benar && (
                      <span className="quiz-option__x">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {answered && (
              <button className="quiz-next-btn" onClick={handleNext}>
                {currentQ + 1 >= questions.length ? "Lihat Hasil →" : "Soal Berikutnya →"}
              </button>
            )}
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === "result" && (
          <div className="quiz-result">
            <div className="quiz-result__score-card">
              <div className="quiz-result__circle">
                <svg viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="#e8e0d5" strokeWidth="8"/>
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none" stroke="#c0392b" strokeWidth="8"
                    strokeDasharray={`${(scorePercent / 100) * 327} 327`}
                    strokeLinecap="round"
                    transform="rotate(-90 60 60)"
                  />
                </svg>
                <div className="quiz-result__circle-text">
                  <span className="quiz-result__num">{score}</span>
                  <span className="quiz-result__den">/{questions.length}</span>
                </div>
              </div>
              <div className="quiz-result__grade">
                {scorePercent === 100 ? "🎉 Sempurna!" :
                 scorePercent >= 80  ? "✨ Bagus sekali!" :
                 scorePercent >= 60  ? "👍 Cukup baik!" : "📚 Belajar lagi ya!"}
              </div>
              <div className="quiz-result__quiz-name">{selectedQuiz?.judul}</div>
            </div>

            {/* Review */}
            <div className="quiz-review">
              <h3>Review Jawaban</h3>
              {results.map((r, i) => (
                <div key={i} className={`quiz-review__item ${r.isCorrect ? "correct" : "wrong"}`}>
                  {r.kanji && <div className="quiz-review__kanji">{r.kanji}</div>}
                  <div className="quiz-review__info">
                    <div className="quiz-review__q">{r.pertanyaan}</div>
                    {r.isCorrect
                      ? <span className="quiz-review__correct">✓ {r.benar}</span>
                      : <div>
                          <span className="quiz-review__wrong">✗ {r.jawabanUser}</span>
                          <span className="quiz-review__correct"> → {r.benar}</span>
                        </div>
                    }
                  </div>
                </div>
              ))}
            </div>

            <div className="quiz-result__actions">
              <button className="quiz-start-btn" onClick={startQuiz}>
                Ulangi Kuis Ini
              </button>
              <button className="quiz-back-btn" onClick={handleRestart}>
                ← Pilih Kuis Lain
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}