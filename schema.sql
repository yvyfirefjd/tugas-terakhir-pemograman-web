-- ============================================================
--  NihonGo! — Schema PostgreSQL (Kelompok 7)
-- ============================================================

-- Hapus tabel lama jika ada (urutan terbalik karena FK)
DROP TABLE IF EXISTS jawaban        CASCADE;
DROP TABLE IF EXISTS pertanyaan     CASCADE;
DROP TABLE IF EXISTS quiz           CASCADE;
DROP TABLE IF EXISTS kanji          CASCADE;
DROP TABLE IF EXISTS hiragana       CASCADE;
DROP TABLE IF EXISTS katakana       CASCADE;
DROP TABLE IF EXISTS level_jlpt     CASCADE;

-- ── level_jlpt ────────────────────────────────────────────────
CREATE TABLE level_jlpt (
  id_jlpt  SERIAL PRIMARY KEY,
  nama     VARCHAR(10) NOT NULL UNIQUE   -- 'N5', 'N4', ...
);

-- ── kanji ─────────────────────────────────────────────────────
CREATE TABLE kanji (
  id_kanji      SERIAL PRIMARY KEY,
  id_jlpt       INT REFERENCES level_jlpt(id_jlpt) ON DELETE SET NULL,
  karakter      VARCHAR(5)   NOT NULL,
  arti          TEXT         NOT NULL,
  onyomi        TEXT,                    -- contoh: 'ニチ、ジツ'
  kunyomi       TEXT,                    -- contoh: 'ひ、か'
  stroke_count  INT
);

-- ── quiz ──────────────────────────────────────────────────────
CREATE TABLE quiz (
  id_quiz   SERIAL PRIMARY KEY,
  id_jlpt   INT REFERENCES level_jlpt(id_jlpt) ON DELETE SET NULL,
  judul     VARCHAR(255) NOT NULL
);

-- ── pertanyaan ────────────────────────────────────────────────
CREATE TABLE pertanyaan (
  id_pertanyaan SERIAL PRIMARY KEY,
  id_quiz       INT REFERENCES quiz(id_quiz) ON DELETE CASCADE,
  pertanyaan    TEXT NOT NULL
);

-- ── jawaban ───────────────────────────────────────────────────
CREATE TABLE jawaban (
  id_jawaban      SERIAL PRIMARY KEY,
  id_pertanyaan   INT REFERENCES pertanyaan(id_pertanyaan) ON DELETE CASCADE,
  pilihan_jawaban TEXT    NOT NULL,
  jawaban_benar   BOOLEAN NOT NULL DEFAULT false
);

-- ── hiragana ──────────────────────────────────────────────────
CREATE TABLE hiragana (
  id_hiragana  SERIAL PRIMARY KEY,
  karakter     VARCHAR(5)   NOT NULL,
  romaji       VARCHAR(20)  NOT NULL,
  pengucapan   TEXT,
  contoh       VARCHAR(100),
  arti         VARCHAR(100)
);

-- ── katakana ──────────────────────────────────────────────────
CREATE TABLE katakana (
  id_katakana  SERIAL PRIMARY KEY,
  karakter     VARCHAR(5)   NOT NULL,
  romaji       VARCHAR(20)  NOT NULL,
  contoh       VARCHAR(100),
  arti         VARCHAR(100)
);

-- ============================================================
--  SEED DATA
-- ============================================================

-- ── Level JLPT (id sengaja disamakan dengan angka N-nya) ───────
-- id_jlpt = 5 → N5, id_jlpt = 4 → N4, dst, supaya tidak bingung
INSERT INTO level_jlpt (id_jlpt, nama) VALUES
(1,'N1'),(2,'N2'),(3,'N3'),(4,'N4'),(5,'N5');

-- Reset sequence supaya insert berikutnya lanjut dari 6
SELECT setval('level_jlpt_id_jlpt_seq', (SELECT MAX(id_jlpt) FROM level_jlpt));

