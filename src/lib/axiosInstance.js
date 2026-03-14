import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true // 🔥 send cookies always
});

export default axiosInstance;
