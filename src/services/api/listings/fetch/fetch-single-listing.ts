import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";
import type { Listing } from "@/services/types/listing";

export const fetchSingleListing = async (listingId: string) => {
  try {
    const { data } = await withApiHelper<Listing>({
      endpoint: `${LISTINGS}/${listingId}?_seller=true&_bids=true`,
    });
    return data;
  } catch (error) {
    throw new Error("Fetching single listing failed.", { cause: error });
  }
};
