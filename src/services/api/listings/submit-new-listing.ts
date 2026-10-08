import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";
import type { Listing } from "@/services/types/listing";

export const submitNewListing = async (listingData: Listing) => {
  return await withApiHelper<Listing>({
    endpoint: `${LISTINGS}?_seller=true`,
    method: "POST",
    body: JSON.stringify(listingData),
  });
};
