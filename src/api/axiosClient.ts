import axios from "axios";
import { getStoredAdminAuth } from "./auth/auth.storage";

export const apiClientDatabase = axios.create({
  baseURL: "http://localhost:5002/",
  timeout: 10000,
});

export const apiClientUser = axios.create({
  baseURL: "http://localhost:5003/",
  timeout: 10000,
});

apiClientDatabase.interceptors.request.use((config) => {
  const storedAdminAuth = getStoredAdminAuth();

  if (storedAdminAuth?.token) {
    config.headers.set("Authorization", `Bearer ${storedAdminAuth.token}`);
  }

  return config;
});
