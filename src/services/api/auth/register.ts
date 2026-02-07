import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, AUTH, REGISTER } from "@/services/api/auth/config/constants";

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const response = await authFetch(BASE_URL + AUTH + REGISTER, {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error("Registering account failed.");
};
