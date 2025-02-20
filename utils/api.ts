import axios from "axios";

const api = axios.create({
  baseURL: "/api", // Set base URL
  withCredentials: true, // Send cookies with requests
});

// Function to get token from cookies manually
const getTokenFromCookies = () => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("token="));
    return tokenCookie ? tokenCookie.split("=")[1] : null;
  }
  return null;
};

// Add request interceptor to include Authorization header automatically
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies(); // Get token manually
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

