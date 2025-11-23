import { saveKey } from "@/utils/storage/storage";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const login = async (email: string, password: string) => {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const AUTH = import.meta.env.VITE_API_AUTH;
  const LOGIN = import.meta.env.VITE_API_LOGIN;

  const response = await authFetch(BASE_URL + AUTH + LOGIN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const { accessToken, ...profile } = (await response.json()).data;
    saveKey("token", accessToken);
    saveKey("user", profile);

    return profile;
  }

  throw new Error("Login failed.");
};
