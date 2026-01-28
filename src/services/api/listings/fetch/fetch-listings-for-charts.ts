import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";
import { Listing } from "@/services/types/listing";

export const fetchListingsForCharts = async () => {
  const response = await authFetch(
    `${BASE_URL}${LISTINGS}?_seller=true&_bids=true`,
  );

  if (response.status === 404) {
    window.location.pathname = "/bits-auctions/404.html";
    throw new Error("Listings not found.");
  }

  if (!response.ok) {
    throw new Error(`Fetching listings failed.`);
  }

  const { data } = await response.json();
  const listings: Listing[] = data;

  return { data: listings };
};
