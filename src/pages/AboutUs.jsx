import React, { useState, useEffect, useRef } from "react";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import apiClient from "../utils/axios";
import { ProgressSpinner } from "primereact/progressspinner";

export default function AboutUs() {
  const [settings, setSettings] = useState({
    about_us_title: "Cargando...",
    about_us_body: "Cargando el contenido de 'Sobre Nosotros'...",
  });
  const [loading, setLoading] = useState(true);
  const toast = useRef(null);

  useEffect(() => {
    const fetchAboutUsContent = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get("/settings");
        setSettings({
          about_us_title: response.data.about_us_title || "Nuestra Historia",
          about_us_body:
            response.data.about_us_body ||
            "El contenido de 'Sobre Nosotros' no ha sido configurado.",
        });
      } catch (error) {
        console.error("Error al cargar contenido de Sobre Nosotros:", error);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: 'No se pudo cargar el contenido de "Sobre Nosotros".',
        });
        setSettings({
          about_us_title: "Error al Cargar",
          about_us_body:
            "Lo sentimos, no pudimos cargar el contenido de esta sección en este momento.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsContent();
  }, []);

  return (
    // ✅ Contenedor principal para centrar la Card y darle un ancho máximo
    <div
      className="flex justify-content-center align-items-start p-4 mx-auto" // mx-auto para centrar horizontalmente
      style={{ minHeight: "calc(100vh - 56px)" }} // Ajusta la altura mínima
    >
      <Toast ref={toast} />
      {/* ✅ La Card ahora tiene un ancho máximo para mejor lectura */}
      <Card className="w-full lg:w-9 md:w-10 xl:w-8 shadow-2">
        {" "}
        {/* Más responsivo */}
        {loading ? (
          <div className="flex justify-content-center py-5">
            <ProgressSpinner />
          </div>
        ) : (
          <>
            {/* ✅ Usa un h1 para el título principal de la página */}
            <h1 className="text-pearl text-5xl md:text-6xl font-bold mb-3 text-center">
              {settings.about_us_title}
            </h1>
            <p className="text-pearl text-xl md:text-2xl mt-0 mb-5 text-center">
              Descubre la historia detrás de Pearl by You.
            </p>
            <div className="grid justify-content-center">
              <div className="col-12 md:col-10 lg:col-8">
                {/* ✅ El párrafo del cuerpo principal */}
                <p className="text-pearl line-height-3 text-lg text-justify">
                  {settings.about_us_body}
                </p>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
