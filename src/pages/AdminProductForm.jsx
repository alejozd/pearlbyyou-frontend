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
import { ProgressSpinner } from "primereact/progressspinner";
import { Image } from "primereact/image";

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: 0, // ✅ Inicializamos el precio a 0
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
    try {
      // ✅ Ruta corregida: removemos el /api/v1/
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
    }
  };

  const handleImageDelete = async (imageId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // ✅ Ruta corregida
      await apiClient.delete(`/imagenes/${imageId}`, config);

      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Imagen eliminada.",
      });
      setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (error) {
      console.error("Error al eliminar la imagen:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar la imagen.",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    setProduct((prev) => ({ ...prev, precio: e.value }));
  };

  const onImageSelect = (e) => {
    setSelectedImages(e.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nombre", product.nombre);
    formData.append("descripcion", product.descripcion);
    formData.append("precio", product.precio);

    selectedImages.forEach((file) => {
      formData.append("imagenes", file);
    });

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (id) {
        // ✅ Ruta corregida
        await apiClient.put(`/productos/${id}`, formData, config);
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto actualizado.",
        });
      } else {
        // ✅ Ruta corregida
        await apiClient.post("/productos", formData, config);
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

  return (
    <div className="flex justify-content-center m-5">
      <Toast ref={toast} />
      <Card
        title={id ? "Editar Producto" : "Crear Producto"}
        className="w-full md:w-35rem"
      >
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="field">
            <label htmlFor="nombre">Nombre</label>
            <InputText
              id="nombre"
              name="nombre"
              value={product.nombre}
              onChange={handleChange}
              required
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
              currency="COP" // ✅ Cambiamos a COP para pesos colombianos
              locale="es-CO" // ✅ Cambiamos el locale para un formato correcto
              required
            />
          </div>

          {id && existingImages.length > 0 && (
            <div className="field mt-4">
              <label className="block mb-2">Imágenes Existentes</label>
              <div className="flex flex-wrap gap-2">
                {existingImages.map((imagen) => (
                  <div key={imagen.id} className="relative">
                    <Image
                      src={`http://localhost:3003/${imagen.url}`}
                      alt={`Imagen ${imagen.id}`}
                      width="100"
                      preview
                    />
                    <Button
                      icon="pi pi-times"
                      className="p-button-rounded p-button-danger p-button-text p-button-sm absolute"
                      style={{ top: 0, right: 0 }}
                      onClick={() => handleImageDelete(imagen.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="field mt-4">
            <label className="block mb-2">
              {id ? "Subir Nuevas Imágenes" : "Subir Imágenes"}
            </label>
            <FileUpload
              name="imagenes"
              multiple
              accept="image/*"
              maxFileSize={1000000}
              onSelect={onImageSelect}
              onClear={() => setSelectedImages([])}
              emptyTemplate={
                <p className="m-0">
                  Arrastra y suelta imágenes aquí para subirlas.
                </p>
              }
            />
          </div>

          <div className="flex justify-content-end mt-4 gap-2">
            <Button
              type="button"
              label="Cancelar"
              icon="pi pi-times"
              severity="secondary"
              onClick={() => navigate("/admin/productos")}
            />
            <Button
              type="submit"
              label="Guardar"
              icon="pi pi-save"
              loading={loading}
              severity="primary"
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
