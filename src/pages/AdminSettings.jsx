import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import apiClient from "../utils/axios";
import { ProgressSpinner } from "primereact/progressspinner";
import { FloatLabel } from "primereact/floatlabel"; // Asegúrate de importar FloatLabel

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    about_us_title: "",
    about_us_body: "",
    footer_text: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const toast = useRef(null);

  // Función para cargar las configuraciones desde el backend
  const fetchSettings = async () => {
    setInitialLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await apiClient.get("/settings", config);
      // El backend devuelve un objeto { key: value, ... }
      setSettings(response.data);
    } catch (error) {
      console.error("Error al obtener configuraciones:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar las configuraciones.",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Manejador de cambios para los campos del formulario
  const handleChange = (e, key) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [key]: e.target.value,
    }));
  };

  // Función para guardar las configuraciones actualizadas
  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      // Recorrer cada configuración y enviar una solicitud PUT
      for (const key in settings) {
        if (Object.hasOwnProperty.call(settings, key)) {
          await apiClient.put(
            `/settings/${key}`,
            { value: settings[key] },
            config
          );
        }
      }

      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Configuraciones guardadas con éxito.",
      });
    } catch (error) {
      console.error("Error al guardar configuraciones:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error.response?.data?.message ||
          "Error al guardar las configuraciones.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-content-center m-5">
      <Toast ref={toast} />
      <Card
        title="Gestión de Contenido Dinámico"
        className="w-full md:w-40rem relative"
      >
        <div className="p-fluid">
          {initialLoading ? (
            <div className="flex justify-content-center">
              <ProgressSpinner />
            </div>
          ) : (
            <>
              <div className="p-field mb-4">
                <FloatLabel>
                  <InputText
                    id="about_us_title"
                    value={settings.about_us_title}
                    onChange={(e) => handleChange(e, "about_us_title")}
                    disabled={loading}
                  />
                  <label htmlFor="about_us_title">
                    Título "Sobre Nosotros"
                  </label>
                </FloatLabel>
              </div>
              <div className="p-field mb-4">
                <FloatLabel>
                  <InputTextarea
                    id="about_us_body"
                    value={settings.about_us_body}
                    onChange={(e) => handleChange(e, "about_us_body")}
                    rows={5}
                    disabled={loading}
                  />
                  <label htmlFor="about_us_body">Cuerpo "Sobre Nosotros"</label>
                </FloatLabel>
              </div>

              {/* Sección del Footer */}
              <div className="p-field mb-3">
                <FloatLabel>
                  <InputTextarea
                    id="footer_text"
                    value={settings.footer_text}
                    onChange={(e) => handleChange(e, "footer_text")}
                    rows={3}
                    disabled={loading}
                  />
                  <label htmlFor="footer_text">Texto del Footer</label>
                </FloatLabel>
              </div>

              <div className="flex justify-content-end mt-4">
                <Button
                  label="Guardar Cambios"
                  icon="pi pi-save"
                  onClick={handleSave}
                  loading={loading}
                  severity="success"
                />
              </div>
            </>
          )}
        </div>
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center bg-white-alpha-50">
            <ProgressSpinner />
          </div>
        )}
      </Card>
    </div>
  );
}
