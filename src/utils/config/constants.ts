import { loadKey } from "@/utils/storage/storage";
import { isDark } from "@/utils/config/theme";

// AUTH
export const isAuthenticated = loadKey("token") !== null;

// BRAND
export const brandShortName = "Bits";
export const brandFullName = "Bits AuctiOns";
export const brandLogoImg = isDark
  ? "/assets/house-logo-dark.png"
  : "/assets/house-logo-light.png";
