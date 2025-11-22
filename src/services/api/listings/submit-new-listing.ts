import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";
import type { Listing } from "@/services/types/listing";

export const submitNewListing = async (listingData: Listing) => {
  const response = await authFetch(`${BASE_URL}${LISTINGS}?_seller=true`, {
    method: "POST",
    body: JSON.stringify(listingData),
  });

  if (!response.ok) {
    throw new Error("Failed to submit listing");
  }

  return await response.json();
};