-- ── Kanji N5 (id_jlpt = 5) ──────────────────────────────────────
INSERT INTO kanji (id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count) VALUES
(5,'日','matahari, hari','ニチ、ジツ','ひ、か',4),
(5,'月','bulan','ゲツ、ガツ','つき',4),
(5,'火','api','カ','ひ',4),
(5,'水','air','スイ','みず',4),
(5,'木','pohon, kayu','モク、ボク','き、こ',4),
(5,'金','emas, uang','キン、コン','かね、かな',8),
(5,'土','tanah','ド、ト','つち',3),
(5,'山','gunung','サン','やま',3),
(5,'川','sungai','セン','かわ',3),
(5,'田','sawah','デン','た',5),
(5,'人','orang','ジン、ニン','ひと',2),
(5,'口','mulut','コウ、ク','くち',3),
(5,'手','tangan','シュ','て',4),
(5,'目','mata','モク、ボク','め',5),
(5,'耳','telinga','ジ','みみ',6),
(5,'子','anak','シ、ス','こ',3),
(5,'女','perempuan','ジョ、ニョ','おんな、め',3),
(5,'男','laki-laki','ダン、ナン','おとこ',7),
(5,'大','besar','ダイ、タイ','おお',3),
(5,'小','kecil','ショウ','ちい、こ、お',3);

-- ── Kanji N4 (id_jlpt = 4) ──────────────────────────────────────
INSERT INTO kanji (id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count) VALUES
(4,'文','tulisan, sastra','ブン、モン','ふみ',4),
(4,'字','huruf, karakter','ジ','あざ',6),
(4,'語','bahasa, kata','ゴ','かた',14),
(4,'言','bicara','ゲン、ゴン','い、こと',7),
(4,'読','membaca','ドク、トク','よ',14),
(4,'書','menulis','ショ','か',10),
(4,'聞','mendengar','ブン、モン','き',14),
(4,'話','bicara, cerita','ワ','はな、はなし',13),
(4,'来','datang','ライ','く、き、こ',7),
(4,'行','pergi','コウ、ギョウ','い、ゆ、おこな',6);

-- ── Kanji N3 (id_jlpt = 3) ──────────────────────────────────────
INSERT INTO kanji (id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count) VALUES
(3,'政','politik, pemerintah','セイ、ショウ','まつりごと',9),
(3,'治','memerintah, menyembuhkan','ジ、チ','ナオ.す、オサ.める',8),
(3,'経','melewati, mengatur','ケイ、キョウ','へ.る、たていと',11),
(3,'済','selesai, sudah','サイ、セイ','す.む、す.ます',11),
(3,'険','curam, terjal','ケン','けわ.しい',11),
(3,'危','bahaya','キ','あぶ.ない、あや.うい',6),
(3,'面','wajah, permukaan','メン','おも、おもて、つら',9),
(3,'接','menghubungkan','セツ、ショウ','つ.ぐ',11),
(3,'練','berlatih','レン','ね.る',14);

-- ── Kanji N2 (id_jlpt = 2) ──────────────────────────────────────
INSERT INTO kanji (id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count) VALUES
(2,'党','partai, kelompok','トウ','なかま',10),
(2,'協','kerja sama','キョウ','-',8),
(2,'総','umum, total','ソウ','す.べて',14),
(2,'領','wilayah, memimpin','リョウ','えり',14),
(2,'支','mendukung, cabang','シ','ささ.える',4),
(2,'報','laporan, membalas','ホウ','むく.いる',12),
(2,'告','memberitahu','コク','つ.げる',7),
(2,'評','menilai, kritik','ヒョウ','-',12),
(2,'価','harga, nilai','カ','あたい',8),
(2,'基','dasar','キ','モト、もとい',11);

