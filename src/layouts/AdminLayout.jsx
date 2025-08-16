import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { jwtDecode } from "jwt-decode";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        // ✅ Lógica para verificar la expiración del token
        const currentTime = Date.now() / 1000; // Tiempo actual en segundos (timestamp UNIX)
        if (decodedToken.exp < currentTime) {
          // Si el token ha expirado
          console.error("El token ha expirado. Redirigiendo al login.");
          localStorage.removeItem("authToken"); // Elimina el token caducado
          navigate("/admin/login");
        } else {
          // El token es válido y no ha expirado
          setUserRole(decodedToken.role);
        }
      } catch (error) {
        // Si el token es inválido o corrupto (jwtDecode falla)
        console.error("Token no válido o corrupto:", error);
        localStorage.removeItem("authToken");
        navigate("/admin/login");
      }
    } else {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  const items = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => {
        navigate("/admin");
      },
    },
    {
      label: "Productos",
      icon: "pi pi-box",
      command: () => {
        navigate("/admin/productos");
      },
    },
    {
      label: "Contenido Web",
      icon: "pi pi-file-edit",
      command: () => {
        navigate("/admin/settings");
      },
    },
  ];

  if (userRole === "super_admin") {
    items.push({
      label: "Administrar Usuarios",
      icon: "pi pi-users",
      command: () => {
        navigate("/admin/usuarios");
      },
    });
  }

  const end = (
    <Button
      label="Cerrar Sesión"
      icon="pi pi-sign-out"
      className="p-button-danger"
      onClick={handleLogout}
    />
  );

  return (
    <div className="admin-layout">
      <Menubar model={items} end={end} className="shadow-2 mb-4" />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  );
}
