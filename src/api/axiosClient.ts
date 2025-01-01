import axios from "axios";

export const apiClientDatabase = axios.create({
  baseURL: "http://localhost:5152/",
  timeout: 10000,
});
