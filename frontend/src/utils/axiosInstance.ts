import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todo-mern-app-ppty.onrender.com/api",
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    console.log("Interceptor - Token from localStorage:", token); // Log the token to debug

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      console.log(
        "Interceptor - Authorization Header:",
        config.headers["Authorization"]
      );
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
