import React, { useCallback, useEffect, useRef, useState } from "react";
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

  const authConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  });

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint = showInactive ? "/productos/inactivos" : "/productos";
      const response = await apiClient.get(endpoint, authConfig());
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los productos.",
      });
    } finally {
      setLoading(false);
    }
  }, [showInactive]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const toggleProductStatus = async (productId, activate) => {
    setLoading(true);
    try {
      const endpoint = activate
        ? `/productos/${productId}/activar`
        : `/productos/${productId}/desactivar`;
      await apiClient.put(endpoint, {}, authConfig());
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: activate ? "Producto activado." : "Producto desactivado.",
      });
      await fetchProducts();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "No se pudo actualizar el estado.",
      });
    } finally {
      setLoading(false);
    }
  };

  const confirmToggle = (rowData) => {
    const willActivate = showInactive;
    confirmDialog({
      message: `¿Deseas ${willActivate ? "activar" : "desactivar"} “${rowData.nombre}”?`,
      header: "Confirmar acción",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Confirmar",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-success",
      rejectClassName: "p-button-text",
      accept: () => toggleProductStatus(rowData.id, willActivate),
    });
  };

  const actionBody = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded outlined tooltip="Editar" onClick={() => navigate(`/admin/productos/editar/${rowData.id}`)} />
      <Button
        icon={showInactive ? "pi pi-check" : "pi pi-times"}
        rounded
        severity={showInactive ? "success" : "danger"}
        tooltip={showInactive ? "Activar" : "Desactivar"}
        onClick={() => confirmToggle(rowData)}
      />
    </div>
  );

  const priceBody = (rowData) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }).format(rowData.precio);

  return (
    <section className="admin-page">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="admin-page-header">
        <div>
          <p className="m-0 text-sm text-pearl-soft">Inventario</p>
          <h2 className="m-0 text-3xl">Gestión de productos</h2>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button label="Nuevo producto" icon="pi pi-plus" onClick={() => navigate("/admin/productos/nuevo")} />
          <Button
            outlined
            label={showInactive ? "Ver activos" : "Ver desactivados"}
            icon={showInactive ? "pi pi-eye" : "pi pi-eye-slash"}
            onClick={() => setShowInactive((prev) => !prev)}
          />
        </div>
      </div>

      <CardlessTable>
        <DataTable
          value={products}
          loading={loading}
          dataKey="id"
          emptyMessage="No se encontraron productos."
          paginator
          rows={8}
          rowsPerPageOptions={[8, 12, 20]}
          currentPageReportTemplate="{first} - {last} de {totalRecords}"
          paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
          className="admin-table"
        >
          <Column field="nombre" header="Nombre" sortable />
          <Column field="precio" header="Precio" body={priceBody} sortable />
          <Column header="Acciones" body={actionBody} style={{ width: "10rem" }} />
        </DataTable>
      </CardlessTable>
    </section>
  );
}

function CardlessTable({ children }) {
  return <div className="soft-card p-3">{children}</div>;
}
