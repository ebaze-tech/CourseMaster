import axios from "axios";

// Set the base URL for all API requests
const API = axios.create({
  baseURL: "http://localhost:5000", // Backend API URL
});

// Add JWT token to every request (if available)
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default API;
