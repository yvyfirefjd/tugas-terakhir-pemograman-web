import "../styles/buku.css";

export default function Buku() {

    const books = [
        {
            title: "Minna no Nihongo",
            level: "N5 - N4",
            author: "3A Corporation",
            desc: "Salah satu buku paling populer untuk belajar bahasa Jepang. Banyak digunakan di sekolah bahasa dan universitas."
        },
        {
            title: "Genki I",
            level: "N5",
            author: "The Japan Times",
            desc: "Buku yang cocok bagi pemula dengan penjelasan grammar yang mudah dipahami serta latihan yang lengkap."
        },
        {
            title: "Genki II",
            level: "N4",
            author: "The Japan Times",
            desc: "Lanjutan dari Genki I yang membahas grammar dan kosakata tingkat menengah dasar."
        },
        {
            title: "Tobira",
            level: "N3",
            author: "Kurosio Publisher",
            desc: "Buku yang cocok bagi pelajar yang ingin naik dari level dasar menuju tingkat menengah."
        },
        {
            title: "Shin Kanzen Master",
            level: "N2 - N1",
            author: "3A Network",
            desc: "Seri buku yang fokus pada persiapan JLPT, meliputi grammar, kanji, kosakata, membaca, dan listening."
        },
        {
            title: "Sou Matome",
            level: "N3 - N1",
            author: "ASK Publishing",
            desc: "Buku belajar JLPT dengan jadwal belajar selama delapan minggu dan penjelasan yang ringkas."
        }
    ];

    return (
        <div className="buku-page">

            <section className="hero-book">

                <h1>📚 Rekomendasi Buku Belajar Bahasa Jepang</h1>

                <p>
                    Selain belajar melalui aplikasi dan website, buku masih
                    menjadi salah satu sumber belajar terbaik karena memiliki
                    materi yang terstruktur dan latihan yang lengkap.
                </p>

            </section>

            <section className="book-grid">

                {books.map((book, index) => (

                    <div className="book-card" key={index}>

                        <div className="book-icon">
                            📖
                        </div>

                        <h2>{book.title}</h2>

                        <span>{book.level}</span>

                        <h4>{book.author}</h4>

                        <p>{book.desc}</p>

                    </div>

                ))}

            </section>

            <section className="comparison">

                <h2>Perbandingan Buku</h2>

                <table>

                    <thead>

                        <tr>
                            <th>Buku</th>
                            <th>Level</th>
                            <th>Kelebihan</th>
                        </tr>

                    </thead>

                    <tbody>

                        <tr>
                            <td>Genki I</td>
                            <td>N5</td>
                            <td>Mudah dipahami oleh pemula.</td>
                        </tr>

                        <tr>
                            <td>Genki II</td>
                            <td>N4</td>
                            <td>Grammar lebih lengkap.</td>
                        </tr>

                        <tr>
                            <td>Minna no Nihongo</td>
                            <td>N5-N4</td>
                            <td>Banyak digunakan di lembaga bahasa.</td>
                        </tr>

                        <tr>
                            <td>Tobira</td>
                            <td>N3</td>
                            <td>Transisi menuju tingkat menengah.</td>
                        </tr>

                        <tr>
                            <td>Sou Matome</td>
                            <td>N3-N1</td>
                            <td>Belajar terjadwal 8 minggu.</td>
                        </tr>

                        <tr>
                            <td>Shin Kanzen Master</td>
                            <td>N2-N1</td>
                            <td>Persiapan JLPT paling lengkap.</td>
                        </tr>

                    </tbody>

                </table>

            </section>

            <section className="tips-book">

                <h2>💡 Tips Memilih Buku</h2>

                <div className="tips-container">

                    <div className="tips-item">
                        <h3>Pemula</h3>
                        <p>Mulailah menggunakan Genki I atau Minna no Nihongo.</p>
                    </div>

                    <div className="tips-item">
                        <h3>Level Menengah</h3>
                        <p>Gunakan Tobira atau Genki II.</p>
                    </div>

                    <div className="tips-item">
                        <h3>Persiapan JLPT</h3>
                        <p>Gunakan Shin Kanzen Master atau Sou Matome.</p>
                    </div>

                </div>

            </section>

        </div>
    );
}