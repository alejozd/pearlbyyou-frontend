import React from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCarousel({ products }) {
  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  const productTemplate = (product) => {
    return (
      <div
        className="border-1 surface-border border-round m-2 text-center p-3"
        style={{
          height: "420px", // Altura fija para todas las tarjetas
          display: "flex",
          flexDirection: "column",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "scale(1.02)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
        }}
      >
        {/* Imagen con efecto zoom al pasar el mouse */}
        <div
          className="mb-3 overflow-hidden"
          style={{
            height: "200px",
            borderRadius: "8px",
            transition: "transform 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          <img
            src={product.imagen_url}
            alt={product.nombre}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ajusta la imagen sin distorsión
              display: "block",
            }}
          />
        </div>

        {/* Contenido */}
        <div className="flex-grow-1 flex flex-column">
          <h4 className="mb-1 text-900 font-bold">{product.nombre}</h4>
          <p className="mt-0 mb-3 text-xl text-900">
            ${Number(product.precio).toLocaleString("es-CO")}
          </p>
          <p
            className="text-600 line-height-3 mt-0 mb-3"
            style={{ flexGrow: 1 }}
          >
            {product.descripcion}
          </p>
        </div>

        {/* Botón */}
        <div className="mt-3">
          <WhatsAppButton productName={product.nombre} />
        </div>
      </div>
    );
  };

  return (
    <div className="card p-2">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={2}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        circular
        autoplayInterval={5000}
      />
    </div>
  );
}
