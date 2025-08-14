import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown"; // ✅ Importa el componente Dropdown
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import apiClient from "../utils/axios";
import { jwtDecode } from "jwt-decode";

export default function AdminUsers() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayDialog, setDisplayDialog] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    role: "admin",
  }); // ✅ Añade el rol por defecto
  const [editAdmin, setEditAdmin] = useState(null);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);
  const toast = useRef(null);

  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const currentAdminId = decodedToken ? decodedToken.id : null;

  // ✅ Opciones para el Dropdown de roles
  const roleOptions = [
    { label: "Admin", value: "admin" },
    { label: "Super Admin", value: "super_admin" },
  ];

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await apiClient.get("/admin-management", config);
      setAdmins(response.data);
    } catch (error) {
      console.error("Error al obtener administradores:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los administradores.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await apiClient.post("/admin-management", newAdmin, config);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Administrador creado con éxito.",
      });
      fetchAdmins();
      setDisplayDialog(false);
      setNewAdmin({ email: "", password: "", role: "admin" });
    } catch (error) {
      console.error("Error al crear administrador:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error.response?.data?.message || "Error al crear el administrador.",
      });
    }
  };

  const handleEdit = (rowData) => {
    setEditAdmin({ ...rowData });
    setDisplayEditDialog(true);
  };

  const handleUpdate = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await apiClient.put(
        `/admin-management/${editAdmin.id}`,
        editAdmin,
        config
      );
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Administrador actualizado con éxito.",
      });
      fetchAdmins();
      setDisplayEditDialog(false);
    } catch (error) {
      console.error("Error al actualizar administrador:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail:
          error.response?.data?.message ||
          "Error al actualizar el administrador.",
      });
    }
  };

  const confirmToggleStatus = (rowData) => {
    confirmDialog({
      message: `¿Estás seguro de que quieres ${
        rowData.is_active ? "desactivar" : "activar"
      } a este administrador?`,
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      accept: () => toggleStatus(rowData),
    });
  };

  const toggleStatus = async (rowData) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await apiClient.patch(
        `/admin-management/${rowData.id}/status`,
        { is_active: !rowData.is_active },
        config
      );
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: `Administrador ${
          rowData.is_active ? "desactivado" : "activado"
        } con éxito.`,
      });
      fetchAdmins();
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "Error al cambiar el estado.",
      });
    }
  };

  const activeBodyTemplate = (rowData) => {
    return (
      <span
        className={`p-tag p-tag-${rowData.is_active ? "success" : "danger"}`}
      >
        {rowData.is_active ? "Activo" : "Inactivo"}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          severity="info"
          onClick={() => handleEdit(rowData)}
        />
        {rowData.id !== currentAdminId && (
          <Button
            icon={rowData.is_active ? "pi pi-lock" : "pi pi-unlock"}
            rounded
            severity={rowData.is_active ? "danger" : "success"}
            onClick={() => confirmToggleStatus(rowData)}
          />
        )}
      </div>
    );
  };

  const createDialogFooter = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setDisplayDialog(false)}
        className="p-button-text"
      />
      <Button label="Guardar" icon="pi pi-check" onClick={handleCreate} />
    </div>
  );

  const editDialogFooter = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setDisplayEditDialog(false)}
        className="p-button-text"
      />
      <Button label="Guardar" icon="pi pi-check" onClick={handleUpdate} />
    </div>
  );

  return (
    <div className="card">
      <Toast ref={toast} />
      <ConfirmDialog />
      <h2 className="mb-4">Gestión de Administradores</h2>
      <Button
        label="Crear Nuevo Administrador"
        icon="pi pi-plus"
        onClick={() => setDisplayDialog(true)}
        className="mb-4"
      />

      <DataTable
        value={admins}
        loading={loading}
        emptyMessage="No se encontraron administradores."
        dataKey="id"
        size="small"
        paginator
        rows={10}
      >
        <Column field="id" header="ID" />
        <Column field="email" header="Correo Electrónico" />
        <Column field="role" header="Rol" />
        <Column field="is_active" header="Activo" body={activeBodyTemplate} />
        <Column
          body={actionBodyTemplate}
          header="Acciones"
          style={{ width: "120px" }}
        />
      </DataTable>

      {/* ✅ Diálogo para crear un nuevo administrador */}
      <Dialog
        header="Crear Nuevo Administrador"
        visible={displayDialog}
        style={{ width: "50vw" }}
        footer={createDialogFooter}
        onHide={() => setDisplayDialog(false)}
      >
        <div className="p-fluid">
          <div className="p-field mb-3">
            <label htmlFor="email">Correo Electrónico</label>
            <InputText
              id="email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />
          </div>
          <div className="p-field mb-3">
            {" "}
            {/* ✅ Añade el campo de contraseña */}
            <label htmlFor="password">Contraseña</label>
            <InputText
              id="password"
              type="password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            {" "}
            {/* ✅ Añade el campo de rol para el nuevo admin */}
            <label htmlFor="new-role">Rol</label>
            <Dropdown
              id="new-role"
              value={newAdmin.role}
              options={roleOptions}
              onChange={(e) => setNewAdmin({ ...newAdmin, role: e.value })}
            />
          </div>
        </div>
      </Dialog>

      {/* ✅ Diálogo para editar un administrador existente */}
      <Dialog
        header="Editar Administrador"
        visible={displayEditDialog}
        style={{ width: "50vw" }}
        footer={editDialogFooter}
        onHide={() => setDisplayEditDialog(false)}
      >
        <div className="p-fluid">
          <div className="p-field mb-3">
            <label htmlFor="edit-email">Correo Electrónico</label>
            <InputText
              id="edit-email"
              value={editAdmin?.email || ""}
              onChange={(e) =>
                setEditAdmin({ ...editAdmin, email: e.target.value })
              }
            />
          </div>
          <div className="p-field">
            <label htmlFor="edit-role">Rol</label>
            <Dropdown // ✅ Reemplaza InputText con Dropdown
              id="edit-role"
              value={editAdmin?.role || ""}
              options={roleOptions}
              onChange={(e) => setEditAdmin({ ...editAdmin, role: e.value })}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );
}
