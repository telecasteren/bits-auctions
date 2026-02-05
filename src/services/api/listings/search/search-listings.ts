import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";

export const searchListings = async (query: string) => {
  const q = encodeURIComponent(query);
  const response = await authFetch(
    `${BASE_URL}${LISTINGS}/search?q=${q}&_seller=true&_bids=true`,
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  return await response.json();
};
