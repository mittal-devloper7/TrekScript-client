import axios from "axios";

const axiosInstance = axios.create({
  // This looks for your VITE_API_URL from .env
  // If not found, it defaults to your local development server
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
