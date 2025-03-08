import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error en el login:",
      error.response?.data || "Error desconocido"
    );
    throw error.response?.data || { message: "Error de conexión" };
  }
};
