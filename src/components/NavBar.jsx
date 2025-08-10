import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom"; // Importamos el componente Link
import logo from "../assets/images/logo.png";
import { WHATSAPP_PHONE_NUMBER } from "../utils/constants";

const items = [
  { label: "Inicio", icon: "pi pi-home", url: "/" },
  { label: "Catálogo", icon: "pi pi-shopping-bag", url: "/catalogo" },
];

export default function NavBar() {
  const start = (
    // Envolvemos el logo en un componente Link para que sea clicable
    <Link to="/" className="flex align-items-center">
      <img
        src={logo}
        alt="Pearl by You"
        className="h-3rem object-contain mr-2"
      />
    </Link>
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hola!%20Estoy%20interesado%20en%20tus%20bolsos.`;

  const end = (
    <Button
      label="Contactar por WhatsApp"
      icon="pi pi-whatsapp"
      severity="success"
      size="small"
      onClick={() => window.open(whatsappUrl, "_blank")}
    />
  );

  return (
    <Menubar
      model={items.map((item) => ({
        ...item,
        template: (item, options) => (
          // Usamos el componente Link para la navegación
          <Link to={item.url} className={options.className}>
            <span
              className={options.iconClassName}
              style={{ color: "#5b4b42" }}
            ></span>{" "}
            {/* Color del ícono */}
            <span
              className={options.labelClassName}
              style={{ color: "#5b4b42" }}
            >
              {item.label}
            </span>{" "}
            {/* Color del texto */}
          </Link>
        ),
      }))}
      start={start}
      end={end}
      // Agregamos clases para el diseño y la sombra
      className="p-1 shadow-2 align-items-center"
      style={{ backgroundColor: "#e7e3d8" }}
    />
  );
}
