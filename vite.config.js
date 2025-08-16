import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const proxyTarget = env.VITE_BASE_URL || "http://localhost:3003";

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/v1": {
          target: proxyTarget,
          changeOrigin: true,
          rewrite: (path) => path,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("primereact")) {
                return "primereact-vendor";
              }
              return "vendor";
            }
          },
        },
      },
      // ✅ Ajusta el límite de la advertencia a un valor mayor, por ejemplo, 1000 KB (1 MB)
      chunkSizeWarningLimit: 1000,
    },
  };
});
