import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Productos",
      description: "Crea, edita o desactiva bolsos del catálogo.",
      icon: "pi pi-box",
      action: () => navigate("/admin/productos"),
      cta: "Gestionar productos",
    },
    {
      title: "Contenido del sitio",
      description: "Actualiza textos de Sobre Nosotros y Footer.",
      icon: "pi pi-file-edit",
      action: () => navigate("/admin/settings"),
      cta: "Editar contenido",
    },
    {
      title: "Usuarios admin",
      description: "Administra accesos y roles del panel.",
      icon: "pi pi-users",
      action: () => navigate("/admin/usuarios"),
      cta: "Ver usuarios",
    },
  ];

  return (
    <section className="admin-page">
      <div className="mb-4">
        <p className="m-0 text-sm text-pearl-soft">Resumen</p>
        <h2 className="m-0 text-3xl">Panel de administración</h2>
      </div>

      <div className="grid">
        {quickActions.map((item) => (
          <div className="col-12 md:col-6 xl:col-4" key={item.title}>
            <Card className="soft-card h-full">
              <div className="flex flex-column gap-3">
                <i className={`${item.icon} text-2xl`} style={{ color: "#8b5e3c" }} />
                <h3 className="m-0 text-xl">{item.title}</h3>
                <p className="m-0 text-pearl-soft line-height-3">{item.description}</p>
                <Button label={item.cta} outlined onClick={item.action} />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}
