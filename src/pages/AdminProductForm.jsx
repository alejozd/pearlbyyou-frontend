import React, { useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../utils/axios";
import { Toast } from "primereact/toast";
import { Image } from "primereact/image";
import { ProgressSpinner } from "primereact/progressspinner";

const BASE_IMG_URL = import.meta.env.VITE_BASE_IMG_URL;

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);
  const fileUploadRef = useRef(null);

  const [product, setProduct] = useState({ nombre: "", descripcion: "", precio: 0 });
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

  const authConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  };

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setInitialLoading(true);
      try {
        const response = await apiClient.get(`/productos/${id}`);
        setProduct({
          nombre: response.data?.nombre || "",
          descripcion: response.data?.descripcion || "",
          precio: response.data?.precio || 0,
        });
        setExistingImages(response.data?.imagenes || []);
      } catch {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No fue posible cargar el producto.",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      for (const imageId of imagesToDelete) {
        await apiClient.delete(`/productos/imagenes/${imageId}`, authConfig);
      }

      const productData = new FormData();
      productData.append("nombre", product.nombre);
      productData.append("descripcion", product.descripcion);
      productData.append("precio", product.precio);

      if (id) {
        await apiClient.put(`/productos/${id}`, productData, {
          headers: { ...authConfig.headers, "Content-Type": "multipart/form-data" },
        });
      } else {
        const selectedImages = fileUploadRef.current ? fileUploadRef.current.getFiles() : [];
        selectedImages.forEach((file) => productData.append("imagenes", file));

        await apiClient.post("/productos", productData, {
          headers: { ...authConfig.headers, "Content-Type": "multipart/form-data" },
        });
      }

      if (id) {
        const selectedImages = fileUploadRef.current ? fileUploadRef.current.getFiles() : [];
        if (selectedImages.length > 0) {
          const imageData = new FormData();
          selectedImages.forEach((file) => imageData.append("imagenes", file));

          await apiClient.post(`/productos/imagenes/${id}`, imageData, {
            headers: { ...authConfig.headers, "Content-Type": "multipart/form-data" },
          });
        }
      }

      toast.current.show({
        severity: "success",
        summary: "Guardado",
        detail: id ? "Producto actualizado correctamente." : "Producto creado correctamente.",
      });

      setTimeout(() => navigate("/admin/productos"), 900);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "No se pudo guardar el producto.",
      });
    } finally {
      setLoading(false);
    }
  };

  const markImageToDelete = (imageId) => {
    setImagesToDelete((prev) => [...prev, imageId]);
    setExistingImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  return (
    <section className="admin-page">
      <Toast ref={toast} />
      <Card className="soft-card admin-form-card relative" title={id ? "Editar producto" : "Crear producto"}>
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field mb-4">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              value={product.nombre}
              onChange={(e) => setProduct((prev) => ({ ...prev, nombre: e.target.value }))}
              disabled={loading || initialLoading}
              required
            />
          </div>

          <div className="field mb-4">
            <label htmlFor="descripcion">Descripción</label>
            <InputTextarea
              id="descripcion"
              rows={5}
              value={product.descripcion}
              onChange={(e) => setProduct((prev) => ({ ...prev, descripcion: e.target.value }))}
              disabled={loading || initialLoading}
              required
            />
          </div>

          <div className="field mb-4">
            <label htmlFor="precio">Precio</label>
            <InputNumber
              id="precio"
              value={product.precio}
              onValueChange={(e) => setProduct((prev) => ({ ...prev, precio: e.value || 0 }))}
              mode="currency"
              currency="COP"
              locale="es-CO"
              disabled={loading || initialLoading}
              required
            />
          </div>

          {id && existingImages.length > 0 && (
            <div className="field mb-4">
              <label className="block mb-2">Imágenes actuales</label>
              <div className="flex flex-wrap gap-2">
                {existingImages.map((image) => (
                  <div key={image.id} className="relative border-round overflow-hidden">
                    <Image src={`${BASE_IMG_URL}${image.url}`} alt={`Imagen ${image.id}`} width="120" preview />
                    <Button
                      icon="pi pi-times"
                      rounded
                      severity="danger"
                      className="absolute"
                      style={{ top: 6, right: 6 }}
                      onClick={() => markImageToDelete(image.id)}
                      type="button"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="field mb-4">
            <FileUpload
              ref={fileUploadRef}
              name="imagenes"
              multiple
              accept="image/*"
              maxFileSize={2000000}
              auto={false}
              customUpload
              uploadHandler={() => {}}
              chooseLabel="Seleccionar imágenes"
              disabled={loading || initialLoading}
              emptyTemplate={<p className="m-0 text-pearl-soft">Arrastra imágenes aquí o selecciónalas desde tu equipo.</p>}
            />
          </div>

          <div className="flex flex-column sm:flex-row justify-content-end gap-2 mt-4">
            <Button type="button" label="Cancelar" severity="secondary" outlined onClick={() => navigate("/admin/productos")} className="p-button-lg sm:p-button-normal" />
            <Button type="submit" label="Guardar" icon="pi pi-save" loading={loading} className="p-button-lg sm:p-button-normal" />
          </div>
        </form>

        {initialLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center bg-white-alpha-70 border-round-xl">
            <ProgressSpinner />
          </div>
        )}
      </Card>
    </section>
  );
}