-- ── Kanji N1 (id_jlpt = 1) ──────────────────────────────────────
INSERT INTO kanji (id_jlpt, karakter, arti, onyomi, kunyomi, stroke_count) VALUES
(1,'唯','hanya, cuma','ユイ、イ','ただ',11),
(1,'孤','sendirian, yatim piatu','コ','-',9),
(1,'衝','tabrakan, dorongan','ショウ','つ.く',15),
(1,'突','menusuk, tiba-tiba','トツ','つ.く',8),
(1,'裂','robek, membelah','レツ','さ.く、さ.ける',12),
(1,'襲','menyerang','シュウ','おそ.う',16),
(1,'懇','ramah, memohon','コン','ねんご.る',17),
(1,'衷','hati, tulus','チュウ','-',10),
(1,'悼','berduka, meratap','トウ','いた.む',11),
(1,'崩','runtuh','ホウ','くず.れる、くず.す',11);

-- ── Hiragana (46 karakter dasar) ────────────────────────────────
INSERT INTO hiragana (karakter, romaji, pengucapan, contoh, arti) VALUES
('あ','a','Seperti ''a'' pada ''Ayah''','あさ (asa)','Pagi'),
('い','i','Seperti ''i'' pada ''Ibu''','いぬ (inu)','Anjing'),
('う','u','Seperti ''u'' pada ''Udang''','うみ (umi)','Laut'),
('え','e','Seperti ''e'' pada ''Ekor''','えき (eki)','Stasiun'),
('お','o','Seperti ''o'' pada ''Obat''','おかね (okane)','Uang'),
('か','ka','K + A','かさ (kasa)','Payung'),
('き','ki','K + I','きっぷ (kippu)','Tiket'),
('く','ku','K + U','くるま (kuruma)','Mobil'),
('け','ke','K + E','けいさつ (keisatsu)','Polisi'),
('こ','ko','K + O','こころ (kokoro)','Hati'),
('さ','sa','S + A','さかな (sakana)','Ikan'),
('し','shi','Diucapkan ''Syi''','しお (shio)','Garam'),
('す','su','S + U','すし (sushi)','Sushi'),
('せ','se','S + E','せんせい (sensei)','Guru'),
('そ','so','S + O','そら (sora)','Langit'),
('た','ta','T + A','たまご (tamago)','Telur'),
('ち','chi','Diucapkan ''Cyi''','ちず (chizu)','Peta'),
('つ','tsu','Diucapkan ''Tsu''','つくえ (tsukue)','Meja'),
('て','te','T + E','てがみ (tegami)','Surat'),
('と','to','T + O','ともだち (tomodachi)','Teman'),
('な','na','N + A','なつ (natsu)','Musim Panas'),
('に','ni','N + I','にく (niku)','Daging'),
('ぬ','nu','N + U','ぬの (nuno)','Kain'),
('ね','ne','N + E','ねこ (neko)','Kucing'),
('の','no','N + O','のみもの (nomimono)','Minuman'),
('は','ha','H + A (Dibaca ''wa'' jika partikel)','はな (hana)','Bunga'),
('ひ','hi','H + I','ひかり (hikari)','Cahaya'),
('ふ','fu','Antara ''fu'' dan ''hu''','ふね (fune)','Kapal'),
('へ','he','H + E (Dibaca ''e'' jika partikel)','へや (heya)','Kamar'),
('ほ','ho','H + O','ほん (hon)','Buku'),
('ま','ma','M + A','まち (machi)','Kota'),
('み','mi','M + I','みず (mizu)','Air'),
('む','mu','M + U','むし (mushi)','Serangga'),
('め','me','M + E','めがね (megane)','Kacamata'),
('も','mo','M + O','もり (mori)','Hutan'),
('や','ya','Y + A','やま (yama)','Gunung'),
('ゆ','yu','Y + U','ゆき (yuki)','Salju'),
('よ','yo','Y + O','よる (yoru)','Malam'),
('ら','ra','R + A (Lidah agak bergetar)','らいげつ (raigetsu)','Bulan Depan'),
('り','ri','R + I','りんご (ringo)','Apel'),
('る','ru','R + U','よる (yoru)','Malam'),
('れ','re','R + E','れいぞうこ (reizouko)','Kulkas'),
('ろ','ro','R + O','ろく (roku)','Enam'),
('わ','wa','W + A','わたしたち (watashitachi)','Kami'),
('を','wo','Dibaca ''o'', khusus partikel','ほんをよむ (hon wo yomu)','Membaca buku'),
('ん','n','Konsonan penutup ''n/m/ng''','にほん (nihon)','Jepang');

