import React from "react";
import { Button } from "primereact/button";
import { WHATSAPP_PHONE_NUMBER } from "../utils/constants";

export default function WhatsAppButton({ productName }) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hola,%20estoy%20interesado%20en%20el%20producto:%20${productName}`;

  return (
    <Button
      label="Quiero este bolso"
      icon="pi pi-whatsapp"
      severity="success"
      onClick={() => window.open(whatsappUrl, "_blank")}
      size="small"
      raised
    />
  );
}
