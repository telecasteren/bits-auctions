import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";

export const fetchAllProfiles = async () => {
  const response = await authFetch(`${BASE_URL}${USERS}`);

  if (response.status === 401) {
    unAuthenticatedEvents();
    throw new Error("Unauthorized.");
  }

  if (response.status === 404) {
    window.location.pathname = "/404.html";
    throw new Error("Profile not found.");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch profiles: ${response.status}`);
  }

  const { data } = await response.json();
  return data;
};
