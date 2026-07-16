import React from 'react';
import "../styles/about.css";

// ── Import foto dari src/assets ─────────────────────────────
// Ganti nama file di bawah ini sesuai foto kamu yang sebenarnya
import fotoA     from "../assets/wafa.jpg";
import fotoB     from "../assets/mario.jpeg";
import fotoC     from "../assets/rozi.jpeg";
import fotoD     from "../assets/Reifan.jpeg";
import fotoE     from "../assets/depran.jpeg";

const About = () => {
  const team = [
    { name: "Sultan Syekhu Aly Wafa", nim: "24.11.5957", role: "Backend Developer", bio: "Mengerjakan list kanji, flashcard, & latihan/quiz.", foto: fotoA },
    { name: "Mario Trisno Perason Bataona",   nim: "24.11.5959", role: "UI Designer",         bio: "Mengerjakan Keuntungan Belajar, Grammar & JLPT.",         foto: fotoB },
    { name: "Saputra Roziqin Werang ",   nim: "24.11.5948", role: "Content Creator",     bio: "Mengerjakan Hiragana, Katakana, & Penjelasan awal Belajar Kanji .",     foto: fotoC },
    { name: "Reifan Aditya Pratama",   nim: "24.11.6013", role: "Content Creator",     bio: "Mengerjakan Home, About Us, & Artikel Budaya.",     foto: fotoD },
    { name: "Depran Rachman Setiawan",   nim: "24.11.5963", role: "Content Creator",     bio: "Mengerjakan Partikel, Grammar, & Rekomendasi Platform.",     foto: fotoE },
  ];

  return (
    <div className="about-section">
      <div className="about__header">
        <h2 className="about__title">Tentang Kelompok Kami</h2>
        <p className="about__subtitle">
          Kami adalah tim yang bersemangat untuk membantu siapa saja belajar bahasa Jepang dengan lebih mudah dan menyenangkan.
        </p>
      </div>
      <div className="about__grid">
        {team.map((member, index) => (
          <div key={index} className="about__card">
            <img
              src={member.foto}
              alt={member.name}
              className="about__avatar"
            />
            <h3 className="about__name">{member.name}</h3>
            <p className="about__nim">{member.nim}</p>
            <p className="about__role">{member.role}</p>
            <p className="about__bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;