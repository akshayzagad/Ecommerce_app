import { api } from "../../../app/config/api";

export const loginUserApi = async (credentials) => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};
