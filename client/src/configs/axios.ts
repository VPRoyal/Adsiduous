import axios from "axios";
import { storage } from "@/utils/localStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

// ToDo: Need to improve logic and commenting
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = storage.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Central error handling
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
