import { userMessage } from "@/app/ui/utils/user-messages";
import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";
import type { ApiError, ApiErrorResponse } from "@/services/api/errors/types";

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
    let message = `Error: ${response.status} ${response.statusText}`;

    const data = (await response.json()) as ApiErrorResponse;
    if (Array.isArray(data?.errors) && data.errors.length > 0) {
      message = data.errors.map((err: ApiError) => err.message).join("; ");
    } else if (typeof data?.message === "string") {
      message = data.message;
    }
    throw new Error(message);
  }

  return await response.json();
};
