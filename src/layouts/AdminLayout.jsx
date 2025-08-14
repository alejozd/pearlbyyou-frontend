import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { jwtDecode } from "jwt-decode"; // ✅ Corrección: Importación nombrada

export default function AdminLayout() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // ✅ Corrección: Uso de la función jwtDecode
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Token no válido:", error);
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
