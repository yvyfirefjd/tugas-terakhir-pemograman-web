import "../styles/jlpt.css";

export default function JLPT() {

    const levels = [
        {
            level: "N5",
            color: "n5",
            title: "Pemula (Beginner)",
            description:
                "Level paling dasar. Peserta mampu membaca hiragana, katakana, sekitar 100 kanji dasar, memahami kosakata sederhana, serta percakapan sehari-hari."
        },
        {
            level: "N4",
            color: "n4",
            title: "Dasar Menengah",
            description:
                "Memahami percakapan sehari-hari dengan lebih baik, mengenal sekitar 300 kanji dan tata bahasa yang lebih kompleks dibanding N5."
        },
        {
            level: "N3",
            color: "n3",
            title: "Menengah",
            description:
                "Menjadi batas antara level dasar dan lanjutan. Mampu membaca artikel sederhana, memahami berita ringan, dan mengikuti percakapan umum."
        },
        {
            level: "N2",
            color: "n2",
            title: "Menengah Atas",
            description:
                "Mampu memahami artikel koran, berita televisi, dokumen kerja, dan percakapan yang digunakan di lingkungan profesional."
        },
        {
            level: "N1",
            color: "n1",
            title: "Mahir",
            description:
                "Level tertinggi JLPT. Peserta mampu memahami artikel akademik, buku, seminar, berita, serta percakapan formal dengan sangat baik."
        }
    ];

    return (
        <div className="jlpt-page">

            <section className="hero-jlpt">

                <h1>📖 Mengenal Tingkatan JLPT</h1>

                <p>
                    Japanese Language Proficiency Test (JLPT) merupakan
                    ujian kemampuan bahasa Jepang yang diakui secara
                    internasional. JLPT terdiri dari lima tingkatan,
                    dimulai dari N5 (termudah) hingga N1 (tersulit).
                </p>

            </section>

            <section className="timeline">

                {levels.map((item, index) => (

                    <div className={`level-card ${item.color}`} key={index}>

                        <div className="badge">
                            {item.level}
                        </div>

                        <h2>{item.title}</h2>

                        <p>{item.description}</p>

                    </div>

                ))}

            </section>

            <section className="table-section">

                <h2>Perbandingan Tingkatan JLPT</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Level</th>
                            <th>Kanji (±)</th>
                            <th>Kosakata</th>
                            <th>Kemampuan</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>N5</td>
                            <td>100</td>
                            <td>800</td>
                            <td>Percakapan dasar</td>
                        </tr>

                        <tr>
                            <td>N4</td>
                            <td>300</td>
                            <td>1.500</td>
                            <td>Kalimat sehari-hari</td>
                        </tr>

                        <tr>
                            <td>N3</td>
                            <td>650</td>
                            <td>3.700</td>
                            <td>Artikel sederhana</td>
                        </tr>

                        <tr>
                            <td>N2</td>
                            <td>1.000</td>
                            <td>6.000</td>
                            <td>Lingkungan kerja</td>
                        </tr>

                        <tr>
                            <td>N1</td>
                            <td>2.000+</td>
                            <td>10.000+</td>
                            <td>Akademik & Profesional</td>
                        </tr>

                    </tbody>

                </table>

            </section>

            <section className="tips">

                <h2>💡 Tips Memilih Level</h2>

                <div className="tips-grid">

                    <div className="tips-card">
                        <h3>Baru Mulai?</h3>
                        <p>Mulailah dari JLPT N5.</p>
                    </div>

                    <div className="tips-card">
                        <h3>Sudah Belajar 1 Tahun?</h3>
                        <p>Cobalah mengambil JLPT N4.</p>
                    </div>

                    <div className="tips-card">
                        <h3>Ingin Kerja di Jepang?</h3>
                        <p>Usahakan mencapai minimal JLPT N2.</p>
                    </div>

                    <div className="tips-card">
                        <h3>Target Penerjemah?</h3>
                        <p>Targetkan memperoleh sertifikat JLPT N1.</p>
                    </div>

                </div>

            </section>

        </div>
    );
}