import { api } from "../../../app/config/api";

export const loginUserApi = async (credentials) => {
  const { data } = await api.post("/api/auth/login", credentials);
  return data;
};

export const loggedIn = async () => {
  const { data } = await api.get("/api/auth/loggedIn",{
    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`},
  });
  return data;
};