import { USERS } from "@/services/api/shared/endpoints";
import { withApiHelper } from "@/services/api/shared/withApiHelper";
import type { Listing } from "@/services/types/listing";

export const fetchListingsByProfile = async (username: string) => {
  try {
    const { data } = await withApiHelper<Listing[]>({
      endpoint: `${USERS}/${username}/listings`,
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch listings", { cause: error });
  }
};
