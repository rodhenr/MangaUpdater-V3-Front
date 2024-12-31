import axios, { AxiosInstance } from "axios";

// Create an Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.example.com", // Set your API base URL
  timeout: 10000, // Set timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Add authorization token if available
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server-side error
      console.error("Error Response:", error.response.data);
    } else if (error.request) {
      // No response from server
      console.error("No Response:", error.request);
    } else {
      // Other errors
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
