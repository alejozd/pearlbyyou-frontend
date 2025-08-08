import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

const items = [
  { label: "Inicio", icon: "pi pi-home", url: "/" },
  { label: "Catálogo", icon: "pi pi-shopping-bag", url: "/catalogo" },
];

export default function NavBar() {
  const start = (
    <div className="flex align-items-center">
      <img
        src={logo}
        alt="Pearl by You"
        style={{ width: "auto", height: "auto" }}
      />
    </div>
  );

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
      className="whatsapp-button"
    />
  );

  return (
    <Menubar
      model={items.map((item) => ({
        ...item,
        command: () => {
          if (item.url) {
            window.location.href = item.url;
          }
        },
      }))}
      start={start}
      end={end}
      className="p-mb-4 p-menubar-lg"
    />
  );
}
