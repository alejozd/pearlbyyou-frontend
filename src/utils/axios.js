import axios from "axios";

// Crear una instancia de Axios con la URL base de tu API
const apiClient = axios.create({
  baseURL: "http://localhost:3003/api/v1", // Ajusta esta URL si es diferente
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores de autenticación
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Si el error es 401 (Unauthorized) y no estamos en la página de login
    if (error.response?.status === 401) {
      console.error("Token expirado o no autorizado. Redirigiendo al login...");
      localStorage.removeItem("authToken"); // Elimina el token no válido
      // Redirigir a la página de login
      window.location = "/admin/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
