import React, { useEffect, useState, useRef, useCallback } from "react";
import { Toast } from "primereact/toast";
import ProductCarousel from "../components/ProductCarousel";
import { Skeleton } from "primereact/skeleton";
import { Card } from "primereact/card";
import apiClient from "../utils/axios";

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/productos");
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los productos.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const productSkeleton = () => (
    <div className="p-2">
      <Card className="soft-card h-full flex flex-column">
        <Skeleton height="15rem" className="mb-2" />
        <div className="p-2 text-center">
          <Skeleton width="10rem" height="1.5rem" className="mb-2" />
          <Skeleton width="5rem" height="1rem" />
          <Skeleton height="3rem" className="mt-2" />
        </div>
      </Card>
    </div>
  );

  return (
    <div className="page-shell">
      <Toast ref={toast} />
      <section className="text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 mt-0 brand-gradient-text">Nuestros Bolsos</h1>
        <p className="text-pearl-soft text-lg mt-0">Diseños únicos con carácter artesanal y esencia moderna.</p>
      </section>
      <section className="soft-card p-3 md:p-4">
        {loading ? <ProductCarousel products={Array(3).fill({})} itemTemplate={productSkeleton} /> : <ProductCarousel products={products} />}
      </section>
    </div>
  );
}
