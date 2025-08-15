import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importa los componentes de los layouts
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import ProtectedRoute from "./components/ProtectedRoute";

// Importa las páginas públicas de forma normal (se necesitan de inmediato)
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Catalogo from "./pages/Catalogo";

// ✅ Importa las páginas de administración de forma perezosa
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminProducts = lazy(() => import("./pages/AdminProducts"));
const AdminProductForm = lazy(() => import("./pages/AdminProductForm"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
import AdminSettings from "./pages/AdminSettings";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Agrupa todas las rutas públicas bajo el PublicLayout */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalogo />} />
          <Route path="sobre-nosotros" element={<AboutUs />} />
        </Route>

        {/* Rutas de administración fuera del layout público */}
        {/* ✅ Envuelve la ruta de login en Suspense */}
        <Route
          path="/admin/login"
          element={
            <Suspense fallback={<div>Cargando...</div>}>
              <AdminLoginPage />
            </Suspense>
          }
        />

        {/* Agrupa las rutas de administración que necesitan el AdminLayout */}
        <Route path="/admin" element={<ProtectedRoute />}>
          {/* ✅ Envuelve las rutas anidadas en un solo Suspense */}
          <Route element={<AdminLayout />}>
            <Route
              index
              element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <AdminDashboard />
                </Suspense>
              }
            />
            <Route
              path="productos"
              element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <AdminProducts />
                </Suspense>
              }
            />
            <Route
              path="productos/nuevo"
              element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <AdminProductForm />
                </Suspense>
              }
            />
            <Route
              path="productos/editar/:id"
              element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <AdminProductForm />
                </Suspense>
              }
            />
            <Route
              path="usuarios"
              element={
                <Suspense fallback={<div>Cargando...</div>}>
                  <AdminUsers />
                </Suspense>
              }
            />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
