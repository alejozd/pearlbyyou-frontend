import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { Link } from "react-router-dom"; // Importamos el componente Link
import logo from "../assets/images/logo.png";

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
        // Usamos clases de PrimeFlex para controlar el tamaño y los márgenes
        className="h-2.5rem md:h-2.5rem mr-2"
      />
    </Link>
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
    />
  );

  return (
    <Menubar
      model={items.map((item) => ({
        ...item,
        template: (item, options) => (
          // Usamos el componente Link para la navegación
          <Link to={item.url} className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        ),
      }))}
      start={start}
      end={end}
      // Agregamos clases para el diseño y la sombra
      className="p-3 shadow-2"
    />
  );
}
