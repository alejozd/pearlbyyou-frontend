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
    imagen_url: "/images/bolsos/ISA1.jpg",
  };

  return (
    <div className="py-4">
      <div className="px-4 md:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h1 className="text-pearl text-5xl md:text-6xl font-bold">PEARL</h1>
          <p className="text-pearl text-xl md:text-3xl mt-2">
            TU BOLSO, TU MOOD
          </p>
        </div>

        {/* Contenedor responsivo con PrimeFlex */}
        <div className="flex justify-content-center">
          <div className="col-12 md:col-6 lg:col-4">
            <ProductCard product={featuredProduct} />
          </div>
        </div>

        <div className="text-center mt-4">
          <Button
            label="Ver Catálogo Completo"
            icon="pi pi-shopping-bag"
            severity="success"
            className="p-button-lg"
            onClick={() => navigate("/catalogo")}
          />
        </div>
      </div>
    </div>
  );
}
