import axios from 'axios';
import app from '../../../backend/src/config';
const API_URL = app.port;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.get(`${API_URL}/api/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error.response.data);
    throw error.response.data;
  }
};
