import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";

export const placeBid = async (bid: number, listingId: string) => {
  const response = await authFetch(`${BASE_URL}${LISTINGS}/${listingId}/bids`, {
    method: "POST",
    body: JSON.stringify(bid),
  });

  if (!response.ok) {
    throw new Error("Failed to place bid");
  }

  return await response.json();
};
