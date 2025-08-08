import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";

// Importa el tema de PrimeReact
import "primereact/resources/themes/mdc-light-indigo/theme.css"; // ← Usa un tema claro
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

export default function App() {
  return (
    <Router>
      <NavBar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
        </Routes>
      </main>
    </Router>
  );
}
