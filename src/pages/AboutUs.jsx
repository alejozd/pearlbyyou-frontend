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
      } finally {
        setLoading(false);
      }
    };

    fetchAboutUsContent();
  }, []);

  return (
    <div className="page-shell">
      <Toast ref={toast} />
      <Card className="soft-card p-2 md:p-4">
        {loading ? (
          <div className="flex justify-content-center py-7">
            <ProgressSpinner />
          </div>
        ) : (
          <div className="px-2 md:px-5 py-3 md:py-5">
            <h1 className="text-4xl md:text-5xl font-bold mt-0 mb-3 text-center brand-gradient-text">{settings.about_us_title}</h1>
            <p className="text-pearl-soft text-lg md:text-xl text-center mt-0 mb-5">Diseñamos accesorios que cuentan historias.</p>
            <p className="text-pearl line-height-4 text-lg text-justify m-0">{settings.about_us_body}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
