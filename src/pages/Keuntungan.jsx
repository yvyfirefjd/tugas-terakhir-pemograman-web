import "../styles/keuntungan.css";

export default function Keuntungan() {
  const keuntungan = [
    {
      title: "🌏 Membuka Peluang Karier",
      desc: "Kemampuan bahasa Jepang sangat dibutuhkan oleh perusahaan Jepang di Indonesia maupun luar negeri. Banyak perusahaan memberikan nilai tambah kepada pelamar yang memiliki sertifikat JLPT."
    },
    {
      title: "🎓 Kesempatan Beasiswa",
      desc: "Pemerintah Jepang menyediakan berbagai program beasiswa seperti MEXT yang memberikan kesempatan kuliah secara gratis di Jepang."
    },
    {
      title: "✈️ Mempermudah Traveling",
      desc: "Berkomunikasi menggunakan bahasa Jepang akan membuat perjalanan menjadi lebih nyaman ketika berwisata atau tinggal di Jepang."
    },
    {
      title: "🎌 Menikmati Budaya Jepang",
      desc: "Belajar bahasa Jepang membuat kita lebih mudah memahami anime, manga, musik, film, hingga budaya tradisional Jepang."
    },
    {
      title: "💼 Gaji Lebih Tinggi",
      desc: "Beberapa perusahaan memberikan tunjangan bahasa kepada karyawan yang memiliki kemampuan bahasa Jepang."
    },
    {
      title: "🧠 Melatih Otak",
      desc: "Belajar bahasa asing dapat meningkatkan daya ingat, kemampuan berpikir kritis, serta melatih konsentrasi."
    }
  ];

  return (
    <div className="keuntungan-page">

      <section className="hero">
        <h1>Keuntungan Belajar Bahasa Jepang</h1>
        <p>
          Bahasa Jepang merupakan salah satu bahasa yang paling banyak
          dipelajari di dunia. Selain menarik karena budaya dan animenya,
          bahasa Jepang juga memberikan banyak manfaat dalam dunia pendidikan,
          pekerjaan, hingga pengembangan diri.
        </p>
      </section>

      <section className="grid">
        {keuntungan.map((item, index) => (
          <div className="card" key={index}>
            <h2>{item.title}</h2>
            <p>{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="statistik">

        <h2>Mengapa Belajar Bahasa Jepang?</h2>

        <table>

          <thead>

            <tr>
              <th>Bidang</th>
              <th>Manfaat</th>
            </tr>

          </thead>

          <tbody>

            <tr>
              <td>Pendidikan</td>
              <td>Kesempatan memperoleh beasiswa ke Jepang.</td>
            </tr>

            <tr>
              <td>Pekerjaan</td>
              <td>Memiliki peluang bekerja di perusahaan Jepang.</td>
            </tr>

            <tr>
              <td>Bisnis</td>
              <td>Mempermudah komunikasi dengan mitra Jepang.</td>
            </tr>

            <tr>
              <td>Travel</td>
              <td>Lebih mudah berkomunikasi saat berkunjung ke Jepang.</td>
            </tr>

            <tr>
              <td>Hobi</td>
              <td>Memahami anime, manga, game, dan lagu Jepang tanpa terjemahan.</td>
            </tr>

          </tbody>

        </table>

      </section>

      <section className="quote">
        <h2>✨ Motivasi</h2>

        <blockquote>
          "Belajar bahasa baru bukan hanya mempelajari kata-kata baru,
          tetapi juga membuka pintu menuju budaya dan kesempatan baru."
        </blockquote>

      </section>

    </div>
  );
}