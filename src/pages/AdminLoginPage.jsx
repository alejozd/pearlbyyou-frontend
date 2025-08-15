import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { ProgressSpinner } from "primereact/progressspinner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Intentando iniciar sesión con:", { email, password });
      // ✅ Asegúrate de que esta URL sea la correcta para tu backend
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      // console.log("Respuesta del servidor:", response.data);

      if (response.data.token) {
        // ✅ Login exitoso: guarda el token en el almacenamiento local
        localStorage.setItem("authToken", response.data.token);
        toast.current.show({
          severity: "success",
          summary: "Login Exitoso",
          detail: "Redirigiendo...",
          life: 1500,
        });
        setLoading(false);
        // ✅ Redirige al panel de administración
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        setLoading(false);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se recibió token. Intenta de nuevo.",
        });
      }
    } catch (err) {
      setLoading(false);
      console.error("Error de login:", err);
      toast.current.show({
        severity: "error",
        summary: "Login Fallido",
        detail: err.response?.data?.message || "Credenciales incorrectas.",
      });
      console.log("Detalles del error:", err.response);
    }
  };

  return (
    <div
      className="flex justify-content-center align-items-center"
      style={{ minHeight: "calc(100vh - 56px)" }}
    >
      <Toast ref={toast} />
      <Card
        title="Acceso de Administrador"
        className="w-full md:w-25rem relative"
      >
        <form onSubmit={handleLogin} className="flex flex-column gap-4 p-fluid">
          <FloatLabel>
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            <label htmlFor="email">Correo Electrónico</label>
          </FloatLabel>
          <FloatLabel>
            <Password
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
              feedback={false}
              toggleMask
              disabled={loading}
            />
            <label htmlFor="password">Contraseña</label>
          </FloatLabel>
          <Button
            type="submit"
            label="Iniciar Sesión"
            className="w-full mt-3"
            loading={loading}
          />
        </form>
        {/* ✅ Overlay condicional para mostrar el spinner */}
        {loading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-content-center align-items-center bg-white-alpha-50">
            <ProgressSpinner />
          </div>
        )}
      </Card>
    </div>
  );
}
