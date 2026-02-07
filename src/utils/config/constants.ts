import { loadKey } from "@/utils/storage/storage";
import { isDark } from "@/utils/config/theme";
import logoLight from "@/assets/logo/house-logo-light.png";
import logoDark from "@/assets/logo/house-logo-dark.png";

// AUTH
export const isAuthenticated = () => loadKey("token") !== null;

// TESTS
export const mockedEnv = {
  TEST_SIGNUP_PASSWORD: "TestPass123!",
  TEST_USER_EMAIL: "tele@stud.noroff.no",
  TEST_USER_PASSWORD: "pppppppp",
};

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
