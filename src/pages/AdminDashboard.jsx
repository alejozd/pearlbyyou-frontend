import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del localStorage
    localStorage.removeItem("authToken");
    // Redirige al usuario a la página de login
    navigate("/admin/login");
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center m-5">
      <Card
        title="Panel de Administración"
        className="w-full md:w-30rem text-center"
      >
        <p className="m-0 mb-4">¡Bienvenid@ al Panel de Administración!</p>

        <div className="flex flex-column gap-3">
          <Button
            label="Gestionar Productos"
            icon="pi pi-box"
            severity="primary"
            onClick={() => navigate("/admin/productos")}
          />
          {/* Aquí podrías agregar más botones para otras secciones */}
          <Button
            label="Gestionar Pedidos"
            icon="pi pi-shopping-cart"
            severity="secondary"
            disabled
          />
        </div>
      </Card>

      <Button
        label="Cerrar Sesión"
        icon="pi pi-sign-out"
        severity="danger"
        className="mt-5"
        onClick={handleLogout}
      />
    </div>
  );
}
