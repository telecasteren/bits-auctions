import { authFetch } from "@/services/api/auth/config/auth-fetch";
import {
  BASE_URL,
  LISTINGS,
  PER_PAGE,
} from "@/services/api/auth/config/constants";

export const fetchAllListings = async (limit = PER_PAGE, page = 1) => {
  const response = await authFetch(
    `${BASE_URL}${LISTINGS}?_seller=true&_bids=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`
  );

  if (response.status === 404) {
    window.location.pathname = "/bits-auctions/404.html";
    throw new Error("Listings not found.");
  }

  if (!response.ok) {
    throw new Error(`Fetching listings failed.`);
  }

  return await response.json();
};
