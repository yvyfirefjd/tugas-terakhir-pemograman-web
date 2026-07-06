import "../styles/grammar.css";

export default function Grammar() {
  return (
    <div className="grammar-container">

      <h1>Grammar Dasar Bahasa Jepang</h1>

      <p className="intro">
        Grammar merupakan aturan penyusunan kalimat dalam bahasa Jepang.
        Berikut beberapa pola dasar yang wajib dipahami oleh pemula.
      </p>

      <div className="grammar-card">
        <h2>1. Pola A は B です</h2>

        <p>
          Digunakan untuk menyatakan identitas atau informasi sederhana.
        </p>

        <h3>Contoh</h3>

        <p>わたし は デプラン です。</p>
        <p>Watashi wa Depran desu.</p>
        <p>Saya adalah Depran.</p>
      </div>

      <div className="grammar-card">
        <h2>2. Pola A の B</h2>

        <p>
          Menunjukkan kepemilikan atau hubungan antara dua kata benda.
        </p>

        <h3>Contoh</h3>

        <p>わたし の ほん</p>
        <p>Watashi no hon</p>
        <p>Buku saya.</p>
      </div>

      <div className="grammar-card">
        <h2>3. Kalimat Tanya</h2>

        <p>
          Tambahkan partikel 「か」 pada akhir kalimat.
        </p>

        <h3>Contoh</h3>

        <p>あなた は がくせい ですか。</p>

        <p>Apakah kamu seorang pelajar?</p>
      </div>

      <div className="grammar-card">
        <h2>4. Kata Tunjuk</h2>

        <table>
          <thead>
            <tr>
              <th>Kata</th>
              <th>Arti</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>これ</td>
              <td>Ini</td>
            </tr>

            <tr>
              <td>それ</td>
              <td>Itu (dekat lawan bicara)</td>
            </tr>

            <tr>
              <td>あれ</td>
              <td>Itu (jauh)</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}