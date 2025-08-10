import React, { useState } from "react";
import { Card } from "primereact/card";
import { Galleria } from "primereact/galleria";
import { Dialog } from "primereact/dialog"; // Importamos el componente Dialog
import WhatsAppButton from "./WhatsAppButton";

const BASE_URL = import.meta.env.VITE_BASE_URL || "https://pearlbyou.sytes.net";

export default function ProductCard({ product }) {
  // 1. Estado para controlar el modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  if (!product || !product.imagenes || product.imagenes.length === 0) {
    return null;
  }

  // 2. Función para abrir el modal al hacer clic en una imagen
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalVisible(true);
  };

  const itemTemplate = (item) => {
    const fullImageUrl = `${BASE_URL}${item.url}`;
    return (
      <img
        src={fullImageUrl}
        alt={product.nombre}
        style={{ width: "100%", display: "block", cursor: "pointer" }}
        // Agregamos el evento onClick aquí
        onClick={() => handleImageClick(fullImageUrl)}
      />
    );
  };

  const thumbnailTemplate = (item) => {
    const fullImageUrl = `${BASE_URL}${item.url}`;
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
      >
        <div className="p-card-body p-0 -m-1">
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
          <div className="flex justify-content-center mt-3">
            <WhatsAppButton productName={product.nombre} />
          </div>
        </div>
      </Card>

      {/* 3. Componente Dialog para mostrar el modal */}
      <Dialog
        header={product.nombre}
        visible={isModalVisible}
        style={{ width: "50vw" }}
        onHide={() => setIsModalVisible(false)}
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
