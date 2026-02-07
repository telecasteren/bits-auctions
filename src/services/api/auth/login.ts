import { saveKey } from "@/utils/storage/storage";
import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, AUTH, LOGIN } from "@/services/api/auth/config/constants";

export const login = async (email: string, password: string) => {
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
