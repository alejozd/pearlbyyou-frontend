import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");

  // El target del proxy es el backend completo para desarrollo
  // y la URL base para producción (lo que permite el proxy)
  // En desarrollo, esto debería ser http://localhost:3003
  const proxyTarget = env.VITE_BASE_URL || "http://localhost:3003";

  return {
    plugins: [react()],
    server: {
      proxy: {
        // ✅ CORRECCIÓN: Intercepta rutas que comienzan con /api/v1
        "/api/v1": {
          target: proxyTarget, // Esto será 'http://localhost:3003' en desarrollo
          changeOrigin: true,
          // ✅ rewrite: (path) => path: No reescribe, mantiene el /api/v1.
          // Tu backend espera /api/v1/auth/login, /api/v1/productos, etc.
          rewrite: (path) => path,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          // ✅ Configuración de manualChunks para code splitting
          manualChunks(id) {
            // Separa las librerías de node_modules en diferentes chunks
            if (id.includes("node_modules")) {
              // Un chunk específico para PrimeReact, ya que es grande
              if (id.includes("primereact")) {
                return "primereact-vendor";
              }
              // Un chunk genérico para el resto de las dependencias
              return "vendor";
            }
            // Puedes añadir más reglas aquí si tienes otros módulos grandes
          },
        },
      },
      // ✅ Opcional: Ajustar el límite de advertencia si los chunks aún son grandes
      // chunkSizeWarningLimit: 1000, // Por ejemplo, aumenta el límite a 1000 KB
    },
  };
});
