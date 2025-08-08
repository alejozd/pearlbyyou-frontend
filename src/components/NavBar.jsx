import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";

export default function NavBar() {
  const menuItems = [
    { label: "Inicio", url: "/" },
    { label: "Catálogo", url: "/#catalogo" },
  ];

  const start = <span className="font-bold text-xl">Pearl by You</span>;

  const end = (
    <Button
      label="Contactar por WhatsApp"
      icon="pi pi-whatsapp"
      severity="success"
      size="small"
      onClick={() =>
        window.open(
          "https://wa.me/573001234567?text=Hola!%20Estoy%20interesado%20en%20tus%20bolsos.",
          "_blank"
        )
      }
    />
  );

  return <Menubar model={menuItems} start={start} end={end} />;
}
