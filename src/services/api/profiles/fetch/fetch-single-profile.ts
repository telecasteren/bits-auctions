import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";

export const fetchSingleProfile = async (username: string) => {
  const response = await authFetch(
    `${BASE_URL}${USERS}/${username}?_listings=true&_wins=true`,
  );

  if (response.status === 401) {
    unAuthenticatedEvents();
    throw new Error("Unauthorized.");
  }

  if (response.status === 404) {
    window.location.pathname = "/bits-auctions/404.html";
    throw new Error("Profile not found.");
  }

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
