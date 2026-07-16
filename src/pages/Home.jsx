import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/home.css"; 

const Home = () => {
  const [kategoriAktif, setKategoriAktif] = useState('materi');
  
  // State untuk tanda centang rute belajar (disimpan di local storage browser)
  const [selesai, setSelesai] = useState(() => {
    const saved = localStorage.getItem('progresBelajar');
    return saved ? JSON.parse(saved) : [];
  });

  // State untuk menyimpan data Kanji Hari Ini sesuai dengan skema database
  const [kanjiHarian, setKanjiHarian] = useState(null);
  const [loadingApi, setLoadingApi] = useState(true);

  // Menyimpan progres belajar ke local storage setiap kali ada perubahan centang
  useEffect(() => {
    localStorage.setItem('progresBelajar', JSON.stringify(selesai));
  }, [selesai]);

  // Memanggil API saat halaman dimuat
  useEffect(() => {
    const ambilDataAPI = async () => {
      try {
        setLoadingApi(true);
        
        /* 💡 TIPS INTEGRASI BACKEND:
          Jika server Express Anda sudah berjalan, Anda bisa mengganti kode simulasi 
          setTimeout di bawah dengan fetch asli dari database Anda, contoh:
          
          const respon = await fetch("http://localhost:5000/api/kanji/hari-ini");
          const data = await respon.json();
          setKanjiHarian(data);
        */

        // Simulasi pengambilan data dari database dengan jeda 1.2 detik
        setTimeout(() => {
          const dataDummyTabelKanji = {
            karakter: "日",           // Kolom 'karakter' dari DB
            onyomi: "ニチ、ジツ",      // Kolom 'onyomi' dari DB
            kunyomi: "ひ、か",         // Kolom 'kunyomi' dari DB
            arti: "Matahari, hari"    // Kolom 'arti' dari DB
          };
          setKanjiHarian(dataDummyTabelKanji);
          setLoadingApi(false);
        }, 1200); 

      } catch (error) {
        console.error("Gagal mengambil data kanji dari database/API:", error);
        setLoadingApi(false);
      }
    };

    ambilDataAPI();
  }, []);

  const toggleSelesai = (id) => {
    setSelesai(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const ruteLangkah = [
    { id: 'step1', title: "Hiragana & Katakana", desc: "Dasar sistem penulisan Jepang.", path: "/hiragana" },
    { id: 'step2', title: "Grammar & Partikel", desc: "Struktur kalimat dan partikel dasar.", path: "/tata-bahasa" },
    { id: 'step3', title: "Kanji Dasar N5", desc: "Karakter kanji tingkat pemula.", path: "/kanji" },
    { id: 'step4', title: "Kosakata N5", desc: "Kumpulan kata benda & kerja N5.", path: "/kosakata" },
    { id: 'step5', title: "Kalimat N5", desc: "Latihan merangkai kalimat lengkap.", path: "/kalimat" },
    { id: 'step6', title: "Mulai N4", desc: "Lanjut ke tingkat menengah bawah.", path: "/n4" },
  ];

  const daftarKonten = [
    { id: 1, category: 'materi', title: "Mengenal Tingkatan JLPT", path: "/jlpt", desc: "Penjelasan tingkatan JLPT." },
    { id: 2, category: 'materi', title: "Hiragana", path: "/hiragana", desc: "Mulai belajar huruf dasar Jepang dari nol." },
    { id: 3, category: 'materi', title: "Katakana", path: "/katakana", desc: "Pelajari huruf untuk penulisan kata serapan asing." },   
    { id: 4, category: 'materi', title: "Grammar dasar Bahasa jepang", path: "/grammar", desc: "Struktur kalimat dasar dan penggunaan partikel." },
    { id: 5, category: 'materi', title: "Belajar partikel Bahasa jepang", path: "/partikel", desc: "Partikel dasar bahasa Jepang."},
    { id: 6, category: 'materi', title: "Penjelasan awal belajar kanji", path: "/kanjiHome", desc: "Persiapan belajar kanji."},
    { id: 7, category: 'materi', title: "Daftar Kanji", path: "/kanji", desc: "Daftar karakter kanji N5-N1."},
    { id: 8, category: 'materi', title: "Flashcard Kanji", path: "/flashcard", desc: "Flashcard karakter kanji N5-N1."},
    { id: 9, category: 'materi', title: "Kuis Kanji", path: "/kuis", desc: "Kuis karakter kanji N5-N1."},
    { id: 10, category: 'blog', title: "Keuntungan Belajar Bahasa Jepang", path: "/keuntungan", desc: "Kenapa Belajar Bahasa Jepang." },
    { id: 11, category: 'blog', title: "Rekomendasi buku sumber daya belajar Bahasa jepang", path: "/buku", desc: "Daftar buku belajar bahasa Jepang."},
    { id: 12, category: 'blog', title: "Rekomendasi platform online sumber daya belajar", path: "/platform", desc: "Platform belajar bahasa Jepang."},
    { id: 13, category: 'blog', title: "Artikel Budaya Populer di Jepang", path: "/budaya", desc: "Budaya populer dan menarik di Jepang." },
    { id: 14, category: 'info', title: "About Us", path: "/about", desc: "Informasi mengenai anggota kelompok kami." },
  ];

  const kontenTersaring = daftarKonten.filter(item => item.category === kategoriAktif);

  return (
    <>
      {/* 1. HERO SECTION */}
      <main className="home-hero">
        <div className="hero__inner">
          <div className="hero__bg-text">日本語</div>
          <div className="hero__content">
            <div className="hero__badge">Panduan Belajar Bahasa Jepang</div>
            <h1 className="hero__title">Belajar Bahasa <br /><span className="hero__title-accent">Jepang.</span></h1>
            <p className="hero__description">Mulai dari Hiragana hingga persiapan JLPT N5-N1 dengan metode yang menyenangkan.</p>
            <div className="hero__actions">
              <a href="#mulai-belajar" className="hero__btn hero__btn--primary">Mulai Belajar <span>→</span></a>
              <a href="#rute-belajar" className="hero__btn hero__btn--secondary">Lihat Rute</a>
            </div>
          </div>

          <div className="hero__visual">
             <div className="hero__card">
               <div className="api-label">✨ Kanji Hari Ini</div>
               
               {loadingApi ? (
                 <div className="api-loading">Memuat kanji...</div>
               ) : kanjiHarian ? (
                 <div>
                   {/* Karakter Kanji Utama */}
                   <h2 className="api-kanji">{kanjiHarian.karakter}</h2>
                   
                   {/* Cara Baca Onyomi & Kunyomi dari Database */}
                   <p className="api-romaji" style={{ fontSize: '0.9rem', color: '#666', textAlign: 'left', margin: '10px 0' }}>
                     <strong>On:</strong> {kanjiHarian.onyomi} <br />
                     <strong>Kun:</strong> {kanjiHarian.kunyomi}
                   </p>
                   
                   {/* Arti Kanji */}
                   <p className="api-arti">{kanjiHarian.arti}</p>
                 </div>
               ) : (
                 <div className="api-loading">Gagal memuat data.</div>
               )}
             </div>
          </div>
        </div>
      </main>

      {/* 2. SECTION EKSPLORASI / MATERI */}
      <section id="mulai-belajar" className="home-features">
        <div className="features__header">
          <h2 className="features__title">Mulai Belajar</h2>
        </div>
        <div className="tabs-container">
          <button className={`tab-btn ${kategoriAktif === 'materi' ? 'tab-btn--active' : ''}`} onClick={() => setKategoriAktif('materi')}>Materi Belajar & Latihan</button>
          <button className={`tab-btn ${kategoriAktif === 'blog' ? 'tab-btn--active' : ''}`} onClick={() => setKategoriAktif('blog')}>Blog & Budaya</button>
          <button className={`tab-btn ${kategoriAktif === 'info' ? 'tab-btn--active' : ''}`} onClick={() => setKategoriAktif('info')}>Info</button>
        </div>
        <div className="features__grid">
          {kontenTersaring.map((item) => (
            <div key={item.id} className="feature-card">
              <h3 className="feature-card__title">{item.title}</h3>
              <p className="feature-card__desc">{item.desc}</p>
              <Link to={item.path} className="feature-card__link">Buka Selengkapnya →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SECTION RUTE BELAJAR */}
      <section id="rute-belajar" className="home-roadmap">
        <div className="features__header">
          <h2 className="features__title">Rute Belajar</h2>
          <p className="features__subtitle">Ikuti langkah ini untuk hasil maksimal</p>
        </div>
        <div className="roadmap__list">
          {ruteLangkah.map((step, index) => (
            <div key={step.id} className={`roadmap__item ${selesai.includes(step.id) ? 'is-done' : ''}`}>
              <div className="roadmap__circle">
                {selesai.includes(step.id) ? "✓" : index + 1}
              </div>
              <div className="roadmap__card">
                <div className="roadmap__card-header">
                  <h3>{step.title}</h3>
                  <input 
                    type="checkbox" 
                    checked={selesai.includes(step.id)} 
                    onChange={() => toggleSelesai(step.id)} 
                  />
                </div>
                <p>{step.desc}</p>
                <Link to={step.path} className="roadmap__link">Buka Materi →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;