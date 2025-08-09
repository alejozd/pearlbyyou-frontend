import React from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card"; // Añadimos la tarjeta para usarla directamente
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCarousel({ products }) {
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  const productTemplate = (product) => {
    // Definimos el "header" de la tarjeta con la imagen
    const header = (
      <div className="overflow-hidden border-round-top">
        <img
          src={product.imagen_url}
          alt={product.nombre}
          // Usamos clases de PrimeFlex para los efectos
          className="w-full h-auto object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
    );

    return (
      <div className="p-2">
        <Card
          header={header}
          // Unificamos las clases para el estilo de la tarjeta
          className="shadow-2 hover:shadow-4 transition-all duration-300 h-full flex flex-column surface-card cursor-pointer"
        >
          {/* Contenido de la tarjeta */}
          <div className="pt-3 flex-grow-1 flex flex-column">
            <h4 className="mb-1 text-900 font-bold">{product.nombre}</h4>
            <p className="mt-0 mb-3 text-xl text-900">
              ${Number(product.precio).toLocaleString("es-CO")}
            </p>
            <p className="text-600 line-height-3 mt-0 mb-3 flex-grow-1">
              {product.descripcion}
            </p>
          </div>
          {/* Botón */}
          <div className="pt-2">
            <WhatsAppButton productName={product.nombre} />
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={3}
        responsiveOptions={responsiveOptions}
        itemTemplate={productTemplate}
        circular
        autoplayInterval={5000}
      />
    </div>
  );
}
