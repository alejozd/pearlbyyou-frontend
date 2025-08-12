import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Asegúrate de que esta URL sea la correcta para tu backend
      const response = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      console.log("Respuesta del servidor:", response.data);

      if (response.data.token) {
        // ✅ Login exitoso: guarda el token en el almacenamiento local
        localStorage.setItem("authToken", response.data.token);
        toast.current.show({
          severity: "success",
          summary: "Login Exitoso",
          detail: "Redirigiendo...",
          life: 1500,
        });

        // ✅ Redirige al panel de administración
        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "No se recibió token. Intenta de nuevo.",
        });
      }
    } catch (err) {
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
      <Card title="Acceso de Administrador" className="w-full md:w-25rem">
        <form onSubmit={handleLogin} className="flex flex-column gap-3">
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
            <label htmlFor="email">Correo Electrónico</label>
          </span>
          <span className="p-float-label">
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <label htmlFor="password">Contraseña</label>
          </span>
          <Button
            type="submit"
            label="Iniciar Sesión"
            className="w-full mt-3"
          />
        </form>
      </Card>
    </div>
  );
}
