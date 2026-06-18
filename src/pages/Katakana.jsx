import React, { useState } from "react";
import "../styles/Katakana.css";

const KATAKANA_DATA = [
  { kana: "ア", romaji: "a", contoh: "アメリカ (amerika)", arti: "Amerika" },
  { kana: "イ", romaji: "i", contoh: "イギリス (igirisu)", arti: "Inggris" },
  { kana: "ウ", romaji: "u", contoh: "ウサギ (usagi)", arti: "Kelinci" },
  { kana: "エ", romaji: "e", contoh: "エアコン (eakon)", arti: "AC" },
  { kana: "オ", romaji: "o", contoh: "オレンジ (orenji)", arti: "Jeruk" },
  { kana: "カ", romaji: "ka", contoh: "カメラ (kamera)", arti: "Kamera" },
  { kana: "キ", romaji: "ki", contoh: "ギター (gitaa)", arti: "Gitar" },
  { kana: "ク", romaji: "ku", contoh: "クラス (kurasu)", arti: "Kelas" },
  { kana: "ケ", romaji: "ke", contoh: "ケーキ (keeki)", arti: "Kue" },
  { kana: "コ", romaji: "ko", contoh: "コイン (koin)", arti: "Koin" },
  { kana: "サ", romaji: "sa", contoh: "サラダ (sarada)", arti: "Salad" },
  { kana: "シ", romaji: "shi", contoh: "シャツ (shatsu)", arti: "Kemeja" },
  { kana: "ス", romaji: "su", contoh: "スポーツ (supootsu)", arti: "Olahraga" },
  { kana: "セ", romaji: "se", contoh: "セーター (seetaa)", arti: "Sweter" },
  { kana: "ソ", romaji: "so", contoh: "ソファ (sofa)", arti: "Sofa" },
  { kana: "タ", romaji: "ta", contoh: "タクシー (takushii)", arti: "Taksi" },
  { kana: "チ", romaji: "chi", contoh: "チーム (chiimu)", arti: "Tim" },
  { kana: "ツ", romaji: "tsu", contoh: "ツアー (tsuaa)", arti: "Tur" },
  { kana: "テ", romaji: "te", contoh: "テスト (tesuto)", arti: "Ujian" },
  { kana: "ト", romaji: "to", contoh: "トイレ (toire)", arti: "Toilet" },
  { kana: "ナ", romaji: "na", contoh: "ナイフ (naifu)", arti: "Pisau" },
  { kana: "ニ", romaji: "ni", contoh: "ニュース (nyuusu)", arti: "Berita" },
  { kana: "ヌ", romaji: "nu", contoh: "ヌードル (nuudoru)", arti: "Mie" },
  { kana: "ネ", romaji: "ne", contoh: "ネクタイ (nekutai)", arti: "Dasi" },
  { kana: "ノ", romaji: "no", contoh: "ノート (nooto)", arti: "Buku Catatan" },
  { kana: "ハ", romaji: "ha", contoh: "ハム (hamu)", arti: "Daging Ham" },
  { kana: "ヒ", romaji: "hi", contoh: "ヒーロー (hiiroo)", arti: "Pahlawan" },
  { kana: "フ", romaji: "fu", contoh: "フィルム (firumu)", arti: "Film" },
  { kana: "ヘ", romaji: "he", contoh: "ヘリコプター (herikoputaa)", arti: "Helikopter" },
  { kana: "ホ", romaji: "ho", contoh: "ホテル (hoteru)", arti: "Hotel" },
  { kana: "マ", romaji: "ma", contoh: "マッチ (macchi)", arti: "Korek Api" },
  { kana: "ミ", romaji: "mi", contoh: "ミルク (miruku)", arti: "Susu" },
  { kana: "む", romaji: "mu", contoh: "ムービー (muubii)", arti: "Film" },
  { kana: "メ", romaji: "me", contoh: "メーター (meetaa)", arti: "Meteran" },
  { kana: "モ", romaji: "mo", contoh: "モデル (moderau)", arti: "Model" },
  { kana: "ヤ", romaji: "ya", contoh: "ヤード (yaado)", arti: "Yar" },
  { kana: "ユ", romaji: "yu", contoh: "ユニフォーム (yunifoomu)", arti: "Seragam" },
  { kana: "よ", romaji: "yo", contoh: "ヨーグルト (yooguruto)", arti: "Yoghurt" },
  { kana: "ラ", romaji: "ra", contoh: "ラジオ (rajio)", arti: "Radio" },
  { kana: "リ", romaji: "ri", contoh: "リボン (ribon)", arti: "Pita" },
  { kana: "ル", romaji: "ru", contoh: "ルール (ruuru)", arti: "Aturan" },
  { kana: "レ", romaji: "re", contoh: "レストラン (resutoran)", arti: "Restoran" },
  { kana: "ロ", romaji: "ro", contoh: "ロボット (robotto)", arti: "Robot" },
  { kana: "ワ", romaji: "wa", contoh: "ワイン (wain)", arti: "Anggur/Wine" },
  { kana: "ヲ", romaji: "wo", contoh: "ヲタ芸 (wotagei)", arti: "Tarian Otaku" },
  { kana: "ン", romaji: "n", contoh: "ラーメン (raamen)", arti: "Ramen" }
];

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
  const [selected, setSelected] = useState(KATAKANA_DATA[0]);
  const [search, setSearch] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const filteredData = KATAKANA_DATA.filter(
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

  return (
    <div className="kata-page-wrapper">
      <div className="kata-hero">
        <h1>Katakana</h1>
        <p>Pahami cara penulisan kata serapan asing, nama negara, dan istilah teknologi dalam bahasa Jepang modern.</p>
      </div>

      <div className="kata-main-container">
        <section className="kata-intro-section">
          <div className="kata-intro-card">
            <h3>Fungsi Huruf Katakana</h3>
            <p>Katakana (カタカナ) digunakan khusus untuk menuliskan kata-kata yang berasal dari bahasa asing (gairaigo), nama orang asing, nama negara di luar Jepang, suara tiruan (onomatope), serta memberikan penekanan estetika pada teks tertentu seperti dalam komik atau dokumen teknis.</p>
          </div>
        </section>

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

            <div className="kata-alphabet-grid">
              {filteredData.map((item, idx) => (
                <div
                  key={idx}
                  className={`kata-item-card ${selected.kana === item.kana ? "active-item" : ""}`}
                  onClick={() => setSelected(item)}
                >
                  <div className="kata-char">{item.kana}</div>
                  <div className="kata-sub">{item.romaji}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="kata-right-panel">
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