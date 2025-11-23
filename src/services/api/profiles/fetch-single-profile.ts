import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const fetchSingleProfile = async (username: string) => {
  const response = await authFetch(
    `${BASE_URL}${USERS}/${username}?_listings=true&_wins=true`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("API did not return JSON");
  }

  const { data } = await response.json();
  return data;
};
