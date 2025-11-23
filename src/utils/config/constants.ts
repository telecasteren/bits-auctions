import { loadKey } from "@/utils/storage/storage";

// AUTH
export const isAuthenticated = loadKey("token") !== null;

// BRAND
export const brandName = "Bits";
