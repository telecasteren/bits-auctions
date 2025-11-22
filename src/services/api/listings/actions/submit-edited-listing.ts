import { authFetch } from "@/services/api/auth/config/auth-fetch";
import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";
import type { Listing } from "@/services/types/listing";

export const submitEditedListing = async (listing: Listing) => {
  const response = await authFetch(`${BASE_URL}${LISTINGS}/${listing.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: listing.title,
      description: listing.description,
      media: listing.media.map((item, index) => ({
        url: item.url,
        alt: `Listing image nr: ${index + 1}`,
      })),
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const result = await response.json();
  return result;
};
