import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const fetchListingsByProfile = async (username: string) => {
  const response = await authFetch(`${BASE_URL}${USERS}/${username}/listings`);

  if (response.status === 404) {
    window.location.pathname = "/404.html";
    throw new Error("Listing not found.");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch listings: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("API did not return JSON");
  }

  const { data } = await response.json();
  return data;
};
