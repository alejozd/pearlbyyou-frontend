import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Obtiene el token de autenticación del almacenamiento local
  const token = localStorage.getItem("authToken");

  // Si existe un token, permite que la ruta anidada se renderice
  if (token) {
    return <Outlet />;
  }

  // Si no hay token, redirige al usuario a la página de inicio de sesión
  return <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
