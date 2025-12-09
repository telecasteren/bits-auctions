import { loadKey } from "@/utils/storage/storage";
import { isDark } from "@/utils/config/theme";
import logoLight from "@/assets/logo/house-logo-light.png";
import logoDark from "@/assets/logo/house-logo-dark.png";

// AUTH
export const isAuthenticated = loadKey("token") !== null;

// BRAND
export const brandShortName = "Bits";
export const brandFullName = "Bits AuctiOns";
export const brandLogoImg = isDark ? logoDark : logoLight;

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
