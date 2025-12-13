import { getBidsPerMonth } from "@/app/components/charts/get-monthly-bids";
import type { ChartItems } from "@/app/components/charts/types";

export type Trend = {
  percentage: number;
  direction: "up" | "down" | "stable";
  previous: number;
  current: number;
  text: string;
};

export const percentageChange = (previous: number, current: number): Trend => {
  if (previous === 0 && current === 0) {
    return {
      percentage: 0,
      direction: "stable",
      previous,
      current,
      text: "Stable trends from last month.",
    };
  }

  if (previous === 0 && current > 0) {
    return {
      percentage: 100,
      direction: "up",
      previous,
      current,
      text: "Trending up by 100% this month.",
    };
  }

  const change = current - previous;
  const percentage = (change / previous) * 100;
  const roundedPercentage = Math.round(percentage * 10) / 10;

  if (percentage > 0) {
    return {
      percentage: roundedPercentage,
      direction: "up",
      previous,
      current,
      text: `Trending up by ${roundedPercentage}% this month.`,
    };
  }

  if (percentage < 0) {
    return {
      percentage: roundedPercentage,
      direction: "down",
      previous,
      current,
      text: `Trending down by ${roundedPercentage}% this month.`,
    };
  }

  return {
    percentage: 0,
    direction: "stable",
    previous,
    current,
    text: "Stable trends from last month.",
  };
};

export const getMonthlyTrends = async (): Promise<Trend> => {
  const data: ChartItems[] = await getBidsPerMonth();

  if (!data || data.length < 2) {
    return {
      percentage: 0,
      direction: "stable",
      previous: 0,
      current: 0,
      text: "",
    };
  }

  const previousMonthsData = data[data.length - 2]?.desktop ?? 0;
  const currentMonthsData = data[data.length - 1]?.desktop ?? 0;

  return percentageChange(previousMonthsData, currentMonthsData);
};

// helper for later finding trends between specified monthts
export const getTrendsBetweenMonths = async (
  previousIndex: number,
  currentIndex: number,
): Promise<Trend> => {
  const data: ChartItems[] = await getBidsPerMonth();
  const previous = data[previousIndex]?.desktop ?? 0;
  const current = data[currentIndex]?.desktop ?? 0;

  return percentageChange(previous, current);
};
