import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { WHATSAPP_PHONE_NUMBER } from "../utils/constants";

export default function Home() {
  const navigate = useNavigate();

  const featuredProduct = {
    id: 1,
    nombre: "Bolso Elegance Mini",
    precio: 85000,
    descripcion: "Diseño minimalista y elegante, ideal para eventos.",
    imagenes: [
      { url: "/uploads/bolsos/ISA1.jpg", orden: 0 },
      { url: "/uploads/bolsos/ISA2.jpg", orden: 1 },
    ],
  };

  return (
    <div className="py-0 mt-5">
      <div className="px-4 md:px-2 lg:px-8">
        <div className="text-center mb-0">
          <h1 className="text-pearl text-5xl md:text-6xl font-bold mt-0 mb-1">
            PEARL
          </h1>
          <p className="text-pearl text-xl md:text-3xl mt-0 mb-1">
            TU BOLSO, TU MOOD
          </p>
        </div>
        <div className="flex justify-content-center">
          <div
            className="col-12 md:col-6 lg:col-3"
            style={{ maxWidth: "300px" }}
          >
            <ProductCard product={featuredProduct} />
          </div>
        </div>
        <div className="text-center mt-5">
          <Button
            label="Ver Catálogo Completo"
            icon="pi pi-shopping-bag"
            severity="warning"
            onClick={() => navigate("/catalogo")}
          />
        </div>
        <div className="mt-7">
          <h2 className="text-center text-pearl text-3xl font-bold mb-4">
            Bolsos Populares
          </h2>
        </div>
        <div className="text-center mt-7">
          <p className="text-pearl text-lg mb-3">Síguenos en nuestras redes</p>
          <div className="flex justify-content-center gap-4">
            <Button
              icon="pi pi-instagram"
              rounded
              text
              severity="secondary"
              aria-label="Instagram"
              onClick={() =>
                window.open("https://instagram.com/pearlbyou", "_blank")
              }
              className="p-button-lg"
            />
            <Button
              icon="pi pi-facebook"
              rounded
              text
              severity="secondary"
              aria-label="Facebook"
              onClick={() =>
                window.open("https://facebook.com/pearlbyou", "_blank")
              }
              className="p-button-lg"
            />
            <Button
              icon="pi pi-tiktok"
              rounded
              text
              severity="secondary"
              aria-label="TikTok"
              onClick={() =>
                window.open("https://www.tiktok.com/@pearl_byou", "_blank")
              }
              className="p-button-lg"
            />
          </div>
        </div>

        {/* Nueva sección de Contacto */}
        <div className="text-center mt-7">
          <h2 className="text-pearl text-3xl font-bold mb-3">Contáctanos</h2>
          <div className="flex justify-content-center flex-column align-items-center">
            <p className="text-pearl text-lg mb-2">
              Envíanos un mensaje por WhatsApp:
            </p>
            <Button
              label={`+${WHATSAPP_PHONE_NUMBER}`}
              icon="pi pi-whatsapp"
              severity="success"
              className="mb-3"
              onClick={() =>
                window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}`, "_blank")
              }
            />
            <p className="text-pearl text-lg">O escríbenos a nuestro correo:</p>
            <a
              href="mailto:tu-correo-aqui@ejemplo.com"
              className="text-pearl text-lg font-bold"
              style={{ textDecoration: "none" }}
            >
              tu-correo-aqui@ejemplo.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