-- ── Katakana (46 karakter dasar) ────────────────────────────────
-- Catatan: 2 karakter pada data asli salah ketik (む & よ harusnya
-- huruf katakana ム & ヨ, bukan hiragana) — sudah diperbaiki di sini.
INSERT INTO katakana (karakter, romaji, contoh, arti) VALUES
('ア','a','アメリカ (amerika)','Amerika'),
('イ','i','イギリス (igirisu)','Inggris'),
('ウ','u','ウサギ (usagi)','Kelinci'),
('エ','e','エアコン (eakon)','AC'),
('オ','o','オレンジ (orenji)','Jeruk'),
('カ','ka','カメラ (kamera)','Kamera'),
('キ','ki','ギター (gitaa)','Gitar'),
('ク','ku','クラス (kurasu)','Kelas'),
('ケ','ke','ケーキ (keeki)','Kue'),
('コ','ko','コイン (koin)','Koin'),
('サ','sa','サラダ (sarada)','Salad'),
('シ','shi','シャツ (shatsu)','Kemeja'),
('ス','su','スポーツ (supootsu)','Olahraga'),
('セ','se','セーター (seetaa)','Sweter'),
('ソ','so','ソファ (sofa)','Sofa'),
('タ','ta','タクシー (takushii)','Taksi'),
('チ','chi','チーム (chiimu)','Tim'),
('ツ','tsu','ツアー (tsuaa)','Tur'),
('テ','te','テスト (tesuto)','Ujian'),
('ト','to','トイレ (toire)','Toilet'),
('ナ','na','ナイフ (naifu)','Pisau'),
('ニ','ni','ニュース (nyuusu)','Berita'),
('ヌ','nu','ヌードル (nuudoru)','Mie'),
('ネ','ne','ネクタイ (nekutai)','Dasi'),
('ノ','no','ノート (nooto)','Buku Catatan'),
('ハ','ha','ハム (hamu)','Daging Ham'),
('ヒ','hi','ヒーロー (hiiroo)','Pahlawan'),
('フ','fu','フィルム (firumu)','Film'),
('ヘ','he','ヘリコプター (herikoputaa)','Helikopter'),
('ホ','ho','ホテル (hoteru)','Hotel'),
('マ','ma','マッチ (macchi)','Korek Api'),
('ミ','mi','ミルク (miruku)','Susu'),
('ム','mu','ムービー (muubii)','Film'),
('メ','me','メーター (meetaa)','Meteran'),
('モ','mo','モデル (moderu)','Model'),
('ヤ','ya','ヤード (yaado)','Yard'),
('ユ','yu','ユニフォーム (yunifoomu)','Seragam'),
('ヨ','yo','ヨーグルト (yooguruto)','Yoghurt'),
('ラ','ra','ラジオ (rajio)','Radio'),
('リ','ri','リボン (ribon)','Pita'),
('ル','ru','ルール (ruuru)','Aturan'),
('レ','re','レストラン (resutoran)','Restoran'),
('ロ','ro','ロボット (robotto)','Robot'),
('ワ','wa','ワイン (wain)','Anggur/Wine'),
('ヲ','wo','ヲタ芸 (wotagei)','Tarian Otaku'),
('ン','n','ラーメン (raamen)','Ramen');

-- ── Quiz N5 & N4 (id_jlpt sudah disesuaikan) ───────────────────
INSERT INTO quiz (id_jlpt, judul) VALUES
(5,'Kuis Kanji N5 — Alam'),
(5,'Kuis Kanji N5 — Anggota Tubuh'),
(4,'Kuis Kanji N4 — Bahasa & Komunikasi');

