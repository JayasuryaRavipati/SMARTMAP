import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// ========================================
// GLOBAL LOADER CONTROL
// ========================================

let startLoading = null;
let stopLoading = null;

// These are called by LoadingContext
export const setLoadingHandlers = (start, stop) => {
    startLoading = start;
    stopLoading = stop;
};

// Track active requests so the loader doesn't
// disappear while another request is still running.
let activeRequests = 0;

// ========================================
// REQUEST INTERCEPTOR
// ========================================

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        activeRequests++;

        if (activeRequests === 1 && startLoading) {
            startLoading();
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ========================================
// RESPONSE INTERCEPTOR
// ========================================

API.interceptors.response.use(
    (response) => {
        activeRequests = Math.max(0, activeRequests - 1);

        if (activeRequests === 0 && stopLoading) {
            stopLoading();
        }

        return response;
    },
    (error) => {
        activeRequests = Math.max(0, activeRequests - 1);

        if (activeRequests === 0 && stopLoading) {
            stopLoading();
        }

        return Promise.reject(error);
    }
);

// ========================================
// DELIVERY APIs
// ========================================

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

// ========================================
// PROFILE APIs
// ========================================

export const getProfile = async () => {
    const response = await API.get("/auth/profile");
    return response.data;
};

export const updateProfile = async (profile) => {
    const response = await API.put("/auth/profile", profile);
    return response.data;
};

export default API;