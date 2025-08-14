import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  // En desarrollo, el target del proxy es el backend local
  const devTarget = new URL(env.VITE_API_URL).origin;

  // En producción, el target del proxy es el base URL del servidor
  // Asegúrate de que VITE_BASE_URL esté definido en .env.production
  const prodTarget = env.VITE_BASE_URL;

  const isProduction = mode === "production";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          // target: "http://localhost:3003", // La dirección de tu backend
          // target: "https://pearlbyyou.sytes.net", // La dirección de tu backend
          // target: new URL(env.VITE_API_URL).origin,
          target: isProduction ? prodTarget : devTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "/api"),
        },
      },
    },
  };
});