-- ── Pertanyaan Quiz 1 (Alam N5) ──────────────────────────────
INSERT INTO pertanyaan (id_quiz, pertanyaan) VALUES
(1,'Apa arti dari kanji 山?'),
(1,'Apa arti dari kanji 川?'),
(1,'Apa arti dari kanji 火?'),
(1,'Apa arti dari kanji 水?'),
(1,'Apa bacaan On dari kanji 日?');

-- ── Jawaban Quiz 1 ────────────────────────────────────────────
INSERT INTO jawaban (id_pertanyaan, pilihan_jawaban, jawaban_benar) VALUES
(1,'Gunung',true),(1,'Sungai',false),(1,'Laut',false),(1,'Danau',false),
(2,'Sungai',true),(2,'Gunung',false),(2,'Hutan',false),(2,'Sawah',false),
(3,'Api',true),(3,'Air',false),(3,'Tanah',false),(3,'Angin',false),
(4,'Air',true),(4,'Api',false),(4,'Udara',false),(4,'Es',false),
(5,'ニチ',true),(5,'ゲツ',false),(5,'カ',false),(5,'スイ',false);

-- ── Pertanyaan Quiz 2 (Tubuh N5) ─────────────────────────────
INSERT INTO pertanyaan (id_quiz, pertanyaan) VALUES
(2,'Apa arti dari kanji 手?'),
(2,'Apa arti dari kanji 目?'),
(2,'Apa arti dari kanji 口?'),
(2,'Kanji apa yang berarti "telinga"?'),
(2,'Apa bacaan Kun dari kanji 耳?');

-- ── Jawaban Quiz 2 ────────────────────────────────────────────
INSERT INTO jawaban (id_pertanyaan, pilihan_jawaban, jawaban_benar) VALUES
(6,'Tangan',true),(6,'Kaki',false),(6,'Kepala',false),(6,'Perut',false),
(7,'Mata',true),(7,'Hidung',false),(7,'Mulut',false),(7,'Telinga',false),
(8,'Mulut',true),(8,'Mata',false),(8,'Hidung',false),(8,'Gigi',false),
(9,'耳',true),(9,'目',false),(9,'口',false),(9,'手',false),
(10,'みみ',true),(10,'め',false),(10,'くち',false),(10,'て',false);

-- ── Quiz N3, N2, N1 ─────────────────────────────────────────────
INSERT INTO quiz (id_jlpt, judul) VALUES
(3, 'Kuis Kanji N3 — Dunia Kerja'),
(2, 'Kuis Kanji N2 — Ekonomi & Masyarakat'),
(1, 'Kuis Kanji N1 — Konsep Abstrak & Akademik');

-- ── Pertanyaan Quiz 3 (Bahasa & Komunikasi N4 - id_quiz 3) ───
INSERT INTO pertanyaan (id_quiz, pertanyaan) VALUES
(3, 'Apa arti dari kanji 意味?'),
(3, 'Apa bacaan dari kanji 漢字?'),
(3, 'Apa arti dari kanji 文法?'),
(3, 'Apa arti dari kanji 発音?'),
(3, 'Apa bacaan dari kanji 小説?');

-- ── Jawaban Quiz 3 (N4) ──────────────────────────────────────
INSERT INTO jawaban (id_pertanyaan, pilihan_jawaban, jawaban_benar) VALUES
(11, 'Arti', true), (11, 'Suara', false), (11, 'Kata', false), (11, 'Buku', false),
(12, 'かんじ', true), (12, 'かなじ', false), (12, 'かんち', false), (12, 'がんじ', false),
(13, 'Tata Bahasa', true), (13, 'Sastra', false), (13, 'Tulisan', false), (13, 'Kalimat', false),
(14, 'Pelafalan', true), (14, 'Mendengar', false), (14, 'Berbicara', false), (14, 'Lagu', false),
(15, 'しょうせつ', true), (15, 'こせつ', false), (15, 'ちいせつ', false), (15, 'きょうせつ', false);

