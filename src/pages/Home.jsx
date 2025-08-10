import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

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
          {/* Hacemos el contenedor del ProductCard más pequeño */}
          <div
            className="col-12 md:col-6 lg:col-3 max-w-md"
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
        {/* Aumentamos el margen superior para más visibilidad */}
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
                window.open("https://instagram.com/pearlbyyou", "_blank")
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
                window.open("https://facebook.com/pearlbyyou", "_blank")
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
                window.open("https://www.tiktok.com/@pearl_byyou", "_blank")
              }
              className="p-button-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
