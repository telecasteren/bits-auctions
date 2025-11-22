import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const fetchSingleProfile = async (username: string) => {
  const response = await authFetch(
    `${BASE_URL}${USERS}/${username}?_listings=true&_wins=true`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status}`);
  }

  const { data } = await response.json();
  return data;
};
