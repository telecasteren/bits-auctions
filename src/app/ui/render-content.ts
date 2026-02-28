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
import { StyleGuide } from "./utils/style-guide";

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

  const base = "/";
  let relativePath = window.location.pathname;

  if (relativePath.startsWith(base)) {
    relativePath = relativePath.slice(base.length);
  }

  if (relativePath === "/") {
    relativePath = "";
  } else if (relativePath.startsWith("/")) {
    relativePath = relativePath.slice(1);
  }

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
      if (listing) {
        SingleListing(listing);
      } else {
        PageNotFound();
      }
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
    case relativePath === "style-guide.html":
      StyleGuide();
      break;
    default:
      PageNotFound();
      break;
  }

  window.dispatchEvent(new Event("navItemChanged"));
};

export default renderContent;
