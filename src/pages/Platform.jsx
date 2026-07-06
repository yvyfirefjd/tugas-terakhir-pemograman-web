import "../styles/Platform.css";

export default function Platform() {
  return (
    <div className="platform-container">

      <h1>Rekomendasi Platform Belajar Bahasa Jepang</h1>

      <p className="intro">
        Saat ini terdapat banyak platform yang dapat membantu proses belajar
        bahasa Jepang, mulai dari aplikasi untuk menghafal kosakata hingga
        website yang menyediakan materi tata bahasa secara lengkap.
      </p>

      <div className="card">
        <h2>1. Duolingo</h2>
        <p>
          Cocok untuk pemula karena menyediakan latihan harian mengenai
          kosakata, hiragana, katakana, dan kalimat sederhana dengan sistem
          permainan (gamification).
        </p>
      </div>

      <div className="card">
        <h2>2. Minato</h2>
        <p>
          Platform resmi dari Japan Foundation yang menyediakan kursus bahasa
          Jepang gratis dengan materi yang tersusun dari level dasar hingga
          lanjutan.
        </p>
      </div>

      <div className="card">
        <h2>3. NHK World Easy Japanese</h2>
        <p>
          Menyediakan pelajaran bahasa Jepang berbentuk dialog singkat,
          audio, dan latihan yang mudah dipahami oleh pemula.
        </p>
      </div>

      <div className="card">
        <h2>4. Anki</h2>
        <p>
          Aplikasi flashcard yang sangat efektif untuk menghafal kosakata,
          kanji, dan pola grammar menggunakan metode Spaced Repetition
          System (SRS).
        </p>
      </div>

      <div className="card">
        <h2>5. WaniKani</h2>
        <p>
          Website khusus untuk belajar Kanji dan kosakata menggunakan metode
          mnemonik sehingga lebih mudah diingat.
        </p>
      </div>

      <div className="tips">
        <h2>Tips Belajar</h2>
        <ul>
          <li>Belajar minimal 20 menit setiap hari.</li>
          <li>Gunakan aplikasi flashcard untuk mengulang kosakata.</li>
          <li>Tonton anime atau drama Jepang dengan subtitle.</li>
          <li>Latih kemampuan membaca hiragana dan katakana.</li>
        </ul>
      </div>

    </div>
  );
}