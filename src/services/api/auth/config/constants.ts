export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://v2.api.noroff.dev";
export const LISTINGS =
  import.meta.env.VITE_API_LISTINGS || "/auction/listings";
export const PER_PAGE = import.meta.env.VITE_LISTINGS_PER_PAGE;
export const LOGIN = import.meta.env.VITE_API_LOGIN || "/login";
export const REGISTER = import.meta.env.VITE_API_REGISTER || "/register";
export const USERS = import.meta.env.VITE_API_USERS || "/auction/profiles";
