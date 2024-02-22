import axios from "axios";
import { getCookie } from "cookies-next";

function getToken() {
  const jwt = getCookie("jwt") as string;
  return jwt;
}

// Create an Axios instance
const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
