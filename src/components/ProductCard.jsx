import React from "react";
import { Card } from "primereact/card";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCard({ product }) {
  const header = (
    // Eliminar el padding aquí
    <div className="overflow-hidden border-round-top p-1">
      <img
        src={product.imagen_url}
        alt={product.nombre}
        className="w-full object-cover transition-all duration-300 hover:scale-105"
      />
    </div>
  );

  return (
    <Card
      header={header}
      className="shadow-2 hover:shadow-4 transition-all duration-300 h-full flex flex-column surface-card cursor-pointer"
    >
      <div className="p-card-body p-0">
        <div className="p-1 -m-1 text-center">
          <h4 className="mt-0 mb-1 text-900 font-bold">{product.nombre}</h4>
          <p className="mt-0 mb-2 text-xl text-900">
            ${Number(product.precio).toLocaleString("es-CO")}
          </p>
          <p
            className="text-600 line-height-3 text-sm overflow-hidden"
            style={{ maxHeight: "60px" }}
          >
            {product.descripcion}
          </p>
        </div>
        <div className="flex justify-content-center mt-3">
          <WhatsAppButton productName={product.nombre} />
        </div>
      </div>
    </Card>
  );
}
