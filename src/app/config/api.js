import axios from "axios";
import { store } from "../store";

export const api = axios.create({
  baseURL: "https://authentication-6qex.onrender.com",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});