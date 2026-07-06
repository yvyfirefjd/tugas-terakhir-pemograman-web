import "../styles/partikel.css";

export default function Partikel() {
  return (
    <div className="partikel-container">

      <h1>Belajar Partikel Bahasa Jepang</h1>

      <p className="intro">
        Partikel adalah kata bantu yang menunjukkan fungsi suatu kata dalam
        kalimat bahasa Jepang.
      </p>

      <table>

        <thead>
          <tr>
            <th>Partikel</th>
            <th>Fungsi</th>
            <th>Contoh</th>
          </tr>
        </thead>

        <tbody>

          <tr>
            <td>は (wa)</td>
            <td>Penanda topik</td>
            <td>わたし は がくせい です。</td>
          </tr>

          <tr>
            <td>が (ga)</td>
            <td>Penanda subjek</td>
            <td>ねこ が います。</td>
          </tr>

          <tr>
            <td>を (wo)</td>
            <td>Penanda objek</td>
            <td>パン を たべます。</td>
          </tr>

          <tr>
            <td>に (ni)</td>
            <td>Waktu / tujuan</td>
            <td>学校 に いきます。</td>
          </tr>

          <tr>
            <td>へ (e)</td>
            <td>Arah</td>
            <td>日本 へ いきます。</td>
          </tr>

          <tr>
            <td>で (de)</td>
            <td>Tempat melakukan aktivitas</td>
            <td>学校 で べんきょうします。</td>
          </tr>

          <tr>
            <td>と (to)</td>
            <td>Dan / bersama</td>
            <td>ともだち と いきます。</td>
          </tr>

          <tr>
            <td>も (mo)</td>
            <td>Juga</td>
            <td>わたし も がくせい です。</td>
          </tr>

        </tbody>

      </table>

      <div className="note">

        <h2>Tips Menghafal</h2>

        <ul>
          <li>は → Topik</li>
          <li>が → Subjek</li>
          <li>を → Objek</li>
          <li>に → Tujuan / Waktu</li>
          <li>へ → Arah</li>
          <li>で → Tempat Aktivitas</li>
          <li>と → Bersama</li>
          <li>も → Juga</li>

        </ul>

      </div>

    </div>
  );
}