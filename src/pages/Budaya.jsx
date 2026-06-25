import React from 'react';
// HAPUS ATAU GANTI BARIS INI: Karena kodenya sudah disatukan di App.css yang di-import secara global
import '../styles/Budaya.css'; 

// NAMA FUNGSI DIGANTI: Menjadi Budaya agar sesuai dengan import di App.jsx
const Budaya = () => {
  const popCultureList = [
    {
      no: "01",
      title: "Anime dan Manga sebagai Fenomena Global",
      desc: "Jepang adalah pusat dari industri animasi dan komik dunia. Memahami konteks budaya di balik karya-karya ikonik seperti One Piece atau Ghibli memberikan perspektif baru yang tidak bisa ditemukan dalam terjemahan."
    },
    {
      no: "02",
      title: "Keunikan Kuliner Jepang (Washoku)",
      desc: "Dari ramen kaki lima hingga sushi kelas atas, kuliner Jepang bukan sekadar makanan, melainkan seni. Budaya kuliner Jepang sangat menjunjung tinggi filosofi musim dan estetika penyajian."
    },
    {
      no: "03",
      title: "Tren Fashion dan Subkultur Harajuku",
      desc: "Distrik Harajuku telah lama menjadi kiblat fashion eksentrik dan kreatif. Budaya populer ini mencerminkan kebebasan berekspresi generasi muda Jepang yang unik dan berani tampil beda."
    },
    {
      no: "04",
      title: "Teknologi dan Budaya Gaming",
      desc: "Jepang adalah rumah bagi raksasa industri game seperti Nintendo dan Sony. Budaya gaming di Jepang sangat kental, mulai dari arcade center (Game Center) hingga budaya e-sports yang terus berkembang."
    },
    {
      no: "05",
      title: "Perpaduan Tradisi dan Modernitas",
      desc: "Daya tarik utama Jepang adalah bagaimana teknologi super canggih bisa hidup berdampingan dengan kuil-kuil kuno yang tenang. Harmonisasi inilah yang menciptakan pesona budaya yang sangat unik."
    }
  ];

  return (
    <div className="pop-page">
      {/* HEADER BARU: Minimalis & Elegan, Bukan Banner Raksasa */}
      <header className="pop-header">
        <span className="pop-tag">Budaya & Gaya Hidup</span>
        <h1 className="pop-main-title">
          Menelusuri Pesona <span className="pop-title-highlight">Budaya Populer Jepang</span>
        </h1>
        <p className="pop-meta">Oleh Tim NihonGo! • Waktu baca: 5 menit</p>
      </header>

      {/* LAYOUT BARU: Split Screen (Kiri Artikel/Gambar, Kanan List Kartu) */}
      <div className="pop-container">
        
        {/* SISI KIRI: Sorotan Utama */}
        <aside className="pop-sidebar">
          <div className="pop-featured-image-wrapper">
            <img 
              src="https://data.hellowork-asia.com/images/blogs/2311-6246b7459595a.jpeg" 
              alt="Budaya Populer Jepang" 
              className="pop-featured-image"
            />
          </div>
          <section className="pop-intro-text">
            <p>
              Jepang selalu berhasil memikat dunia melalui gelombang budaya populer yang masif. Dari sudut-sudut jalanan Akihabara hingga piring-piring ramen yang menggugah selera, pengaruh budaya Jepang telah meresap ke dalam gaya hidup masyarakat global.
            </p>
            <p>
              Dalam artikel ini, kita akan menjelajahi berbagai elemen budaya populer yang membuat Jepang menjadi destinasi impian bagi banyak orang, serta bagaimana hal tersebut membentuk identitas modern negeri sakura ini.
            </p>
          </section>
        </aside>

        {/* SISI KANAN: List Elemen Berjejer Vertikal Mengalir */}
        <main className="pop-main-content">
          <h2 className="pop-section-title">Elemen Budaya Populer</h2>
          
          <div className="pop-list-stack">
            {popCultureList.map((item, index) => (
              <div className="pop-row-card" key={index}>
                <div className="pop-card-number">{item.no}</div>
                <div className="pop-card-body">
                  <h3 className="pop-card-title">{item.title}</h3>
                  <p className="pop-card-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <footer className="pop-summary-box">
            <h3>Kesimpulan</h3>
            <p>
              Budaya populer Jepang adalah perpaduan antara kreativitas tak terbatas dan penghormatan mendalam terhadap tradisi. Mempelajari dan memahami budaya populer ini bukan hanya tentang mengikuti tren, tetapi tentang menghargai karya seni dan filosofi hidup masyarakat Jepang yang sangat inspiratif.
            </p>
          </footer>
        </main>

      </div>
    </div>
  );
};

// NAMA EXPORT DIGANTI: Menyesuaikan dengan nama komponen di atas
export default Budaya;