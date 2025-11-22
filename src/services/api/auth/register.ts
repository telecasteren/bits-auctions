import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const AUTH = import.meta.env.VITE_API_AUTH;
  const REGISTER = import.meta.env.VITE_API_REGISTER;

  const response = await authFetch(BASE_URL + AUTH + REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Registering account failed.");
};
