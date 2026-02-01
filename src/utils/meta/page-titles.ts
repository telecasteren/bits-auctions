import { brandFullName } from "../config/constants";
import { getCurrentListing } from "@/services/helpers/get-current-listing";
import { getCurrentUser } from "@/services/helpers/get-current-user";

export const setPageTitle = async () => {
  const base = "/bits-auctions/";
  let relativePath = window.location.pathname;

  if (relativePath.startsWith(base)) {
    relativePath = relativePath.slice(base.length);
  }

  if (relativePath === "/") {
    relativePath = "";
  } else if (relativePath.startsWith("/")) {
    relativePath = relativePath.slice(1);
  }

  if (relativePath === "") {
    document.title = `Home | ${brandFullName}`;
  } else if (relativePath.startsWith("login")) {
    document.title = `Login | ${brandFullName}`;
  } else if (relativePath.startsWith("signup")) {
    document.title = `Signup | ${brandFullName}`;
  } else if (relativePath.startsWith("overview")) {
    document.title = `Overview | ${brandFullName}`;
  } else if (relativePath.startsWith(`listings/`)) {
    const currentListing = (await getCurrentListing())?.listing;
    const title = currentListing?.title || "Listing";
    document.title = `${title} | ${brandFullName}`;
  } else if (relativePath.startsWith("listings")) {
    document.title = `Listings | ${brandFullName}`;
  } else if (relativePath.startsWith("profile")) {
    const currentUser = await getCurrentUser();
    const username = currentUser?.profile?.name;
    document.title = `${username} | ${brandFullName}`;
  } else if (relativePath.startsWith("account")) {
    const currentUser = await getCurrentUser();
    const username = currentUser?.profile?.name;
    document.title = `${username} | ${brandFullName}`;
  } else {
    document.title = `Bits Auctions | ${brandFullName}`;
  }
};
