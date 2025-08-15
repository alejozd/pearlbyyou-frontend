import React, { useState, useEffect, useRef } from "react";
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
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
  });
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    setInitialLoading(true);
    try {
      const response = await apiClient.get(`/productos/${productId}`);
      const fetchedProduct = response.data;
      setProduct(fetchedProduct);
      setExistingImages(fetchedProduct.imagenes || []);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo cargar el producto para editar.",
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const handleImageDelete = (imageId) => {
    // ✅ Agrega el ID de la imagen al estado de 'imagesToDelete'
    setImagesToDelete((prev) => [...prev, imageId]);
    // ✅ Elimina la imagen de la vista del usuario
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    toast.current.show({
      severity: "info",
      summary: "Listo",
      detail:
        "Imagen marcada para eliminar. Haz clic en 'Guardar' para confirmar.",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    setProduct((prev) => ({ ...prev, precio: e.value }));
  };

  // ❌ Se eliminó la función onImageSelect ya que no es necesaria para la lógica de handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // ✅ Paso 1: Eliminar las imágenes marcadas para borrar
      for (const imageId of imagesToDelete) {
        await apiClient.delete(`/productos/imagenes/${imageId}`, config);
      }

      if (id) {
        // ✅ En MODO EDICIÓN:
        // Paso 1: Actualiza solo los datos del producto (nombre, descripción, precio).
        const productData = new FormData();
        productData.append("nombre", product.nombre);
        productData.append("descripcion", product.descripcion);
        productData.append("precio", product.precio);

        // Aquí se hace la llamada PUT sin imágenes
        await apiClient.put(`/productos/${id}`, productData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // Paso 2: Si el usuario ha seleccionado nuevas imágenes, haz una segunda llamada POST.
        const selectedImages = fileUploadRef.current
          ? fileUploadRef.current.getFiles()
          : [];
        if (selectedImages.length > 0) {
          console.log(
            "Intentando subir nuevas imágenes a:",
            `/productos/imagenes/${id}`
          ); // ✅ Agrega este console.log
          const imagesFormData = new FormData();
          selectedImages.forEach((file) => {
            imagesFormData.append("imagenes", file);
          });

          await apiClient.post(`/productos/imagenes/${id}`, imagesFormData, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          });
        }

        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto actualizado.",
        });
      } else {
        // ✅ En MODO CREACIÓN: La lógica original era correcta.
        const formData = new FormData();
        formData.append("nombre", product.nombre);
        formData.append("descripcion", product.descripcion);
        formData.append("precio", product.precio);

        const selectedImages = fileUploadRef.current
          ? fileUploadRef.current.getFiles()
          : [];
        selectedImages.forEach((file) => {
          formData.append("imagenes", file);
        });

        await apiClient.post("/productos", formData, {
          headers: {
            ...config.headers,
            "Content-Type": "multipart/form-data",
          },
        });

        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto creado.",
        });
      }
      setTimeout(() => {
        setLoading(false);
        navigate("/admin/productos");
      }, 1500);
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error.response?.data?.message || "Error al guardar el producto.",
      });
    }
  };

  // ❌ Se eliminó la función myUploader ya que la subida es manual
  const myUploader = () => {};

  return (
    <div className="flex justify-content-center m-5">
      <Toast ref={toast} />
      <Card
        title={id ? "Editar Producto" : "Crear Producto"}
        className="w-full md:w-35rem relative"
      >
        <form onSubmit={handleSubmit}>
          <div className="p-fluid">
            <div className="field">
              <label htmlFor="nombre">Nombre</label>
              <InputText
                id="nombre"
                name="nombre"
                value={product.nombre}
                onChange={handleChange}
                required
                disabled={initialLoading || loading}
              />
            </div>
            <div className="field">
              <label htmlFor="descripcion">Descripción</label>
              <InputTextarea
                id="descripcion"
                name="descripcion"
                value={product.descripcion}
                onChange={handleChange}
                rows={5}
                required
                disabled={initialLoading || loading}
              />
            </div>
            <div className="field">
              <label htmlFor="precio">Precio</label>
              <InputNumber
                id="precio"
                name="precio"
                value={product.precio}
                onValueChange={handlePriceChange}
                mode="currency"
                currency="COP"
                locale="es-CO"
                required
                disabled={initialLoading || loading}
              />
            </div>
            {id && existingImages.length > 0 && (
              <div className="field mt-4">
                <label className="block mb-2">Imágenes Existentes</label>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((imagen) => (
                    <div key={imagen.id} className="relative">
                      <Image
                        src={`${BASE_IMG_URL}${imagen.url}`}
                        alt={`Imagen ${imagen.id}`}
                        width="100"
                        preview
                      />
                      <Button
                        icon="pi pi-times"
                        className="p-button-rounded p-button-danger p-button-outlined p-button-sm absolute"
                        style={{ top: 0, right: 0 }}
                        onClick={() => handleImageDelete(imagen.id)}
                        disabled={initialLoading || loading}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="field mt-4">
              <FileUpload
                ref={fileUploadRef}
                name="imagenes"
                multiple
                accept="image/*"
                maxFileSize={1000000}
                onClear={() => fileUploadRef.current.clear()}
                auto={false}
                customUpload={true}
                chooseLabel="Seleccionar Archivos"
                uploadHandler={myUploader}
                disabled={initialLoading || loading}
                emptyTemplate={
                  <p className="m-0">
                    Arrastra y suelta imágenes aquí para subirlas.
                  </p>
                }
                headerTemplate={(options) => {
                  const { chooseButton } = options;
                  return (
                    <div
                      className="flex align-items-center justify-content-between p-fileupload-header"
                      // style={{ backgroundColor: "transparent" }}
                    >
                      <span className="p-fileupload-label">
                        {id ? "Subir Nuevas Imágenes" : "Subir Imágenes"}
                      </span>
                      {chooseButton}
                    </div>
                  );
                }}
              />
            </div>
          </div>{" "}
          <div className="flex justify-content-end mt-4 gap-2">
            <Button
              type="button"
              label="Cancelar"
              icon="pi pi-times"
              severity="danger"
              onClick={() => navigate("/admin/productos")}
              disabled={initialLoading || loading}
            />
            <Button
              type="submit"
              label="Guardar"
              icon="pi pi-save"
              loading={loading}
              severity="success"
              disabled={initialLoading || loading}
            />
          </div>
        </form>
        {/* ✅ Overlay condicional para mostrar el spinner de carga inicial */}
        {initialLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center bg-white-alpha-50">
            <ProgressSpinner />
          </div>
        )}
      </Card>
    </div>
  );
}
