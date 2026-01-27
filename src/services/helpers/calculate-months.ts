import { MONTHS } from "@/utils/config/constants";

export const currentYear = () => {
  const year = new Date().getFullYear();
  return year;
};

export const currentMonths = () => {
  const monthNames = MONTHS;

  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const monthsSoFar = monthNames.slice(0, currentMonthIndex + 1);

  return {
    months: monthsSoFar,
    length: monthsSoFar.length,
    range: `${monthsSoFar[0]} - ${monthsSoFar[monthsSoFar.length - 1]}`,
  };
};
