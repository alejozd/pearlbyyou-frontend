import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axios";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      toast.current.show({
        severity: "warn",
        summary: "Campos requeridos",
        detail: "Ingresa correo y contraseña para continuar.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.post("/auth/login", { email, password });

      if (!response.data?.token) {
        throw new Error("Token no recibido");
      }

      localStorage.setItem("authToken", response.data.token);
      toast.current.show({
        severity: "success",
        summary: "Bienvenido",
        detail: "Ingreso exitoso. Redirigiendo al panel...",
        life: 1200,
      });

      setTimeout(() => navigate("/admin"), 1000);
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "No se pudo iniciar sesión",
        detail: error.response?.data?.message || "Verifica tus credenciales.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <Toast ref={toast} />
      <Card className="admin-login-card soft-card">
        <div className="text-center mb-4">
          <p className="m-0 text-sm text-pearl-soft">Acceso privado</p>
          <h1 className="m-0 text-3xl brand-gradient-text">Admin Pearl by You</h1>
        </div>

        <form onSubmit={handleLogin} className="p-fluid flex flex-column gap-4">
          <FloatLabel>
            <InputText id="admin-email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
            <label htmlFor="admin-email">Correo electrónico</label>
          </FloatLabel>

          <FloatLabel>
            <Password
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              feedback={false}
              toggleMask
              disabled={loading}
            />
            <label htmlFor="admin-password">Contraseña</label>
          </FloatLabel>

          <Button type="submit" label="Ingresar" icon="pi pi-lock-open" loading={loading} />
        </form>
      </Card>
    </div>
  );
}
