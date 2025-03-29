import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const createReservation = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/api/reservations/`, { data });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

export const updateReservation = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/api/reservations/${data.id}`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};
