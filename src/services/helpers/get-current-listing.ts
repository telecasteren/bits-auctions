import { fetchSingleListing } from "@/services/api/listings/fetch/fetch-single-listing";
import type { Listing } from "@/services/types/listing";

export const getCurrentListing = async () => {
  const listingId =
    window.location.pathname.split("/bits-auctions/listings/")[1] || "";
  const singleListing = await fetchSingleListing(listingId);
  const listing = singleListing as Listing;

  if (!listing) {
    window.location.pathname = "/bits-auctions/404.html";
    return;
  }

  return { listingId, listing };
};
