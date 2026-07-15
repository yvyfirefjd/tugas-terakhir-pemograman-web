import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Katakana.css";

const LOAN_WORDS = [
  { word: "テレビ", romaji: "Terebi", origin: "Television", arti: "Televisi" },
  { word: "ホテル", romaji: "Hoteru", origin: "Hotel", arti: "Hotel" },
  { word: "コーヒー", romaji: "Koohii", origin: "Coffee", arti: "Kopi" },
  { word: "スマホ", romaji: "Sumaho", origin: "Smart Phone", arti: "Ponsel Pintar" },
  { word: "レストラン", romaji: "Resutoran", origin: "Restaurant", arti: "Restoran" },
  { word: "パソコン", romaji: "Pasokon", origin: "Personal Computer", arti: "Komputer/Laptop" }
];

const QUIZ_DATA = [
  { question: "エ", options: ["a", "i", "u", "e"], answer: "e" },
  { question: "ケ", options: ["ka", "ki", "ku", "ke"], answer: "ke" },
  { question: "サ", options: ["sa", "shi", "su", "se"], answer: "sa" },
  { question: "ホ", options: ["ha", "hi", "fu", "ho"], answer: "ho" },
  { question: "ル", options: ["ra", "ri", "ru", "re"], answer: "ru" }
];


export default function Katakana() {
  const [katakanaData, setKatakanaData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetching Data dari Express API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/katakana");
        setKatakanaData(response.data);
        if (response.data.length > 0) {
          setSelected(response.data[0]); // Set default selected
        }
      } catch (error) {
        console.error("Gagal mengambil data Katakana:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredData = katakanaData.filter(
    (item) =>
      item.romaji.toLowerCase().includes(search.toLowerCase()) ||
      item.kana.includes(search)
  );

  const handleAnswer = (option) => {
    if (option === QUIZ_DATA[currentQuestion].answer) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < QUIZ_DATA.length) {
      setCurrentQuestion(next);
    } else {
      setShowResult(true);
    }
  };

  const renderGroup = (title, groupType) => {
    const groupItems = filteredData.filter((item) => item.jenis === groupType);
    if (groupItems.length === 0) return null;

    return (
      <div className="kata-group-section" style={{ marginBottom: "2rem" }}>
        <h3 className="kata-group-title" style={{ margin: "1rem 0", color: "#333", borderBottom: "2px solid #eee", paddingBottom: "0.5rem" }}>
          {title}
        </h3>
        <div className="kata-alphabet-grid">
          {groupItems.map((item, idx) => (
            <div
              key={idx}
              className={`kata-item-card ${selected?.kana === item.kana ? "active-item" : ""}`}
              onClick={() => setSelected(item)}
            >
              <div className="kata-char">{item.kana}</div>
              <div className="kata-sub">{item.romaji}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return <div className="loading-state">Memuat data Katakana...</div>;
  }

  return (
    <div className="kata-page-wrapper">
      <div className="kata-hero">
        <h1>Katakana</h1>
        <p>Pahami cara penulisan kata serapan asing, nama negara, dan istilah teknologi dalam bahasa Jepang modern.</p>
      </div>

      <div className="kata-main-container">
        {/* ... (Section intro tetap sama) ... */}

        <section className="kata-workspace">
          <div className="kata-left-panel">
            <div className="kata-search-box">
              <input
                type="text"
                placeholder="Cari Romaji atau Karakter Katakana..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {renderGroup("Katakana Dasar (Gojūon)", "dasar")}
            {renderGroup("Dakuon (Tenten)", "dakuon")}
            {renderGroup("Handakuon (Maru)", "handakuon")}
            {renderGroup("Yoon (Kombinasi)", "yoon")}
          </div>

          <div className="kata-right-panel">
            {selected && (
              <div className="kata-sticky-detail">
                <div className="kata-detail-header">
                  <h2>{selected.kana}</h2>
                  <span>{selected.romaji.toUpperCase()}</span>
                </div>
                <div className="kata-detail-body">
                  <div className="detail-row">
                    <strong>Contoh Kata Serapan:</strong>
                    <p className="jp-text">{selected.contoh}</p>
                  </div>
                  <div className="detail-row">
                    <strong>Arti Istilah:</strong>
                    <p>{selected.arti}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
</section>

        <section className="kata-loanwords-section">
          <h2>Kata Serapan Populer (Gairaigo)</h2>
          <div className="loanwords-grid">
            {LOAN_WORDS.map((item, idx) => (
              <div key={idx} className="loanword-card">
                <span className="lw-jp">{item.word}</span>
                <span className="lw-romaji">{item.romaji}</span>
                <p>Asal: <em>{item.origin}</em></p>
                <strong>Arti: {item.arti}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="comparison-table-section">
          <h2>Tabel Perbandingan Karakter Serupa</h2>
          <div className="table-responsive">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Hiragana</th>
                  <th>Katakana</th>
                  <th>Romaji</th>
                  <th>Poin Perbedaan Desain Visual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="h-accent">へ</td>
                  <td className="k-accent">ヘ</td>
                  <td>he</td>
                  <td>Bentuk Hiragana sedikit melengkung, Katakana bersudut tajam lurus.</td>
                </tr>
                <tr>
                  <td className="h-accent">り</td>
                  <td className="k-accent">リ</td>
                  <td>ri</td>
                  <td>Goresan pertama Hiragana memiliki kait kail, Katakana berupa garis tegas lurus.</td>
                </tr>
                <tr>
                  <td className="h-accent">し</td>
                  <td className="k-accent">シ</td>
                  <td>shi</td>
                  <td>Katakana ditulis dari bawah ke atas, kemiringan goresan berbeda dengan huruf "Tsu" (ツ).</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="kata-quiz-wrapper">
          <h2>Mini Kuis Katakana</h2>
          <div className="quiz-box">
            {showResult ? (
              <div className="quiz-result">
                <h3>Hasil Akhir</h3>
                <p>Anda Menjawab Benar <strong>{score}</strong> dari {QUIZ_DATA.length} Soal.</p>
                <button onClick={() => { setShowResult(false); setCurrentQuestion(0); setScore(0); }} className="kata-btn">Ulangi</button>
              </div>
            ) : (
              <div className="quiz-active">
                <div className="quiz-char-display">{QUIZ_DATA[currentQuestion].question}</div>
                <div className="quiz-options">
                  {QUIZ_DATA[currentQuestion].options.map((opt, i) => (
                    <button key={i} onClick={() => handleAnswer(opt)}>{opt}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}