import React, { useEffect, useState } from "react";
import ProductCarousel from "../components/ProductCarousel";
import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";

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

  // Creación de un array para los esqueletos
  const skeletonProducts = Array(3).fill({});

  // Plantilla para los esqueletos
  const productSkeleton = () => {
    return (
      <div className="p-2">
        <Card className="shadow-2 h-full flex flex-column surface-card">
          <Skeleton height="15rem" className="mb-2"></Skeleton>
          <div className="p-2 text-center">
            <Skeleton width="10rem" height="1.5rem" className="mb-2"></Skeleton>
            <Skeleton width="5rem" height="1rem"></Skeleton>
            <Skeleton height="3rem" className="mt-2"></Skeleton>
            <div className="flex justify-content-center mt-3">
              <Skeleton width="10rem" height="2.5rem"></Skeleton>
            </div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="py-0">
      <div className="text-center mb-4">
        <h2 className="text-900 text-4xl font-bold mb-2">Nuestros Bolsos</h2>
        <p className="text-600 text-lg mt-0">
          Diseños únicos, hechos a mano con amor y estilo.
        </p>
      </div>
      {loading ? (
        <ProductCarousel
          products={skeletonProducts}
          itemTemplate={productSkeleton}
        />
      ) : (
        <ProductCarousel products={products} />
      )}
    </div>
  );
}
