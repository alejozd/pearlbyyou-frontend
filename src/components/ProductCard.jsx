import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }) {
  return (
    <Card
      title={product.nombre}
      className="shadow-1 hover:shadow-3 transition-shadow"
      style={{ height: "100%" }}
    >
      <img
        src={product.imagen_url}
        alt={product.nombre}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
        onError={(e) => {
          console.error("❌ Imagen no encontrada:", product.imagen_url);
          e.target.src =
            "https://via.placeholder.com/300x300.png?text=Sin+Imagen";
        }}
      />
      <p className="text-900 mt-3 text-xl font-semibold">${product.precio}</p>
      <p className="text-600 mt-1">{product.descripcion}</p>
      <div className="flex justify-content-center mt-3">
        <WhatsAppButton productName={product.nombre} />
      </div>
    </Card>
  );
}
