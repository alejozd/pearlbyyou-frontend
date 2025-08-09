import React, { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import { ProgressSpinner } from "primereact/progressspinner"; // Importar el componente

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL =
      import.meta.env.VITE_API_URL || "http://localhost:3003/api/v1";
    console.log("API_URL:", API_URL);
    fetch(`${API_URL}/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className="flex flex-column justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="8"
          fill="var(--surface-ground)"
          animationDuration=".5s"
        />
        <p className="mt-3">Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="py-0 ">
      <div className="text-center mb-4">
        <h2 className="text-900 text-4xl font-bold mb-2">Nuestros Bolsos</h2>
        <p className="text-600 text-lg mt-0">
          Diseños únicos, hechos a mano con amor y estilo.
        </p>
      </div>
      <ProductCarousel products={products} />
    </div>
  );
}
