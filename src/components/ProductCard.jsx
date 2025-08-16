import React, { useState } from "react";
import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { Dialog } from "primereact/dialog";
import WhatsAppButton from "./WhatsAppButton";

const BASE_IMG_URL = import.meta.env.VITE_BASE_IMG_URL;

export default function ProductCard({ product }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product || !product.imagenes || product.imagenes.length === 0) {
    return null;
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const onHideModal = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };

  const itemTemplate = (item) => {
    const fullImageUrl = `${BASE_IMG_URL}${item.url}`;
    return (
      <img
        src={fullImageUrl}
        alt={product.nombre}
        style={{ width: "100%", display: "block", cursor: "pointer" }}
        onClick={() => handleImageClick(fullImageUrl)}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    const fullImageUrl = `${BASE_IMG_URL}${item.url}`;
    return (
      <img
        src={fullImageUrl}
        alt={product.nombre}
        style={{ width: "100%", display: "block" }}
      />
    );
  };

  const header = (
    <div className="overflow-hidden border-round-top p-1">
      <Galleria
        value={product.imagenes}
        numVisible={4}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        showItemNavigators
        showThumbnails={false}
      />
    </div>
  );

  return (
    <div className="p-2 flex flex-column">
      <Card
        header={header}
        className="shadow-2 hover:shadow-4 transition-all duration-300 h-full flex flex-column surface-card"
        style={{ height: "100%" }}
      >
        <div
          className="p-card-body p-0 -m-3"
          style={{ paddingTop: "0.25rem 0.5rem" }}
        >
          <div className="p-2 text-center ">
            <h4
              className="mt-0 mb-1 text-900 font-bold"
              style={{ marginTop: "-0.5rem" }}
            >
              {product.nombre}
            </h4>
            <p className="mt-0 mb-2 text-xl text-900">
              ${Number(product.precio).toLocaleString("es-CO")}
            </p>
            <p
              className="text-600 line-height-3 text-sm overflow-hidden"
              style={{
                height: "60px",
                // maxHeight: "60px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.descripcion}
            </p>
          </div>
          <div className="flex justify-content-center mt-3">
            <WhatsAppButton productName={product.nombre} />
          </div>
        </div>
      </Card>

      {/* Componente Dialog con estilo responsive */}
      <Dialog
        header={product.nombre}
        visible={isModalVisible}
        // Usamos un ancho del 90% de la pantalla y un ancho máximo de 800px
        style={{ width: "90vw", maxWidth: "800px" }}
        onHide={onHideModal}
        modal
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt={product.nombre}
            style={{ width: "100%", display: "block" }}
          />
        )}
      </Dialog>
    </div>
  );
}
