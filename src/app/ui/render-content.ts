import Dashboard from "@/app/ui/features/Dashboard";
import Listings from "@/app/ui/features/Listings";
import SingleListing from "./features/single-listing";
import Account from "@/app/ui/features/account/Account";
import UserProfile from "@/app/ui/features/account/user-profile";
import Landing from "@/app/ui/features/landing";
import renderAuthForm from "./features/auth/render-auth-form";
import PageNotFound from "@/app/ui/utils/page-not-found";
import { loadKey } from "@/utils/storage/storage";
import { getCurrentUser } from "@/services/helpers/get-current-user";
import { getCurrentListing } from "@/services/helpers/get-current-listing";
import type { Profile } from "@/services/types/profile";
import type { Listing } from "@/services/types/listing";

const renderContent = async () => {
  const user = (loadKey("user") as Profile) || "";
  const username = user.name || "";
  const seller = ((await getCurrentUser())?.profile as Profile) || null;
  const listingId = (await getCurrentListing())?.listingId || "";
  const listing = ((await getCurrentListing())?.listing as Listing) || null;

  const content = document.querySelector<HTMLElement>("#content");
  if (!content) return;

  content.innerHTML = "";

  switch (window.location.pathname) {
    case "/bits-auctions/":
      Landing();
      break;
    case "/bits-auctions/overview":
      Dashboard();
      break;
    case "/bits-auctions/listings":
      Listings();
      break;
    case `/bits-auctions/listings/${listingId}`:
      SingleListing(listing);
      break;
    case `/bits-auctions/account/${username}`:
      Account();
      break;
    case `/bits-auctions/profile/${seller?.name}`:
      UserProfile(seller);
      break;
    case "/bits-auctions/login":
      renderAuthForm(false);
      break;
    case "/bits-auctions/signup":
      renderAuthForm(true);
      break;
    case "/bits-auctions/404.html":
      PageNotFound();
      break;
    default:
      break;
  }
};

export default renderContent;
