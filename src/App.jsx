import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa los componentes de los layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";

// Importa las páginas públicas
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Catalogo from "./pages/Catalogo";

// Importa las páginas de administración
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminProductForm from "./pages/AdminProductForm";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Agrupa todas las rutas públicas bajo el PublicLayout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="sobre-nosotros" element={<AboutUs />} />
        </Route>

        {/* ✅ Rutas de administración fuera del layout público */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* ✅ Agrupa las rutas de administración que necesitan el AdminLayout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="productos/nuevo" element={<AdminProductForm />} />
          <Route path="productos/editar/:id" element={<AdminProductForm />} />
        </Route>
      </Routes>
    </Router>
  );
}
