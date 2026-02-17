import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FloatLabel } from "primereact/floatlabel";
import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/axios";

const roleOptions = [
  { label: "Admin", value: "admin" },
  { label: "Super Admin", value: "super_admin" },
];

const initialNewAdmin = {
  email: "",
  password: "",
  confirmPassword: "",
  role: "admin",
};

export default function AdminUsers() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCreate, setDisplayCreate] = useState(false);
  const [displayEdit, setDisplayEdit] = useState(false);
  const [newAdmin, setNewAdmin] = useState(initialNewAdmin);
  const [editAdmin, setEditAdmin] = useState(null);
  const toast = useRef(null);

  const token = localStorage.getItem("authToken");
  const currentAdminId = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token)?.id;
    } catch {
      return null;
    }
  }, [token]);

  const fetchAdmins = useCallback(async () => {
    setLoading(true);
    try {
      const response = await apiClient.get("/admin-management", { headers: { Authorization: `Bearer ${token}` } });
      setAdmins(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudieron cargar los administradores.",
      });
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const handleCreate = async () => {
    if (!newAdmin.email || !newAdmin.password) {
      toast.current.show({ severity: "warn", summary: "Campos requeridos", detail: "Completa correo y contraseña." });
      return;
    }

    if (newAdmin.password !== newAdmin.confirmPassword) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Las contraseñas no coinciden." });
      return;
    }

    setLoading(true);
    try {
      const { confirmPassword, ...payload } = newAdmin;
      void confirmPassword;
      await apiClient.post("/admin-management", payload, { headers: { Authorization: `Bearer ${token}` } });
      toast.current.show({ severity: "success", summary: "Éxito", detail: "Administrador creado." });
      setDisplayCreate(false);
      setNewAdmin(initialNewAdmin);
      await fetchAdmins();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "No se pudo crear el administrador.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!editAdmin?.id) return;
    setLoading(true);
    try {
      await apiClient.put(`/admin-management/${editAdmin.id}`, editAdmin, { headers: { Authorization: `Bearer ${token}` } });
      toast.current.show({ severity: "success", summary: "Éxito", detail: "Administrador actualizado." });
      setDisplayEdit(false);
      await fetchAdmins();
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data?.message || "No se pudo actualizar el administrador.",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (adminId, active) => {
    setLoading(true);
    try {
      await apiClient.put(`/admin-management/${adminId}/status`, { is_active: !active }, { headers: { Authorization: `Bearer ${token}` } });
      toast.current.show({
        severity: "success",
        summary: "Éxito",
        detail: active ? "Administrador desactivado." : "Administrador activado.",
      });
      await fetchAdmins();
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

  const confirmToggleStatus = (rowData) => {
    confirmDialog({
      message: `¿Deseas ${rowData.is_active ? "desactivar" : "activar"} a ${rowData.email}?`,
      header: "Confirmar acción",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Confirmar",
      rejectLabel: "Cancelar",
      acceptClassName: "p-button-success",
      rejectClassName: "p-button-text",
      accept: () => toggleStatus(rowData.id, rowData.is_active),
    });
  };

  const activeBody = (rowData) => (
    <span className={`p-tag p-tag-${rowData.is_active ? "success" : "danger"}`}>
      {rowData.is_active ? "Activo" : "Inactivo"}
    </span>
  );

  const actionsBody = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" rounded outlined tooltip="Editar" onClick={() => {
        setEditAdmin({ id: rowData.id, email: rowData.email, role: rowData.role });
        setDisplayEdit(true);
      }} />

      {rowData.id !== currentAdminId && (
        <Button
          icon={rowData.is_active ? "pi pi-lock" : "pi pi-lock-open"}
          rounded
          severity={rowData.is_active ? "danger" : "success"}
          tooltip={rowData.is_active ? "Desactivar" : "Activar"}
          onClick={() => confirmToggleStatus(rowData)}
        />
      )}
    </div>
  );

  const createFooter = (
    <div className="flex gap-2 justify-content-end">
      <Button label="Cancelar" text onClick={() => setDisplayCreate(false)} />
      <Button label="Crear" icon="pi pi-check" onClick={handleCreate} loading={loading} />
    </div>
  );

  const editFooter = (
    <div className="flex gap-2 justify-content-end">
      <Button label="Cancelar" text onClick={() => setDisplayEdit(false)} />
      <Button label="Guardar" icon="pi pi-save" onClick={handleUpdate} loading={loading} />
    </div>
  );

  return (
    <section className="admin-page">
      <Toast ref={toast} />
      <ConfirmDialog />

      <div className="admin-page-header">
        <div>
          <p className="m-0 text-sm text-pearl-soft">Seguridad</p>
          <h2 className="m-0 text-3xl">Administradores</h2>
        </div>
        <Button label="Nuevo administrador" icon="pi pi-plus" onClick={() => setDisplayCreate(true)} />
      </div>

      <div className="soft-card p-3">
        <DataTable value={admins} loading={loading} dataKey="id" paginator rows={8} emptyMessage="No se encontraron administradores." className="admin-table">
          <Column field="email" header="Correo" sortable />
          <Column field="role" header="Rol" sortable />
          <Column field="is_active" header="Estado" body={activeBody} />
          <Column header="Acciones" body={actionsBody} style={{ width: "10rem" }} />
        </DataTable>
      </div>

      <Dialog header="Crear administrador" visible={displayCreate} style={{ width: "min(95vw, 560px)" }} footer={createFooter} onHide={() => setDisplayCreate(false)}>
        <div className="p-fluid flex flex-column gap-4 mt-2">
          <FloatLabel>
            <InputText id="new-email" value={newAdmin.email} onChange={(e) => setNewAdmin((prev) => ({ ...prev, email: e.target.value }))} />
            <label htmlFor="new-email">Correo</label>
          </FloatLabel>

          <FloatLabel>
            <Password id="new-password" value={newAdmin.password} onChange={(e) => setNewAdmin((prev) => ({ ...prev, password: e.target.value }))} feedback={false} toggleMask />
            <label htmlFor="new-password">Contraseña</label>
          </FloatLabel>

          <FloatLabel>
            <Password id="new-confirm-password" value={newAdmin.confirmPassword} onChange={(e) => setNewAdmin((prev) => ({ ...prev, confirmPassword: e.target.value }))} feedback={false} toggleMask />
            <label htmlFor="new-confirm-password">Confirmar contraseña</label>
          </FloatLabel>

          <FloatLabel>
            <Dropdown id="new-role" value={newAdmin.role} options={roleOptions} onChange={(e) => setNewAdmin((prev) => ({ ...prev, role: e.value }))} />
            <label htmlFor="new-role">Rol</label>
          </FloatLabel>
        </div>
      </Dialog>

      <Dialog header="Editar administrador" visible={displayEdit} style={{ width: "min(95vw, 520px)" }} footer={editFooter} onHide={() => setDisplayEdit(false)}>
        <div className="p-fluid flex flex-column gap-4 mt-2">
          <FloatLabel>
            <InputText id="edit-email" value={editAdmin?.email || ""} onChange={(e) => setEditAdmin((prev) => ({ ...prev, email: e.target.value }))} />
            <label htmlFor="edit-email">Correo</label>
          </FloatLabel>

          <FloatLabel>
            <Dropdown id="edit-role" value={editAdmin?.role || ""} options={roleOptions} onChange={(e) => setEditAdmin((prev) => ({ ...prev, role: e.value }))} />
            <label htmlFor="edit-role">Rol</label>
          </FloatLabel>
        </div>
      </Dialog>
    </section>
  );
}
