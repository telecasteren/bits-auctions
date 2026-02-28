import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";

export const fetchSingleListing = async (listingId: string) => {
  const response = await authFetch(
    `${BASE_URL}${LISTINGS}/${listingId}?_seller=true&_bids=true`,
  );

  if (response.status === 404) {
    window.location.pathname = "/404.html";
    throw new Error("Listing not found.");
  }

  if (!response.ok) {
    throw new Error(`Fetching single listing failed.`);
  }

  const { data } = await response.json();
  return data;
};
