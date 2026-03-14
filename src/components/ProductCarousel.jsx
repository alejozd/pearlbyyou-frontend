import React from "react";
import { Carousel } from "primereact/carousel";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products, itemTemplate }) {
  const responsiveOptions = [
    { breakpoint: "1200px", numVisible: 3, numScroll: 1 },
    { breakpoint: "992px", numVisible: 2, numScroll: 1 },
    { breakpoint: "576px", numVisible: 1, numScroll: 1 },
  ];

  return (
    <Carousel
      value={products}
      numScroll={1}
      numVisible={3}
      responsiveOptions={responsiveOptions}
      itemTemplate={itemTemplate || ((product) => <ProductCard product={product} />)}
      circular
      autoplayInterval={9000}
    />
  );
}
