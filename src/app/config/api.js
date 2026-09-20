import axios from "axios";

export const api = axios.create({
  baseURL: "https://authentication-6qex.onrender.com",
  withCredentials: true,
});