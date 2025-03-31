import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8787/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear the token
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/login";
    }

    if (
      window.location.pathname !== "/login" &&
      !localStorage.getItem("token")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
