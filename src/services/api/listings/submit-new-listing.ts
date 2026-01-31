import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";
import type { Listing } from "@/services/types/listing";
import type { ApiError, ApiErrorResponse } from "@/services/api/errors/types";

export const submitNewListing = async (listingData: Listing) => {
  const response = await authFetch(`${BASE_URL}${LISTINGS}?_seller=true`, {
    method: "POST",
    body: JSON.stringify(listingData),
  });

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
