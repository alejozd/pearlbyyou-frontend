import React, { useState } from "react";
import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { Dialog } from "primereact/dialog";
import WhatsAppButton from "./WhatsAppButton";

const BASE_IMG_URL = import.meta.env.VITE_BASE_IMG_URL;

export default function ProductCard({ product }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product?.imagenes?.length) {
    return null;
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const itemTemplate = (item) => {
    const fullImageUrl = `${BASE_IMG_URL}${item.url}`;
    // La primera imagen es el LCP del catalogo: se carga con prioridad alta.
    // Las siguientes se difieren y se decodifican en segundo plano.
    const esPrincipal = product.imagenes[0]?.url === item.url;
    return (
      <img
        src={fullImageUrl}
        alt={product.nombre}
        loading={esPrincipal ? "eager" : "lazy"}
        fetchPriority={esPrincipal ? "high" : "auto"}
        decoding="async"
        width="800"
        height="1000"
        style={{ width: "100%", display: "block", cursor: "zoom-in", aspectRatio: "4 / 5", objectFit: "cover" }}
        onClick={() => handleImageClick(fullImageUrl)}
      />
    );
  };

  const header = (
    <div className="overflow-hidden border-round-xl product-media">
      <Galleria
        value={product.imagenes}
        numVisible={5}
        item={itemTemplate}
        showItemNavigators={false}
        showIndicators
        showThumbnails={false}
        circular
        autoPlay
        transitionInterval={4000}
        style={{ width: "100%" }}
      />
    </div>
  );

  return (
    <div className="p-2 h-full">
      <Card header={header} className="transform-hover h-full flex flex-column soft-card product-card">
        <div className="text-center px-2 pb-2">
          <h3 className="product-card-title mt-2 mb-1 font-semibold text-xl text-900">{product.nombre}</h3>
          <p className="product-card-price mt-0 mb-2 text-2xl font-medium" style={{ color: "#8b5e3c" }}>
            ${Number(product.precio).toLocaleString("es-CO")}
          </p>
          <p className="text-600 line-height-3 text-sm mb-3" style={{ minHeight: "64px" }}>
            {product.descripcion}
          </p>
          <WhatsAppButton productName={product.nombre} />
        </div>
      </Card>

      <Dialog header={product.nombre} visible={isModalVisible} style={{ width: "95vw", maxWidth: "720px" }} onHide={() => setIsModalVisible(false)} modal dismissableMask>
        {selectedImage && (
          <img
            src={selectedImage}
            alt={product.nombre}
            style={{ width: "100%", display: "block", borderRadius: "1rem" }}
          />
        )}
      </Dialog>
    </div>
  );
}
