import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import logo from "../assets/images/logo.png";
import { WHATSAPP_PHONE_NUMBER } from "../utils/constants";

const items = [
  { label: "Inicio", icon: "pi pi-home", url: "/" },
  { label: "Catálogo", icon: "pi pi-shopping-bag", url: "/catalogo" },
  {
    label: "Sobre Nosotros",
    icon: "pi pi-info-circle",
    url: "/sobre-nosotros",
  },
];

export default function NavBar() {
  const start = (
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
    <div className="flex align-items-center gap-2">
      {/* Íconos de redes sociales */}
      <Tooltip target=".instagram-btn" position="bottom" />
      <Button
        icon="pi pi-instagram"
        rounded
        text
        severity="secondary"
        onClick={() => window.open("https://instagram.com/pearlbyou", "_blank")}
        aria-label="Instagram"
        className="instagram-btn"
        data-pr-tooltip="Instagram"
      />
      <Tooltip target=".facebook-btn" position="bottom" />
      <Button
        icon="pi pi-facebook"
        rounded
        text
        severity="secondary"
        onClick={() => window.open("https://facebook.com/pearlbyou", "_blank")}
        aria-label="Facebook"
        className="facebook-btn"
        data-pr-tooltip="Facebook"
      />
      <Tooltip target=".tiktok-btn" position="bottom" />
      <Button
        icon="pi pi-tiktok"
        rounded
        text
        severity="secondary"
        onClick={() =>
          window.open("https://www.tiktok.com/@pearl_byou", "_blank")
        }
        aria-label="TikTok"
        className="tiktok-btn"
        data-pr-tooltip="TikTok"
      />
      {/* Botón de WhatsApp */}
      <Button
        // label="Contactar por WhatsApp"
        label="WhatsApp"
        icon="pi pi-whatsapp"
        severity="success"
        size="small"
        onClick={() => window.open(whatsappUrl, "_blank")}
      />
    </div>
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
            ></span>
            {/* Color del ícono */}
            <span
              className={options.labelClassName}
              style={{ color: "#5b4b42" }}
            >
              {item.label}
            </span>
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
