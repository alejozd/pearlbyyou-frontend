import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password"; // ✅ Importar el componente Password
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FloatLabel } from "primereact/floatlabel"; // ✅ Importar el componente FloatLabel
import apiClient from "../utils/axios";
import { jwtDecode } from "jwt-decode";

export default function AdminUsers() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayDialog, setDisplayDialog] = useState(false);
  // ✅ Añadir el estado para 'confirmPassword'
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [editAdmin, setEditAdmin] = useState(null);
  const [displayEditDialog, setDisplayEditDialog] = useState(false);
  const toast = useRef(null);

  const token = localStorage.getItem("authToken");
  const decodedToken = token ? jwtDecode(token) : null;
  const currentAdminId = decodedToken ? decodedToken.id : null;

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
    // ✅ Validar que las contraseñas coincidan
    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Las contraseñas no coinciden.",
      });
      return;
    }

    // ✅ Desestructurar los datos, excluyendo la contraseña de confirmación
    const { confirmPassword: _, ...adminData } = newAdmin;

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      // ✅ Enviar solo los datos necesarios al backend
      await apiClient.post("/admin-management", adminData, config);
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: "Administrador creado con éxito.",
      });
      fetchAdmins();
      setDisplayDialog(false);
      // ✅ Limpiar el estado, incluyendo 'confirmPassword'
      setNewAdmin({
        email: "",
        password: "",
        confirmPassword: "",
        role: "admin",
      });
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

  // ... (Funciones handleEdit, handleUpdate, confirmToggleStatus, toggleStatus, activeBodyTemplate y actionBodyTemplate sin cambios)
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
        severity="danger"
        text
        raised
        // className="p-button-text"
      />
      <Button
        label="Guardar"
        icon="pi pi-check"
        onClick={handleUpdate}
        severity="success"
      />
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
            <FloatLabel>
              {" "}
              {/* ✅ Usar FloatLabel */}
              <InputText
                id="email"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
              />
              <label htmlFor="email">Correo Electrónico</label>
            </FloatLabel>
          </div>
          <div className="p-field mb-3">
            <FloatLabel>
              {" "}
              {/* ✅ Usar FloatLabel */}
              <Password
                id="password"
                value={newAdmin.password}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, password: e.target.value })
                }
                toggleMask // ✅ Añadir el botón para mostrar/ocultar la contraseña
              />
              <label htmlFor="password">Contraseña</label>
            </FloatLabel>
          </div>
          <div className="p-field mb-3">
            {" "}
            {/* ✅ Campo de confirmar contraseña */}
            <FloatLabel>
              <Password
                id="confirmPassword"
                value={newAdmin.confirmPassword}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, confirmPassword: e.target.value })
                }
                toggleMask
              />
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            </FloatLabel>
          </div>
          <div className="p-field">
            <FloatLabel>
              <Dropdown
                id="new-role"
                value={newAdmin.role}
                options={roleOptions}
                onChange={(e) => setNewAdmin({ ...newAdmin, role: e.value })}
              />
              <label htmlFor="new-role">Rol</label>
            </FloatLabel>
          </div>
        </div>
      </Dialog>

      {/* ✅ Diálogo para editar un administrador existente (sin cambios aquí) */}
      <Dialog
        header="Editar Administrador"
        visible={displayEditDialog}
        style={{ width: "50vw" }}
        footer={editDialogFooter}
        onHide={() => setDisplayEditDialog(false)}
      >
        <div className="p-fluid">
          <div className="p-field mb-4">
            <FloatLabel>
              <InputText
                id="edit-email"
                value={editAdmin?.email || ""}
                onChange={(e) =>
                  setEditAdmin({ ...editAdmin, email: e.target.value })
                }
              />
              <label htmlFor="edit-email">Correo Electrónico</label>
            </FloatLabel>
          </div>
          <div className="p-field">
            <FloatLabel>
              <Dropdown
                id="edit-role"
                value={editAdmin?.role || ""}
                options={roleOptions}
                onChange={(e) => setEditAdmin({ ...editAdmin, role: e.value })}
              />
              <label htmlFor="edit-role">Rol</label>
            </FloatLabel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
