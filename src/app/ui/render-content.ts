import Dashboard from "@/app/ui/features/Dashboard";
import Listings from "@/app/ui/features/Listings";
import SingleListing from "./features/single-listing";
import Account from "@/app/ui/features/account/Account";
import UserProfile from "@/app/ui/features/account/user-profile";
import Landing from "@/app/ui/features/landing";
import renderAuthForm from "./features/auth/render-auth-form";
import PageNotFound from "@/app/ui/utils/page-not-found";
import {
  getAuthenticatedUser,
  getCurrentUser,
} from "@/services/helpers/get-current-user";
import { getCurrentListing } from "@/services/helpers/get-current-listing";
import type { Profile } from "@/services/types/profile";
import type { Listing } from "@/services/types/listing";

const renderContent = async () => {
  const user = await getAuthenticatedUser();
  const username = user?.name || "";
  const seller = ((await getCurrentUser())?.profile as Profile) || null;
  const listingId = (await getCurrentListing())?.listingId || "";
  const listing = ((await getCurrentListing())?.listing as Listing) || null;
  const body = document.body;

  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = "";
  body.classList.remove("route-landing");

  const base = import.meta.env.BASE_URL || "/bits-auctions/";
  let relativePath = window.location.pathname;

  if (relativePath.startsWith(base)) {
    relativePath = relativePath.slice(base.length);
  } else if (relativePath === "/") {
    relativePath = "";
  } else {
    relativePath = relativePath.replace(/^\//, "");
  }

  //   switch (window.location.pathname) {
  //     case "/bits-auctions/":
  //       body.classList.add("route-landing");
  //       Landing();
  //       break;
  //     case "/bits-auctions/overview":
  //       Dashboard();
  //       break;
  //     case "/bits-auctions/listings":
  //       Listings();
  //       break;
  //     case `/bits-auctions/listings/${listingId}`:
  //       SingleListing(listing);
  //       break;
  //     case `/bits-auctions/account/${username}`:
  //       Account();
  //       break;
  //     case `/bits-auctions/profile/${seller?.name}`:
  //       UserProfile(seller);
  //       break;
  //     case "/bits-auctions/login":
  //       renderAuthForm(false);
  //       break;
  //     case "/bits-auctions/signup":
  //       renderAuthForm(true);
  //       break;
  //     case "/bits-auctions/404.html":
  //       PageNotFound();
  //       break;
  //     default:
  //       PageNotFound();
  //       break;
  //   }

  switch (true) {
    case relativePath === "":
      body.classList.add("route-landing");
      Landing();
      break;
    case relativePath === "overview":
      Dashboard();
      break;
    case relativePath === "listings":
      Listings();
      break;
    case relativePath.startsWith(`listings/${listingId}`):
      SingleListing(listing);
      break;
    case relativePath.startsWith(`account/${username}`):
      Account();
      break;
    case relativePath.startsWith(`profile/${seller?.name ?? ""}`):
      UserProfile(seller);
      break;
    case relativePath === "login":
      renderAuthForm(false);
      break;
    case relativePath === "signup":
      renderAuthForm(true);
      break;
    case relativePath === "404.html":
      PageNotFound();
      break;
    default:
      PageNotFound();
      break;
  }

  window.dispatchEvent(new Event("navItemChanged"));
};

export default renderContent;
