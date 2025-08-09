import React from "react";
import { Carousel } from "primereact/carousel";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, itemTemplate }) {
  const responsiveOptions = [
    { breakpoint: "1024px", numVisible: 3, numScroll: 1 }, // Solo 3 visible en PC
    { breakpoint: "768px", numVisible: 2, numScroll: 1 }, // Solo 2 visible en tablet
    { breakpoint: "560px", numVisible: 1, numScroll: 1 }, // Solo 1 visible en móvil
  ];

  const defaultProductTemplate = (product) => {
    return <ProductCard product={product} />;
  };

  return (
    <div className="card">
      <Carousel
        value={products}
        numScroll={1}
        numVisible={3} // Siempre 1 por defecto
        responsiveOptions={responsiveOptions}
        itemTemplate={itemTemplate || defaultProductTemplate}
        circular
        autoplayInterval={10000}
      />
    </div>
  );
}
