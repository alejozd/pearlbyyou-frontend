import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate para la navegación
import WhatsAppButton from "../components/WhatsAppButton";
import ProductCard from "../components/ProductCard"; // Componente reutilizable

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
    <div className="py-8">
      <div className="px-4 md:px-6 lg:px-8">
        {/* Banner principal */}
        <div className="text-center mb-8">
          <h1 className="text-pearl text-5xl md:text-6xl font-bold">PEARL</h1>
          <p className="text-pearl text-xl md:text-3xl mt-2">
            TU BOLSO, TU MOOD
          </p>
        </div>

        {/* Producto destacado */}
        <div className="flex justify-content-center p-2">
          <ProductCard
            product={featuredProduct}
            className="shadow-2 hover:shadow-4 transition-all"
          />
        </div>

        {/* Llamado a acción */}
        <div className="text-center mt-8">
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
