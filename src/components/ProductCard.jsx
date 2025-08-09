import React from "react";
import { Card } from "primereact/card";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }) {
  return (
    <Card>
      <div className="overflow-hidden border-round-top">
        <img
          src={product.imagen_url}
          alt={product.nombre}
          className="w-full h-auto object-cover transition-all duration-300 hover:scale-105"
        />
      </div>

      <div className="p-2 text-center">
        <h4 className="mt-2 mb-1 text-900 font-bold">{product.nombre}</h4>
        <p className="mt-0 mb-2 text-xl text-900">
          ${Number(product.precio).toLocaleString("es-CO")}
        </p>
        <p
          className="text-600 line-height-3 text-sm overflow-hidden"
          style={{ maxHeight: "60px" }}
        >
          {product.descripcion}
        </p>
        <div className="flex justify-content-center mt-3">
          <WhatsAppButton productName={product.nombre} />
        </div>
      </div>
    </Card>
  );
}
