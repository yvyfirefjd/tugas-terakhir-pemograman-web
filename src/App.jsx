import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Kanji from "./pages/Kanji.jsx";
import Flashcard from "./pages/Flashcard.jsx";
import Kuis from "./pages/Kuis.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/kanji" element={<Kanji />} />
          <Route path="/flashcard" element={<Flashcard />} />
          <Route path="/kuis" element={<Kuis />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}