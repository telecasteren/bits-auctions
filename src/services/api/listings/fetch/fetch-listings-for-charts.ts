import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";
import type { Listing } from "@/services/types/listing";

export const fetchListingsForCharts = async () => {
  const { data } = await withApiHelper<Listing[]>({
    endpoint: `${LISTINGS}?_seller=true&_bids=true`,
  });
  return data;
};
