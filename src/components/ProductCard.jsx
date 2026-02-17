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
    return (
      <img
        src={fullImageUrl}
        alt={product.nombre}
        style={{ width: "100%", display: "block", cursor: "zoom-in", aspectRatio: "4 / 5", objectFit: "cover" }}
        onClick={() => handleImageClick(fullImageUrl)}
      />
    );
  };

  const header = (
    <div className="overflow-hidden border-round-top">
      <Galleria
        value={product.imagenes}
        numVisible={4}
        item={itemTemplate}
        showItemNavigators
        showThumbnails={false}
      />
    </div>
  );

  return (
    <div className="p-2 h-full">
      <Card header={header} className="transform-hover h-full flex flex-column soft-card">
        <div className="text-center px-2 pb-2">
          <h3 className="mt-2 mb-1 font-semibold text-xl text-900">{product.nombre}</h3>
          <p className="mt-0 mb-2 text-2xl font-medium" style={{ color: "#8b5e3c" }}>
            ${Number(product.precio).toLocaleString("es-CO")}
          </p>
          <p className="text-600 line-height-3 text-sm mb-3" style={{ minHeight: "64px" }}>
            {product.descripcion}
          </p>
          <WhatsAppButton productName={product.nombre} />
        </div>
      </Card>

      <Dialog header={product.nombre} visible={isModalVisible} style={{ width: "90vw", maxWidth: "720px" }} onHide={() => setIsModalVisible(false)} modal>
        {selectedImage && <img src={selectedImage} alt={product.nombre} style={{ width: "100%", display: "block" }} />}
      </Dialog>
    </div>
  );
}
