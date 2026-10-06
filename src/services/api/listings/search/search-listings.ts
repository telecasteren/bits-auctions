import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";
import type { Listing } from "@/services/types/listing";

export const searchListings = async (query: string) => {
  try {
    const q = encodeURIComponent(query);
    const { data } = await withApiHelper<Listing[]>({
      endpoint: `${LISTINGS}/search?q=${q}&_seller=true&_bids=true`,
    });
    return data;
  } catch (error) {
    throw new Error("Deleting bio failed.", { cause: error });
  }
};
