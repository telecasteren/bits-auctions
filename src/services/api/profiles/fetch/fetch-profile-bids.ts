import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { USERS } from "@/services/api/shared/endpoints";
import type { Bid } from "@/services/types/listing";

export const fetchBidsByProfile = async (username: string) => {
  const { data } = await withApiHelper<Bid[]>({
    endpoint: `${USERS}/${username}/bids?_listings=true`,
  });
  return data;
};
