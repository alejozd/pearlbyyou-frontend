import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button"; // Añadido: para el botón
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  return (
    <div className="py-8">
      <div className="px-4 md:px-6 lg:px-8">
        {/* Banner principal */}
        <div className="text-center mb-8">
          <h1 className="text-900 text-5xl font-bold">PEARL</h1>
          <p className="text-600 text-3xl mt-2">TU BOLSO, TU MOOD</p>
        </div>

        {/* Producto destacado */}
        <div className="grid justify-content-center gap-4 md:gap-6">
          {/* Usa 'col' con clases responsive */}
          <div className="col-12 sm:col-6 md:col-4 lg:col-3 p-2">
            <Card
              className="shadow-2 hover:shadow-4 transition-shadow border-round"
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Imagen */}
              <div
                style={{
                  height: "auto",
                  overflow: "hidden",
                  borderRadius: "8px",
                }}
              >
                <img
                  src="/images/bolsos/ISA1.jpg"
                  alt="Bolso Elegance Mini"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>

              {/* Contenido */}
              <div className="pt-3 flex-grow-1 flex flex-column">
                <h4 className="m-0 text-900 font-bold">Bolso Elegance Mini</h4>
                <p
                  className="mt-2 text-600 line-height-3"
                  style={{ flexGrow: 1 }}
                >
                  Diseño minimalista y elegante, ideal para eventos..
                </p>
                <p className="mt-2 text-xl font-semibold text-900">$85,000</p>
              </div>

              {/* Botón */}
              <div className="pt-2">
                <WhatsAppButton productName="Bolso Elegance Mini" />
              </div>
            </Card>
          </div>
        </div>

        {/* Llamado a acción */}
        <div className="text-center mt-8">
          <Button
            label="Ver Catálogo Completo"
            icon="pi pi-shopping-bag"
            severity="success"
            className="p-button-lg"
            onClick={() => (window.location.href = "/catalogo")}
          />
        </div>
      </div>
    </div>
  );
}
