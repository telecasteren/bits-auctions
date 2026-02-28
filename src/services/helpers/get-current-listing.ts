import { fetchSingleListing } from "@/services/api/listings/fetch/fetch-single-listing";
import type { Listing } from "@/services/types/listing";

export const getCurrentListing = async () => {
  const listingId =
    window.location.pathname.split("/listings/")[1] || "";

  if (!listingId.trim()) {
    return { listingId: "", listing: null };
  }

  const singleListing = await fetchSingleListing(listingId);
  const listing = singleListing as Listing;

  if (!listing) {
    window.location.pathname = "/404.html";
    return;
  }

  return { listingId, listing };
};
