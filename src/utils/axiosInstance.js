import axios from "axios";

// This will look for your variable in .env (VITE_API_URL)
// If it's not found (like when running locally), it defaults to your local port.
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
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
