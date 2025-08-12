// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home"; // Asumo que Home es tu HomePage actual
import AboutUs from "./pages/AboutUs"; // Asumo que AboutUs es tu AboutUsPage actual
import Footer from "./components/Footer";
import Catalogo from "./pages/Catalogo"; // Asumo que Catalogo es tu CatalogPage actual

// ✅ Importa los nuevos componentes del panel de administración
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";

export default function App() {
  return (
    <Router>
      <NavBar />
      <main className="min-h-screen">
        {" "}
        {/* Asegúrate de que esta clase de main permita que el footer quede abajo */}
        <Routes>
          {/* ✅ Rutas públicas de tu sitio */}
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/sobre-nosotros" element={<AboutUs />} />

          {/* ✅ Ruta para el login del panel de administración (no protegida) */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* ✅ Rutas del panel de administración (protegidas por AdminLayout) */}
          <Route path="/admin" element={<AdminLayout />}>
            {/* La ruta base /admin redirigirá a /admin/dashboard por defecto */}
            <Route index element={<AdminDashboard />} />
            {/* Aquí irán otras rutas del admin, como /admin/productos, /admin/configuracion, etc. */}
            <Route path="productos" element={<AdminProducts />} />
            <Route path="productos/nuevo" element={<AdminProductForm />} />
            <Route path="productos/editar/:id" element={<AdminProductForm />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
