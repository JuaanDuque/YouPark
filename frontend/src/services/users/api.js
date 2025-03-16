import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getUserEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/api/users/email/${email}`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

export const createUser = async (data) => {
  try {
    await axios.post(`${API_URL}/api/users/`, {
      data,
    });
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};
