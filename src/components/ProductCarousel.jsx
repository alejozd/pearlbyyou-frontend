import React from "react";
import { Carousel } from "primereact/carousel";
import { Card } from "primereact/card";
import WhatsAppButton from "./WhatsAppButton";

export default function ProductCarousel({ products, itemTemplate }) {
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 },
    { breakpoint: "768px", numVisible: 2, numScroll: 1 },
    { breakpoint: "560px", numVisible: 1, numScroll: 1 },
  ];

  // Plantilla por defecto para cuando no se pase una plantilla
  const defaultProductTemplate = (product) => {
    // Definimos el "header" de la tarjeta con la imagen
    const header = (
      <div className="overflow-hidden border-round-top p-1">
        <img
          src={product.imagen_url}
          alt={product.nombre}
          className="w-full h-auto object-cover transition-all duration-300 hover:scale-105"
        />
      </div>
    );

    return (
      <div className="p-2 flex flex-column">
        <Card
          header={header}
          className="shadow-2 hover:shadow-4 transition-all duration-300 h-full flex flex-column surface-card cursor-pointer"
        >
          <div className="p-card-body p-0">
            <div className="p-2 text-center">
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
            <div className="flex justify-content-center mt-0">
              <WhatsAppButton productName={product.nombre} />
            </div>
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
        // Usar la plantilla pasada o la plantilla por defecto
        itemTemplate={itemTemplate || defaultProductTemplate}
        circular
        autoplayInterval={5000}
      />
    </div>
  );
}
