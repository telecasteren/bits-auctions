import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";
import type { Listing } from "@/services/types/listing";

export const fetchAllListings = async (
  limit: number = 10,
  page: number = 1,
) => {
  try {
    const { data } = await withApiHelper<Listing[]>({
      endpoint: `${LISTINGS}?_seller=true&_bids=true&limit=${limit}&page=${page}&sort=created&sortOrder=desc`,
    });
    return data;
  } catch (error) {
    throw new Error(`Fetching listings failed.`, { cause: error });
  }
};
