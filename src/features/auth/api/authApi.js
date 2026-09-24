import { api } from "../../../app/config/api";

export const loginUserApi = async (credentials) => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

export const loggedIn = async () => {
  const { data } = await api.get("/api/auth/loggedIn");
  return data;
};

export const refreshToken = async () => {
  const { data } = await api.get("/api/auth/refreshToken");
  return data;
};