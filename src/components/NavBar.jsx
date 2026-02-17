import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import logo from "../assets/images/logo.PNG";
import { WHATSAPP_PHONE_NUMBER } from "../utils/constants";

const menuItems = [
  { label: "Inicio", icon: "pi pi-home", url: "/" },
  { label: "Catálogo", icon: "pi pi-shopping-bag", url: "/catalogo" },
  { label: "Sobre Nosotros", icon: "pi pi-heart", url: "/sobre-nosotros" },
];

export default function NavBar() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hola!%20Estoy%20interesado%20en%20tus%20bolsos.`;

  const start = (
    <Link to="/" className="flex align-items-center gap-2 no-underline">
      <img src={logo} alt="Pearl by You" className="h-3rem w-auto" />
      <span className="font-semibold text-sm hidden md:block">Pearl by You</span>
    </Link>
  );

  const end = (
    <div className="flex align-items-center gap-2">
      <Tooltip target=".social-btn" position="bottom" />
      <Button
        icon="pi pi-instagram"
        rounded
        text
        severity="secondary"
        onClick={() => window.open("https://instagram.com/pearlbyou", "_blank")}
        aria-label="Instagram"
        className="social-btn"
        data-pr-tooltip="Instagram"
      />
      <Button
        icon="pi pi-tiktok"
        rounded
        text
        severity="secondary"
        onClick={() => window.open("https://www.tiktok.com/@pearl_byou", "_blank")}
        aria-label="TikTok"
        className="social-btn"
        data-pr-tooltip="TikTok"
      />
      <Button
        label="WhatsApp"
        icon="pi pi-whatsapp"
        size="small"
        className="whatsapp-pill"
        onClick={() => window.open(whatsappUrl, "_blank")}
      />
    </div>
  );

  return (
    <div className="page-shell" style={{ marginTop: "1.2rem" }}>
      <Menubar
        model={menuItems.map((item) => ({
          ...item,
          template: (_, options) => (
            <Link to={item.url} className={`${options.className} px-3 py-2 no-underline`}>
              <span className={`${options.iconClassName} mr-2`} style={{ color: "#5b4b42" }} />
              <span className={options.labelClassName} style={{ color: "#5b4b42" }}>
                {item.label}
              </span>
            </Link>
          ),
        }))}
        start={start}
        end={end}
        className="py-2 px-3"
        style={{ backgroundColor: "#f4ece2" }}
      />
    </div>
  );
}
