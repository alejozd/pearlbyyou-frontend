import React, { useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import { jwtDecode } from "jwt-decode";

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = useMemo(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      return null;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        localStorage.removeItem("authToken");
        return null;
      }

      return decoded.role;
    } catch {
      localStorage.removeItem("authToken");
      return null;
    }
  }, []);

  const menuItems = [
    { label: "Resumen", icon: "pi pi-chart-line", path: "/admin" },
    { label: "Productos", icon: "pi pi-box", path: "/admin/productos" },
    { label: "Contenido", icon: "pi pi-file-edit", path: "/admin/settings" },
  ];

  if (userRole === "super_admin") {
    menuItems.push({ label: "Usuarios", icon: "pi pi-users", path: "/admin/usuarios" });
  }

  const model = menuItems.map((item) => ({
    ...item,
    className: location.pathname === item.path ? "admin-menu-active" : "",
    command: () => navigate(item.path),
  }));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <header className="admin-header soft-card">
        <div className="flex align-items-center justify-content-between mb-3">
          <div>
            <p className="m-0 text-sm text-pearl-soft">Panel administrativo</p>
            <h1 className="m-0 text-2xl brand-gradient-text">Pearl by You</h1>
          </div>
          <Button label="Cerrar sesión" icon="pi pi-sign-out" severity="danger" outlined onClick={handleLogout} />
        </div>

        <Menubar model={model} className="admin-menubar" />
      </header>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
