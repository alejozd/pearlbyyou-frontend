import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AdminLayout() {
  // ✅ Obtiene el token del almacenamiento local
  const isAuthenticated = localStorage.getItem("authToken");

  if (!isAuthenticated) {
    // ✅ Si no hay token, redirige al login
    return <Navigate to="/admin/login" replace />;
  }

  // ✅ Si hay token, muestra el contenido de la ruta anidada
  return (
    <div className="admin-layout">
      {/* Puedes agregar un NavBar o Sidebar específico para el admin aquí */}
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
