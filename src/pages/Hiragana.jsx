import React, { useState } from "react";
import "../styles/Hiragana.css";

const HIRAGANA_DATA = [
  { kana: "あ", romaji: "a", pengucapan: "Seperti 'a' pada 'Ayah'", contoh: "あさ (asa)", arti: "Pagi" },
  { kana: "い", romaji: "i", pengucapan: "Seperti 'i' pada 'Ibu'", contoh: "いぬ (inu)", arti: "Anjing" },
  { kana: "う", romaji: "u", pengucapan: "Seperti 'u' pada 'Udang'", contoh: "うみ (umi)", arti: "Laut" },
  { kana: "え", romaji: "e", pengucapan: "Seperti 'e' pada 'Ekor'", contoh: "えき (eki)", arti: "Stasiun" },
  { kana: "お", romaji: "o", pengucapan: "Seperti 'o' pada 'Obat'", contoh: "おかね (okane)", arti: "Uang" },
  { kana: "か", romaji: "ka", pengucapan: "K + A", contoh: "かさ (kasa)", arti: "Payung" },
  { kana: "き", romaji: "ki", pengucapan: "K + I", contoh: "きっぷ (kippu)", arti: "Tiket" },
  { kana: "く", romaji: "ku", pengucapan: "K + U", contoh: "くるま (kuruma)", arti: "Mobil" },
  { kana: "け", romaji: "ke", pengucapan: "K + E", contoh: "けいさつ (keisatsu)", arti: "Polisi" },
  { kana: "こ", romaji: "ko", pengucapan: "K + O", contoh: "こころ (kokoro)", arti: "Hati" },
  { kana: "さ", romaji: "sa", pengucapan: "S + A", contoh: "さかな (sakana)", arti: "Ikan" },
  { kana: "し", romaji: "shi", pengucapan: "Diucapkan 'Syi'", contoh: "しお (shio)", arti: "Garam" },
  { kana: "す", romaji: "su", pengucapan: "S + U", contoh: "すし (sushi)", arti: "Sushi" },
  { kana: "せ", romaji: "se", pengucapan: "S + E", contoh: "せんせい (sensei)", arti: "Guru" },
  { kana: "そ", romaji: "so", pengucapan: "S + O", contoh: "そら (sora)", arti: "Langit" },
  { kana: "た", romaji: "ta", pengucapan: "T + A", contoh: "たまご (tamago)", arti: "Telur" },
  { kana: "ち", romaji: "chi", pengucapan: "Diucapkan 'Cyi'", contoh: "ちず (chizu)", arti: "Peta" },
  { kana: "つ", romaji: "tsu", pengucapan: "Diucapkan 'Tsu'", contoh: "つくえ (tsukue)", arti: "Meja" },
  { kana: "て", romaji: "te", pengucapan: "T + E", contoh: "てがみ (tegami)", arti: "Surat" },
  { kana: "と", romaji: "to", pengucapan: "T + O", contoh: "ともだち (tomodachi)", arti: "Teman" },
  { kana: "な", romaji: "na", pengucapan: "N + A", contoh: "なつ (natsu)", arti: "Musim Panas" },
  { kana: "に", romaji: "ni", pengucapan: "N + I", contoh: "にく (niku)", arti: "Daging" },
  { kana: "ぬ", romaji: "nu", pengucapan: "N + U", contoh: "ぬの (nuno)", arti: "Kain" },
  { kana: "ね", romaji: "ne", pengucapan: "N + E", contoh: "ねこ (neko)", arti: "Kucing" },
  { kana: "の", romaji: "no", pengucapan: "N + O", contoh: "のみもの (nomimono)", arti: "Minuman" },
  { kana: "は", romaji: "ha", pengucapan: "H + A (Dibaca 'wa' jika partikel)", contoh: "はな (hana)", arti: "Bunga" },
  { kana: "ひ", romaji: "hi", pengucapan: "H + I", contoh: "ひかり (hikari)", arti: "Cahaya" },
  { kana: "ふ", romaji: "fu", pengucapan: "Antara 'fu' dan 'hu'", contoh: "ふね (fune)", arti: "Kapal" },
  { kana: "へ", romaji: "he", pengucapan: "H + E (Dibaca 'e' jika partikel)", contoh: "へや (heya)", arti: "Kamar" },
  { kana: "ほ", romaji: "ho", pengucapan: "H + O", contoh: "ほん (hon)", arti: "Buku" },
  { kana: "ま", romaji: "ma", pengucapan: "M + A", contoh: "まち (machi)", arti: "Kota" },
  { kana: "み", romaji: "mi", pengucapan: "M + I", contoh: "みず (mizu)", arti: "Air" },
  { kana: "む", romaji: "mu", pengucapan: "M + U", contoh: "むし (mushi)", arti: "Serangga" },
  { kana: "め", romaji: "me", pengucapan: "M + E", contoh: "めがね (megane)", arti: "Kacamata" },
  { kana: "も", romaji: "mo", pengucapan: "M + O", contoh: "もり (mori)", arti: "Hutan" },
  { kana: "や", romaji: "ya", pengucapan: "Y + A", contoh: "やま (yama)", arti: "Gunung" },
  { kana: "ゆ", romaji: "yu", pengucapan: "Y + U", contoh: "ゆき (yuki)", arti: "Salju" },
  { kana: "よ", romaji: "yo", pengucapan: "Y + O", contoh: "よる (yoru)", arti: "Malam" },
  { kana: "ら", romaji: "ra", pengucapan: "R + A (Lidah agak bergetar)", contoh: "らいげつ (raigetsu)", arti: "Bulan Depan" },
  { kana: "り", romaji: "ri", pengucapan: "R + I", contoh: "りんご (ringo)", arti: "Apel" },
  { kana: "る", romaji: "ru", pengucapan: "R + U", contoh: "よる (yoru)", arti: "Malam" },
  { kana: "れ", romaji: "re", pengucapan: "R + E", contoh: "れいぞうこ (reizouko)", arti: "Kulkas" },
  { kana: "ろ", romaji: "ro", pengucapan: "R + O", contoh: "ろく (roku)", arti: "Enam" },
  { kana: "わ", romaji: "wa", pengucapan: "W + A", contoh: "わたしたち (watashitachi)", arti: "Kami" },
  { kana: "を", romaji: "wo", pengucapan: "Dibaca 'o', khusus partikel", contoh: "ほんをよむ (hon wo yomu)", arti: "Membaca buku" },
  { kana: "ん", romaji: "n", pengucapan: "Konsonan penutup 'n/m/ng'", contoh: "にほん (nihon)", arti: "Jepang" }
];

const QUIZ_DATA = [
  { question: "あ", options: ["a", "i", "u", "e"], answer: "a" },
  { question: "き", options: ["ka", "ki", "ku", "ke"], answer: "ki" },
  { question: "し", options: ["si", "chi", "shi", "hi"], answer: "shi" },
  { question: "つ", options: ["tu", "tsu", "su", "chu"], answer: "tsu" },
  { question: "ね", options: ["ne", "re", "wa", "nu"], answer: "ne" }
];

export default function Hiragana() {
  const [selected, setSelected] = useState(HIRAGANA_DATA[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const filteredData = HIRAGANA_DATA.filter(
    (item) =>
      item.romaji.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.kana.includes(searchTerm)
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

            <div className="hira-alphabet-grid">
              {filteredData.map((item, idx) => (
                <div
                  key={idx}
                  className={`hira-item-card ${selected.kana === item.kana ? "active-item" : ""}`}
                  onClick={() => setSelected(item)}
                >
                  <div className="hira-char">{item.kana}</div>
                  <div className="hira-sub">{item.romaji}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hira-right-panel">
            <div className="hira-sticky-detail">
              <div className="hira-detail-header">
                <h2>{selected.kana}</h2>
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