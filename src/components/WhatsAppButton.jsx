import React from "react";
import { Button } from "primereact/button";

export default function WhatsAppButton({ productName }) {
  const message = encodeURIComponent(
    `Hola! Estoy interesado(a) en el bolso "${productName}" que vi en tu tienda. ¿Está disponible?`
  );
  const url = `https://wa.me/573147447618?text=${message}`;

  return (
    <Button
      label="Quiero este bolso"
      icon="pi pi-whatsapp"
      severity="success"
      onClick={() => window.open(url, "_blank")}
      size="small"
      raised
    />
  );
}
