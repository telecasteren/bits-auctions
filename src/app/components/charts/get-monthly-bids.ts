import { fetchListingsForCharts } from "@/services/api/listings/fetch/fetch-listings-for-charts";
import { MONTHS } from "@/utils/config/constants";
import type { Listing, Bid } from "@/services/types/listing";
import type {
  MonthIndex,
  ChartItems,
  BidsOptions,
} from "@/app/components/charts/types";

export const getBidsPerMonth = async (
  options: BidsOptions = {}
): Promise<ChartItems[]> => {
  const { onlyCurrentUser = false, currentUserName } = options;

  const response = await fetchListingsForCharts();
  const listings: Listing[] = response.data;

  const monthCounts: Record<MonthIndex, number> = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
  };

  for (const listing of listings) {
    const bids: Bid[] = listing?.bids ?? [];

    for (const bid of bids) {
      if (onlyCurrentUser) {
        if (!currentUserName) continue;
        if (bid.bidder.name !== currentUserName) continue;
      }

      const bidDate = new Date(bid.created);
      const month = bidDate.getMonth() as MonthIndex;

      const year = bidDate.getFullYear();
      const currentYear = new Date().getFullYear();
      if (year !== currentYear) continue;

      monthCounts[month] += 1;
    }
  }

  const chartData: ChartItems[] = MONTHS.map((month, index) => ({
    month: month,
    desktop: monthCounts[index as MonthIndex] ?? 0,
  }));

  return chartData;
};
