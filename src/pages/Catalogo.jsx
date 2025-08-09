import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Catalogo() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/productos")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando...</div>;
  }

  return (
    <div className="py-6 px-4 md:px-6 lg:px-8">
      <div className="text-center mb-6">
        <h2 className="text-900 text-4xl font-bold">Nuestros Bolsos</h2>
      </div>

      <div className="grid justify-content-center gap-4 md:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-12 sm:col-6 md:col-4 lg:col-3 p-2"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
