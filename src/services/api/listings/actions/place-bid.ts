import { userMessage } from "@/app/ui/utils/user-messages";
import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";

export const placeBid = async (bidAmount: number, listingId: string) => {
  const response = await authFetch(`${BASE_URL}${LISTINGS}/${listingId}/bids`, {
    method: "POST",
    body: JSON.stringify({ amount: bidAmount }),
  });

  if (response.status === 400) {
    userMessage("warning", "Bid must be higher than the current highest bid", {
      duration: 8000,
    });
    throw new Error("Bid must be higher than current highest bid");
  }

  if (!response.ok) {
    throw new Error("Failed to place bid");
  }

  return await response.json();
};
