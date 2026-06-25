import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Benefit from "./pages/Benefit.jsx";
import Hiragana from "./pages/Hiragana.jsx";
import Katakana from "./pages/Katakana.jsx";
import KanjiHome from "./pages/KanjiHome.jsx";
import Kanji from "./pages/Kanji.jsx";
import Flashcard from "./pages/Flashcard.jsx";
import Kuis from "./pages/Kuis.jsx";
import Budaya from "./pages/Budaya.jsx";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/hiragana" element={<Hiragana />} />
          <Route path="/katakana" element={<Katakana />} />
          <Route path="/kanjiHome" element={<KanjiHome />} />
          <Route path="/kanji" element={<Kanji />} />
          <Route path="/flashcard" element={<Flashcard />} />
          <Route path="/kuis" element={<Kuis />} />
          <Route path="/benefit" element={<Benefit />} />
          <Route path="/budaya" element={<Budaya />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}