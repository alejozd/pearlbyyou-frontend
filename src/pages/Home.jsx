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
    <div className="py-0 mt-5">
      {" "}
      {/* Se elimina el padding, pero se añade un margen superior */}
      <div className="px-4 md:px-2 lg:px-8">
        {/* Contenedor del título */}
        <div className="text-center mb-0">
          {" "}
          {/* Eliminamos el margen inferior por defecto */}
          <h1 className="text-pearl text-5xl md:text-6xl font-bold mt-0 mb-1">
            PEARL
          </h1>
          <p className="text-pearl text-xl md:text-3xl mt-0 mb-1">
            {" "}
            {/* Añadimos el margen inferior aquí */}
            TU BOLSO, TU MOOD
          </p>
        </div>

        {/* Producto destacado con contenedor responsivo */}
        <div className="flex justify-content-center">
          <div className="col-12 md:col-6 lg:col-4">
            <ProductCard product={featuredProduct} />
          </div>
        </div>

        {/* Llamado a acción */}
        <div className="text-center mt-5">
          <Button
            label="Ver Catálogo Completo"
            icon="pi pi-shopping-bag"
            severity="warning"
            onClick={() => navigate("/catalogo")}
          />
        </div>
      </div>
    </div>
  );
}
