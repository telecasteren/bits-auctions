import type { Profile } from "@/services/types/profile";
import ListingTable from "@/app/components/listings/listing-table";
import EmptyListing from "@/app/components/listings/empty-listing";
import { fetchListingsByProfile } from "@/services/api/listings/fetch/fetch-profile-listings";

const AccountListings = async (user: Profile) => {
  const container = document.createElement("div");
  const username = user.name || "";

  const accountGrid = document.createElement("div");
  accountGrid.className = "grid grid-cols-1 gap-6 mt-20 mb-20";

  const table = ListingTable();

  const listings = await fetchListingsByProfile(username);
  const totalListings = listings.length || 0;

  if (totalListings < 1) {
    const noListings = EmptyListing();
    accountGrid.appendChild(noListings);
  } else if (totalListings > 0) {
    accountGrid.appendChild(table);
  }

  container.appendChild(accountGrid);

  return container;
};

export default AccountListings;
