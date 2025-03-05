import axios from "axios";

// Set the base URL using the environment variable
const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "/";

const api = axios.create({
  // baseURL, 
  withCredentials: true,
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