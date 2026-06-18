import React, { useState } from "react";
import "../styles/KanjiHome.css";

const FAQ_DATA = [
  { 
    q: "Berapa banyak Kanji yang harus dihafal untuk pemula?", 
    a: "Untuk tingkat dasar (JLPT N5), Anda hanya perlu menguasai sekitar 100 karakter dasar yang mewakili angka, arah, alam, dan kata kerja dasar sehari-hari sebelum melangkah ke level berikutnya." 
  },
  { 
    q: "Apa perbedaan mendasar antara On-yomi dan Kun-yomi?", 
    a: "On-yomi adalah cara baca yang diserap dari pelafalan Cina Kuno (biasanya digunakan saat dua Kanji bergabung membentuk kata majemuk), sedangkan Kun-yomi adalah cara baca asli bahasa Jepang (biasanya digunakan saat Kanji berdiri sendiri)." 
  },
  { 
    q: "Bagaimana urutan goresan (Stroke Order) membantu ingatan kita?", 
    a: "Menulis Kanji dengan urutan goresan yang konsisten dan benar akan membangun 'muscle memory' (memori otot) pada tangan, sehingga mempermudah otak mengenali radikal pembentuk huruf tersebut." 
  }
];

export default function KanjiHome() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="kanji-page-wrapper">
      {/* Hero Section - Hitam Pekat & Watermark Karakter Besar Sesuai Gambar Kelompok */}
      <div className="kanji-hero">
        <h1>Mengenal Huruf Kanji</h1>
        <p>Langkah awal memahami dasar ideogram bahasa Jepang, sistem cara baca, dan strategi belajar yang efektif untuk pemula.</p>
      </div>

      <div className="kanji-main-container">
        {/* Section 1: Penjelasan Utama Pengenalan Pembelajaran */}
        <section className="kanji-overview-card">
          <div className="overview-block">
            <h3>Apa itu Kanji?</h3>
            <p>Kanji (漢字) adalah sistem alfabet berupa logogram atau ideogram yang diadopsi dari daratan Tiongkok Kuno. Berbeda dengan Hiragana atau Katakana yang merepresentasikan bunyi suara tunggal, setiap satu karakter Kanji menyimpan konsep makna utuh serta representasi visual dari suatu objek atau ide.</p>
          </div>
          <div className="overview-block">
            <h3>Mengapa Belajar Kanji itu Penting?</h3>
            <p>Dalam teks bahasa Jepang asli, kalimat tidak ditulis menggunakan spasi. Kanji berfungsi sebagai penanda batas kata sekaligus pembeda kata homofon (kata dengan bunyi sama tetapi artinya berbeda). Menguasai Kanji akan membuka gerbang kemampuan membaca tingkat lanjut secara mandiri.</p>
          </div>
        </section>

        {/* Section 2: Modul Pengenalan Karakteristik Sistem Baca */}
        <section className="reading-systems-section">
          <h2>Sistem Dua Cara Baca Kanji</h2>
          <p className="section-subtext">Hampir setiap karakter Kanji di dalam bahasa Jepang memiliki dua metode pelafalan utama:</p>
          <div className="systems-grid">
            <div className="system-card onyomi">
              <div className="system-badge">Cina Kuno</div>
              <h4>On-yomi (音読み)</h4>
              <p>Cara baca berbasis fonetik Tiongkok. Umumnya digunakan ketika sebuah Kanji berpasangan atau bergabung dengan Kanji lain membentuk satu kosakata baru (*Jukugo*).</p>
              <div className="system-example">Contoh: <strong>水 (SUI)</strong> + <strong>星 (SEI)</strong> = 水星 (Suisei / Planet Merkurius)</div>
            </div>
            <div className="system-card kunyomi">
              <div className="system-badge">Asli Jepang</div>
              <h4>Kun-yomi (訓読み)</h4>
              <p>Cara baca asli pribumi Jepang. Umumnya digunakan ketika karakter Kanji tersebut berdiri sendiri sebagai kata tunggal, atau diikuti oleh huruf Hiragana pendamping (*Okurigana*).</p>
              <div className="system-example">Contoh: <strong>水</strong> berdiri sendiri dibaca <strong>mizu</strong> (Air).</div>
            </div>
          </div>
        </section>

        {/* Section 3: Timeline Sejarah & Evolusi Aksara */}
        <section className="kanji-timeline-wrapper">
          <h2>Garis Waktu & Evolusi Aksara Kanji</h2>
          <div className="timeline-container">
            <div className="timeline-node">
              <div className="node-marker"></div>
              <div className="node-content">
                <h4>Abad ke-5 Masehi — Masa Adaptasi</h4>
                <p>Huruf Kanji masuk pertama kali ke dataran Jepang melalui jalur perdagangan dokumen resmi. Karena kala itu Jepang belum memiliki aksara tulis sendiri, mereka mengadopsi struktur tulisan Cina sepenuhnya.</p>
              </div>
            </div>
            <div className="timeline-node">
              <div className="node-marker"></div>
              <div className="node-content">
                <h4>Era Heian — Penyederhanaan</h4>
                <p>Masyarakat Jepang mulai menyederhanakan bentuk-bentuk Kanji yang rumit demi efisiensi penulisan cepat, yang kelak melahirkan aksara silabis lokal: Hiragana dan Katakana.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Manfaat Mempelajari Kanji */}
        <section className="kanji-benefits">
          <h2>Manfaat Utama Menguasai Kanji</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <h5>Membaca Manga & Light Novel</h5>
              <p>Dapat menikmati karya pop kultur asli Jepang langsung dari penerbit asalnya tanpa perlu menunggu translasi resmi.</p>
            </div>
            <div className="benefit-card">
              <h5>Membaca Berita & Media Cetak</h5>
              <p>Membantu Anda memantau situs berita utama seperti NHK Web Easy atau Asahi Shimbun demi memperluas wawasan.</p>
            </div>
            <div className="benefit-card">
              <h5>Persiapan Kelulusan Ujian JLPT</h5>
              <p>Kunci mutlak untuk meraih nilai tinggi pada sektor ujian Reading (Chokai) dan kosakata di seluruh level.</p>
            </div>
            <div className="benefit-card">
              <h5>Studi & Karir Profesional</h5>
              <p>Membuka peluang beasiswa kuliah ataupun melamar kerja secara langsung di korporasi besar kota Tokyo.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Roadmap Tingkatan JLPT */}
        <section className="kanji-roadmap-section">
          <h2>Peta Target Belajar Kanji (JLPT Roadmap)</h2>
          <div className="roadmap-flex">
            <div className="roadmap-step">
              <div className="step-level">N5</div>
              <strong>Dasar Sekali</strong>
              <p>± 100 Karakter</p>
            </div>
            <div className="roadmap-step">
              <div className="step-level">N4</div>
              <strong>Dasar Lanjutan</strong>
              <p>± 300 Karakter</p>
            </div>
            <div className="roadmap-step">
              <div className="step-level">N3</div>
              <strong>Menengah</strong>
              <p>± 650 Karakter</p>
            </div>
            <div className="roadmap-step">
              <div className="step-level">N2</div>
              <strong>Pra-Bisnis</strong>
              <p>± 1.000 Karakter</p>
            </div>
            <div className="roadmap-step">
              <div className="step-level">N1</div>
              <strong>Fasih / Ahli</strong>
              <p>± 2.000+ Karakter</p>
            </div>
          </div>
        </section>

        {/* Section 6: Tips Belajar Kanji Bagi Pemula */}
        <section className="kanji-study-tips">
          <h2>Tips Efektif Memulai Belajar Kanji</h2>
          <div className="tips-grid-layout">
            <div className="tip-box">
              <h4>1. Kuasai Elemen Radikal</h4>
              <p>Kanji kompleks tersusun dari gabungan radikal kecil. Mengenali radikal dasar akan membantu Anda menebak kelompok makna sebuah kata baru dengan mudah.</p>
            </div>
            <div className="tip-box">
              <h4>2. Pelajari Lewat Konteks Kata</h4>
              <p>Jangan menghafal satu huruf Kanji secara terisolasi. Hafalkan langsung dalam bentuk gabungan kata utuh agar Anda paham implementasi cara bacanya.</p>
            </div>
            <div className="tip-box">
              <h4>3. Manfaatkan Aplikasi Berbasis SRS</h4>
              <p>Gunakan aplikasi berbasis Spaced Repetition System (SRS) seperti Anki atau memori fisik flashcard untuk mereview ingatan secara berkala sebelum lupa.</p>
            </div>
          </div>
        </section>

        {/* Section 7: Statistik Dashboard Belajar */}
        <section className="stats-dashboard">
          <div className="stat-box">
            <h4>2.136</h4>
            <p>Target Total Jouyou Kanji Standar Pemerintahan</p>
          </div>
          <div className="stat-box">
            <h4>100</h4>
            <p>Kanji Fondasi Awal Level Pemula (N5)</p>
          </div>
          <div className="stat-box">
            <h4>21</h4>
            <p>Jumlah Radikal Utama Pembentuk Makna</p>
          </div>
        </section>

        {/* Section 8: FAQ Accordion Menggunakan useState */}
        <section className="faq-accordion-section">
          <h2>Pertanyaan Umum Pemula Seputar Kanji</h2>
          <div className="accordion-wrapper">
            {FAQ_DATA.map((faq, idx) => (
              <div key={idx} className="accordion-item">
                <div className="accordion-trigger" onClick={() => toggleFaq(idx)}>
                  <span>{faq.q}</span>
                  <span className="accordion-icon">{activeFaq === idx ? "−" : "+"}</span>
                </div>
                {activeFaq === idx && (
                  <div className="accordion-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}