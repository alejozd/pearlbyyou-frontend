import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

export default function AdminLayout() {
  const navigate = useNavigate();

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
