import React, { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { FloatLabel } from "primereact/floatlabel";
import apiClient from "../utils/axios";

export default function AdminSettings() {
  const [settings, setSettings] = useState({ about_us_title: "", about_us_body: "", footer_text: "" });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const toast = useRef(null);

  const authConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setInitialLoading(true);
      try {
        const response = await apiClient.get("/settings", authConfig());
        setSettings({
          about_us_title: response.data?.about_us_title || "",
          about_us_body: response.data?.about_us_body || "",
          footer_text: response.data?.footer_text || "",
        });
      } catch {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se pudieron cargar las configuraciones.",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      const entries = Object.entries(settings);
      for (const [key, value] of entries) {
        await apiClient.put(`/settings/${key}`, { value }, authConfig());
      }

      toast.current.show({ severity: "success", summary: "Guardado", detail: "Contenido actualizado correctamente." });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "No se pudieron guardar los cambios.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-page">
      <Toast ref={toast} />

      <div className="admin-page-header">
        <div>
          <p className="m-0 text-sm text-pearl-soft">CMS</p>
          <h2 className="m-0 text-3xl">Contenido dinámico</h2>
        </div>
        <Button label="Guardar cambios" icon="pi pi-save" loading={loading} onClick={handleSave} />
      </div>

      <Card className="soft-card admin-form-card relative">
        {initialLoading ? (
          <div className="flex justify-content-center py-8">
            <ProgressSpinner />
          </div>
        ) : (
          <div className="p-fluid flex flex-column gap-4">
            <FloatLabel>
              <InputText id="about_us_title" value={settings.about_us_title} onChange={(e) => setSettings((prev) => ({ ...prev, about_us_title: e.target.value }))} disabled={loading} />
              <label htmlFor="about_us_title">Título de “Sobre Nosotros”</label>
            </FloatLabel>

            <FloatLabel>
              <InputTextarea id="about_us_body" rows={6} value={settings.about_us_body} onChange={(e) => setSettings((prev) => ({ ...prev, about_us_body: e.target.value }))} disabled={loading} />
              <label htmlFor="about_us_body">Contenido de “Sobre Nosotros”</label>
            </FloatLabel>

            <FloatLabel>
              <InputTextarea id="footer_text" rows={4} value={settings.footer_text} onChange={(e) => setSettings((prev) => ({ ...prev, footer_text: e.target.value }))} disabled={loading} />
              <label htmlFor="footer_text">Texto de footer</label>
            </FloatLabel>
          </div>
        )}
      </Card>
    </section>
  );
}
