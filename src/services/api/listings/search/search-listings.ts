import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";

export const searchListings = async (query: string) => {
  const response = await authFetch(
    `${BASE_URL}${LISTINGS}/search?q=${query}&_seller=true&_bids=true`
  );

  if (!response.ok) {
    throw new Error(`Fetching listings failed.`);
  }

  return await response.json();
};
