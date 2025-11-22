import { loadKey } from "@/utils/storage/storage";

export const headers = (hasBody = false) => {
  const headers = new Headers();
  const token = loadKey("token");
  const apiKey = import.meta.env.VITE_NOROFF_API_KEY;

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }

  if (apiKey) {
    headers.append("X-Noroff-API-Key", apiKey);
  }

  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
};
