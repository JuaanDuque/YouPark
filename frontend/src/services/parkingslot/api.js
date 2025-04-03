import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getParkingslots = async (param) => {
  try {
    const response = await axios.get(`${API_URL}/api/parkingslot/vehicle`, {
      params: param,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

export const createParkingslot = async (data) => {
  try {
    await axios.post(`${API_URL}/api/parkingslot/`, {
      data,
    });
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

export const getParkingslotsAll = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/parkingslot/`, {});
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};

export const updateParkingSlot = async (data) => {
  try {
    const response = await axios.put(`${API_URL}/api/parkingslot/${data.id}`, {
      data,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error de conexión" };
  }
};
