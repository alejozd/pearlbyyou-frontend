import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // ✅ Agrega esta sección de proxy
  server: {
    proxy: {
      "/api": {
        // target: "http://localhost:3003", // La dirección de tu backend
        target: "https://pearlbyyou.sytes.net", // La dirección de tu backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Asegura que la ruta /api se mantenga
      },
    },
  },
});
