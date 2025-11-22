import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const fetchAllProfiles = async () => {
  const response = await authFetch(`${BASE_URL}${USERS}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch profiles: ${response.status}`);
  }

  const { data } = await response.json();
  return data;
};
