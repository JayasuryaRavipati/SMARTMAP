import axios from "axios";

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });
const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Delivery APIs

export const createDelivery = async (deliveryData) => {
  const response = await API.post("/deliveries", deliveryData);
  return response.data;
};

export const getDeliveries = async () => {
  const response = await API.get("/deliveries");
  return response.data;
};

export const getDelivery = async (id) => {
  const response = await API.get(`/deliveries/${id}`);
  return response.data;
};

export const updateDelivery = async (id, data) => {
  const response = await API.put(`/deliveries/${id}`, data);
  return response.data;
};

export const deleteDelivery = async (id) => {
  const response = await API.delete(`/deliveries/${id}`);
  return response.data;
};

// Profile APIs

export const getProfile = async () => {
  const response = await API.get("/auth/profile");
  return response.data;
};

export const updateProfile = async (profile) => {
  const response = await API.put("/auth/profile", profile);
  return response.data;
};

export default API;