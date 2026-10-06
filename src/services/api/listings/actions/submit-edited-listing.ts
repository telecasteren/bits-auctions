import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";
import type { Listing } from "@/services/types/listing";

export const submitEditedListing = async (listing: Listing) => {
  return await withApiHelper<Listing>({
    endpoint: `${LISTINGS}/${listing.id}`,
    method: "PUT",
    body: JSON.stringify({
      title: listing.title,
      description: listing.description,
      media: listing.media.map((item, index) => ({
        url: item.url,
        alt: `Listing image nr: ${index + 1}`,
      })),
    }),
  });
};
