import type { Profile } from "@/services/types/profile";
import ListingTable from "@/app/components/listings/listing-table";
import EmptyListing from "@/app/components/listings/empty-listing";
import { fetchListingsByProfile } from "@/services/api/listings/fetch/fetch-profile-listings";
import { createListingBtn } from "@/app/components/dialogue-btn";

const AccountListings = async (user: Profile) => {
  const container = document.createElement("div");
  const username = user.name || "";

  const accountGrid = document.createElement("div");
  accountGrid.className = "grid grid-cols-1 gap-6 mb-20";

  const listings = await fetchListingsByProfile(username);

  if (listings.length === 0) {
    const noListings = EmptyListing();
    accountGrid.appendChild(noListings);
  } else {
    const listingsList = await ListingTable(listings);
    const newListing = await createListingBtn();
    newListing.classList.add("justify-self-end");

    accountGrid.appendChild(listingsList);
    accountGrid.appendChild(newListing);
  }

  container.appendChild(accountGrid);

  return container;
};

export default AccountListings;
