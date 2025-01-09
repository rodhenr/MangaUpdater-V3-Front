import axios from "axios";

export const apiClientDatabase = axios.create({
  baseURL: "http://localhost:5002/",
  timeout: 10000,
});

export const apiClientUser = axios.create({
  baseURL: "http://localhost:5003/",
  timeout: 10000,
});