-- ── Pertanyaan Quiz 4 (Dunia Kerja N3 - id_quiz 4) ────────────
INSERT INTO pertanyaan (id_quiz, pertanyaan) VALUES
(4, 'Apa arti dari kanji 会議?'),
(4, 'Apa arti dari kanji 残業?'),
(4, 'Kanji 担当 dibaca sebagai...'),
(4, 'Apa arti dari kanji 書類?'),
(4, 'Kanji 職業 berarti...');

-- ── Jawaban Quiz 4 (N3) ──────────────────────────────────────
INSERT INTO jawaban (id_pertanyaan, pilihan_jawaban, jawaban_benar) VALUES
(16, 'Rapat', true), (16, 'Pesta', false), (16, 'Janji', false), (16, 'Kantor', false),
(17, 'Lembur', true), (17, 'Libur', false), (17, 'Gaji', false), (17, 'Berhenti', false),
(18, 'たんとう', true), (18, 'だんとう', false), (18, 'ばんとう', false), (18, 'せんとう', false),
(19, 'Dokumen', true), (19, 'Buku Kas', false), (19, 'Rak Buku', false), (19, 'Alat Tulis', false),
(20, 'Pekerjaan', true), (20, 'Tempat Kerja', false), (20, 'Rekan Kerja', false), (20, 'Gaji', false);

-- ── Pertanyaan Quiz 5 (Ekonomi N2 - id_quiz 5) ───────────────
INSERT INTO pertanyaan (id_quiz, pertanyaan) VALUES
(5, 'Apa arti dari kanji 雇用?'),
(5, 'Kanji 景気 merujuk pada...'),
(5, 'Apa arti dari kanji 制度?'),
(5, 'Kanji 普及 dibaca sebagai...'),
(5, 'Apa arti dari kanji 建設?');

-- ── Jawaban Quiz 5 (N2) ──────────────────────────────────────
INSERT INTO jawaban (id_pertanyaan, pilihan_jawaban, jawaban_benar) VALUES
(21, 'Pekerjaan/Pengerjaan (Employment)', true), (21, 'Pemecatan', false), (21, 'Promosi', false), (21, 'Wawancara', false),
(22, 'Kondisi Ekonomi', true), (22, 'Pemandangan', false), (22, 'Cuaca', false), (22, 'Perasaan', false),
(23, 'Sistem/Institusi', true), (23, 'Hukum', false), (23, 'Pemerintah', false), (23, 'Organisasi', false),
(24, 'ふきゅう', true), (24, 'ふくきゅう', false), (24, 'ふぎゅう', false), (24, 'ぷきゅう', false),
(25, 'Konstruksi', true), (25, 'Penghancuran', false), (25, 'Arsitek', false), (25, 'Bangunan', false);

-- ── Pertanyaan Quiz 6 (Abstrak N1 - id_quiz 6) ───────────────
INSERT INTO pertanyaan (id_quiz, pertanyaan) VALUES
(6, 'Apa arti dari kanji 妥協?'),
(6, 'Apa arti dari kanji 克服?'),
(6, 'Kanji 矛盾 dibaca sebagai...'),
(6, 'Apa arti dari kanji 秩序?'),
(6, 'Apa arti dari kanji 示唆?');

-- ── Jawaban Quiz 6 (N1) ──────────────────────────────────────
INSERT INTO jawaban (id_pertanyaan, pilihan_jawaban, jawaban_benar) VALUES
(26, 'Kompromi', true), (26, 'Kerja sama', false), (26, 'Penolakan', false), (26, 'Diskusi', false),
(27, 'Mengatasi/Menaklukkan', true), (27, 'Menyerah', false), (27, 'Mengikuti', false), (27, 'Menghindari', false),
(28, 'むじゅん', true), (28, 'ぼうじゅん', false), (28, 'むとん', false), (28, 'まじゅん', false),
(29, 'Ketertiban/Order', true), (29, 'Kekacauan', false), (29, 'Hukum', false), (29, 'Etika', false),
(30, 'Saran/Implikasi', true), (30, 'Instruksi', false), (30, 'Kritik', false), (30, 'Pujian', false);