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

export default function AdminProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);
  const fileUploadRef = useRef(null); // Ref para el componente FileUpload
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
  });
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (productId) => {
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
    }
  };

  const handleImageDelete = async (imageId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await apiClient.delete(`/productos/imagenes/${imageId}`, config);

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
    } finally {
      setLoading(false); // ✅ Desactivar el loading siempre, al final
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e) => {
    setProduct((prev) => ({ ...prev, precio: e.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("nombre", product.nombre);
    formData.append("descripcion", product.descripcion);
    formData.append("precio", product.precio);

    if (fileUploadRef.current) {
      const selectedImages = fileUploadRef.current.getFiles();
      selectedImages.forEach((file) => {
        formData.append("imagenes", file);
      });
    }

    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (id) {
        await apiClient.put(`/productos/${id}`, formData, config);
        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Producto actualizado.",
        });
      } else {
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

  // Plantilla para la barra de progreso (si la necesitas)
  const myUploader = () => {
    // Aquí puedes manejar la lógica de subida personalizada si la necesitaras
    // e.files son los archivos seleccionados
  };

  return (
    <div className="flex justify-content-center m-5">
      <Toast ref={toast} />
      <Card
        title={id ? "Editar Producto" : "Crear Producto"}
        className="w-full md:w-35rem"
      >
        {/* ❌ Elimina p-fluid de aquí */}
        <form onSubmit={handleSubmit}>
          {/* ✅ Envuelve los campos que quieres que se expandan con un div p-fluid */}
          <div className="p-fluid">
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
                currency="COP"
                locale="es-CO"
                required
              />
            </div>

            {/* ✅ Sección de imágenes existentes */}
            {id && existingImages.length > 0 && (
              <div className="field mt-4">
                <label className="block mb-2">Imágenes Existentes</label>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((imagen) => (
                    <div key={imagen.id} className="relative">
                      <Image
                        src={`${import.meta.env.VITE_BASE_URL}${imagen.url}`}
                        alt={`Imagen ${imagen.id}`}
                        width="100"
                        preview
                      />
                      <Button
                        icon="pi pi-times"
                        className="p-button-rounded p-button-danger p-button-outlined p-button-sm absolute"
                        style={{ top: 0, right: 0 }}
                        onClick={() => handleImageDelete(imagen.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ✅ Sección de subida de nuevas imágenes */}
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
              disabled={loading}
            />
            <Button
              type="submit"
              label="Guardar"
              icon="pi pi-save"
              loading={loading}
              severity="success"
              disabled={loading}
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
