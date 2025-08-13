import React, { useEffect, useState, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import apiClient from "../utils/axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInactive, setShowInactive] = useState(false);
  const navigate = useNavigate();
  const toast = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, [showInactive]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // ✅ Rutas corregidas
      const endpoint = showInactive ? "/productos/inactivos" : "/productos";
      const response = await apiClient.get(endpoint, config);
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setLoading(false);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los productos.",
      });
    }
  };

  const handleCreate = () => {
    navigate("/admin/productos/nuevo");
  };

  const handleEdit = (productId) => {
    navigate(`/admin/productos/editar/${productId}`);
  };

  const handleDeactivate = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // ✅ Ruta corregida
      await apiClient.put(`/productos/${productId}/desactivar`, {}, config);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Producto desactivado con éxito.",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error al desactivar el producto:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error.response?.data?.message || "Error al desactivar el producto.",
      });
    }
  };

  const handleActivate = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // ✅ Ruta corregida
      await apiClient.put(`/productos/${productId}/activar`, {}, config);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Producto activado con éxito.",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error al activar el producto:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error.response?.data?.message || "Error al activar el producto.",
      });
    }
  };

  const confirmDeactivate = (rowData) => {
    confirmDialog({
      message: `¿Estás seguro de que quieres desactivar el producto "${rowData.nombre}"?`,
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => handleDeactivate(rowData.id),
    });
  };

  const confirmActivate = (rowData) => {
    confirmDialog({
      message: `¿Estás seguro de que quieres activar el producto "${rowData.nombre}"?`,
      header: "Confirmación",
      icon: "pi pi-check",
      acceptLabel: "Sí",
      rejectLabel: "No",
      accept: () => handleActivate(rowData.id),
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          severity="warning"
          rounded
          onClick={() => handleEdit(rowData.id)}
        />
        {showInactive ? (
          <Button
            icon="pi pi-check"
            severity="success"
            rounded
            onClick={() => confirmActivate(rowData)}
          />
        ) : (
          <Button
            icon="pi pi-times"
            severity="danger"
            rounded
            onClick={() => confirmDeactivate(rowData)}
          />
        )}
      </div>
    );
  };

  const priceBodyTemplate = (rowData) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
    }).format(rowData.precio);
  };

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <h2 className="mb-4">Gestión de Productos</h2>
      <div className="flex justify-content-between mb-4">
        <Button
          label="Crear Nuevo Producto"
          icon="pi pi-plus"
          onClick={handleCreate}
        />
        <Button
          label={
            showInactive
              ? "Ver Productos Activos"
              : "Ver Productos Desactivados"
          }
          icon={showInactive ? "pi pi-eye" : "pi pi-eye-slash"}
          className="p-button-secondary"
          onClick={() => setShowInactive(!showInactive)}
        />
      </div>
      <DataTable
        value={products}
        loading={loading}
        emptyMessage="No se encontraron productos."
        dataKey="id"
      >
        <Column field="id" header="ID" />
        <Column field="nombre" header="Nombre" />
        <Column field="precio" header="Precio" body={priceBodyTemplate} />
        <Column header="Acciones" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
}
