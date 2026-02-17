import React from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const navigate = useNavigate();

  const featuredProduct = {
    id: 1,
    nombre: "Bolso ISA",
    precio: 28000,
    descripcion: "Diseño minimalista y elegante para elevar cualquier outfit.",
    imagenes: [
      { url: "/uploads/bolsos/ISA1.jpg", orden: 0 },
      { url: "/uploads/bolsos/ISA2.jpg", orden: 1 },
    ],
  };

  return (
    <div className="page-shell">
      <section className="soft-card p-4 md:p-6 mb-5">
        <div className="grid align-items-center">
          <div className="col-12 lg:col-7">
            <p className="text-sm uppercase letter-spacing-2 text-pearl-soft mt-0 mb-2">Nueva temporada</p>
            <h1 className="text-5xl md:text-7xl font-bold mt-0 mb-3 brand-gradient-text">PEARL</h1>
            <p className="text-xl md:text-3xl font-medium mt-0 mb-3 text-pearl">Tu bolso, tu mood.</p>
            <p className="text-lg line-height-3 mt-0 mb-4 text-pearl-soft">
              Descubre bolsos hechos para destacar tu estilo con una estética femenina, contemporánea y auténtica.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button label="Ver catálogo" icon="pi pi-shopping-bag" onClick={() => navigate("/catalogo")} />
              <Button label="Conoce nuestra historia" icon="pi pi-info-circle" outlined onClick={() => navigate("/sobre-nosotros")} />
            </div>
          </div>
          <div className="col-12 lg:col-5">
            <ProductCard product={featuredProduct} />
          </div>
        </div>
      </section>
    </div>
  );
}
