import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Flashcard.css";

const JLPT_LEVELS = [5, 4, 3, 2, 1];
const API = "http://localhost:5000/api"; // ← backend Express + PostgreSQL

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Bacaan on/kun disimpan sebagai teks dipisah koma di database
function splitReadings(str) {
  if (!str) return [];
  return str.split(/[、,]/).map((s) => s.trim()).filter(Boolean);
}

export default function Flashcard() {
  const [level, setLevel]           = useState(5);
  const [kanjiList, setKanjiList]   = useState([]); // data lengkap dari API
  const [deck, setDeck]             = useState([]); // versi diacak
  const [index, setIndex]           = useState(0);
  const [flipped, setFlipped]       = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [error, setError]           = useState(null);
  const [known, setKnown]           = useState(new Set());
  const [unknown, setUnknown]       = useState(new Set());
  const [done, setDone]             = useState(false);

  // ── Fetch data kanji (sekali per level) ────────────────────
  useEffect(() => {
    setKanjiList([]);
    setDeck([]);
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
    setError(null);
    setLoadingList(true);

    axios
      .get(`${API}/kanji`, { params: { level: `N${level}` } })
      .then((res) => {
        setKanjiList(res.data);
        setDeck(shuffle(res.data));
      })
      .catch(() =>
        setError("Gagal memuat kanji. Pastikan server backend (node server.js) berjalan.")
      )
      .finally(() => setLoadingList(false));
  }, [level]);

  // ── Navigasi ────────────────────────────────────────────────
  const goPrev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(0, i - 1));
  };

  const goNext = () => {
    if (index >= deck.length - 1) {
      setDone(true);
    } else {
      setFlipped(false);
      setIndex((i) => i + 1);
    }
  };

  const markKnown = () => {
    setKnown((prev) => new Set([...prev, index]));
    setUnknown((prev) => { const s = new Set(prev); s.delete(index); return s; });
    goNext();
  };

  const markUnknown = () => {
    setUnknown((prev) => new Set([...prev, index]));
    setKnown((prev) => { const s = new Set(prev); s.delete(index); return s; });
    goNext();
  };

  const reshuffle = () => {
    setDeck(shuffle(kanjiList));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
  };

  const reviewUnknown = () => {
    const unknownCards = deck.filter((_, i) => unknown.has(i));
    if (!unknownCards.length) return;
    setDeck(shuffle(unknownCards));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setDone(false);
  };

  const current  = deck[index];
  const progress = deck.length > 0 ? (index / deck.length) * 100 : 0;

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="fc-page">
      {/* Hero */}
      <div className="fc-hero">
        <div className="fc-hero__deco">カード</div>
        <h1 className="fc-hero__title">Flash Card Kanji</h1>
        <p className="fc-hero__sub">Klik kartu untuk membalik dan lihat arti serta bacaan</p>
        <div className="fc-filter">
          {JLPT_LEVELS.map((n) => (
            <button
              key={n}
              className={`fc-filter__btn fc-filter__btn--n${n} ${level === n ? "active" : ""}`}
              onClick={() => setLevel(n)}
            >
              N{n}
            </button>
          ))}
        </div>
      </div>

      <div className="fc-main">
        {/* Loading */}
        {loadingList && (
          <div className="fc-status">
            <div className="fc-spinner" />
            <span>Memuat kanji N{level}...</span>
          </div>
        )}

        {/* Error */}
        {error && !loadingList && (
          <div className="fc-status" style={{ color: "#c0392b" }}>
            {error}
          </div>
        )}

        {/* Kosong */}
        {!loadingList && !error && deck.length === 0 && (
          <div className="fc-status">Belum ada kanji untuk level N{level} di database.</div>
        )}

        {/* Selesai semua kartu */}
        {done && (
          <div className="fc-done">
            <div className="fc-done__emoji">🎉</div>
            <h2>Kartu Habis!</h2>
            <div className="fc-done__stats">
              <div className="fc-done__stat fc-done__stat--known">
                <span className="fc-done__stat-num">{known.size}</span>
                <span>Sudah Tahu</span>
              </div>
              <div className="fc-done__stat fc-done__stat--unknown">
                <span className="fc-done__stat-num">{unknown.size}</span>
                <span>Belum Tahu</span>
              </div>
            </div>
            <div className="fc-done__actions">
              <button className="fc-action-btn fc-action-btn--primary" onClick={reshuffle}>
                ⇄ Acak Ulang Semua
              </button>
              {unknown.size > 0 && (
                <button className="fc-action-btn fc-action-btn--secondary" onClick={reviewUnknown}>
                  ✗ Review yang Belum Tahu ({unknown.size})
                </button>
              )}
            </div>
          </div>
        )}

        {/* Main flashcard */}
        {!loadingList && !error && current && !done && (
          <>
            {/* Progress bar */}
            <div className="fc-progress-wrap">
              <div className="fc-progress-bar">
                <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="fc-progress-meta">
                <span>{index + 1} <small>/ {deck.length}</small></span>
                <div className="fc-progress-tags">
                  <span className="fc-tag fc-tag--known">✓ {known.size}</span>
                  <span className="fc-tag fc-tag--unknown">✗ {unknown.size}</span>
                </div>
              </div>
            </div>

            {/* Kartu */}
            <div className="fc-card-scene">
              <div
                className={`fc-card ${flipped ? "fc-card--flipped" : ""}`}
                onClick={() => setFlipped((f) => !f)}
                role="button"
                aria-label="Klik untuk membalik kartu"
              >
                {/* Depan */}
                <div className="fc-card__face fc-card__front">
                  <div className="fc-card__level-badge">{current.level_nama || `N${level}`}</div>
                  <div className="fc-card__char">{current.karakter}</div>
                  <div className="fc-card__hint">
                    <span>Klik untuk melihat jawaban</span>
                  </div>
                </div>

                {/* Belakang */}
                <div className="fc-card__face fc-card__back">
                  <div className="fc-card__char fc-card__char--sm">{current.karakter}</div>
                  <div className="fc-card__meanings">{current.arti}</div>
                  <div className="fc-card__divider" />
                  <div className="fc-card__readings">
                    {splitReadings(current.onyomi).length > 0 && (
                      <div className="fc-card__reading-row">
                        <span className="fc-card__reading-label">音</span>
                        <span className="fc-card__reading-val fc-card__reading-val--on">
                          {splitReadings(current.onyomi).join("　")}
                        </span>
                      </div>
                    )}
                    {splitReadings(current.kunyomi).length > 0 && (
                      <div className="fc-card__reading-row">
                        <span className="fc-card__reading-label">訓</span>
                        <span className="fc-card__reading-val fc-card__reading-val--kun">
                          {splitReadings(current.kunyomi).join("　")}
                        </span>
                      </div>
                    )}
                  </div>
                  {current.stroke_count && (
                    <div className="fc-card__stroke">{current.stroke_count} stroke</div>
                  )}
                </div>
              </div>
            </div>

            {/* Tombol aksi */}
            <div className="fc-controls">
              <button className="fc-nav-btn" onClick={goPrev} disabled={index === 0}>
                ←
              </button>

              {flipped ? (
                <div className="fc-verdict-btns">
                  <button className="fc-verdict fc-verdict--unknown" onClick={markUnknown}>
                    ✗<span>Belum Tahu</span>
                  </button>
                  <button className="fc-verdict fc-verdict--known" onClick={markKnown}>
                    ✓<span>Sudah Tahu</span>
                  </button>
                </div>
              ) : (
                <button className="fc-flip-btn" onClick={() => setFlipped(true)}>
                  Balik Kartu ↑
                </button>
              )}

              <button
                className="fc-nav-btn"
                onClick={goNext}
                disabled={index >= deck.length - 1 && !done}
              >
                →
              </button>
            </div>

            <button className="fc-shuffle-btn" onClick={reshuffle}>
              ⇄ Acak Ulang
            </button>
          </>
        )}
      </div>
    </div>
  );
}