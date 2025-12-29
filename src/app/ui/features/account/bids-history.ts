import type { Profile } from "@/services/types/profile";
import type { Bid, Listing } from "@/services/types/listing";
import ListingTable from "@/app/components/listings/listing-table";
import { fetchSingleProfile } from "@/services/api/profiles/fetch/fetch-single-profile";
import { fetchBidsByProfile } from "@/services/api/profiles/fetch/fetch-profile-bids";

export const userBidsHistory = async (user: Profile) => {
  const container = document.createElement("div");
  const username = user.name || "";

  const grid = document.createElement("div");
  grid.className = "grid grid-cols-1 gap-6 mb-20";

  const userProfile = await fetchSingleProfile(username);
  const listedWins = userProfile.wins || [];

  if (listedWins.length === 0) {
    const noWins = document.createElement("div");
    noWins.className = "flex flex-col items-center justify-center mt-20";
    noWins.textContent = `You haven't won any bids, ${username}.`;
    grid.appendChild(noWins);
  } else {
    const winningsLabel = document.createElement("h3");
    winningsLabel.textContent = "Bids won";
    winningsLabel.className = "text-2xl font-semibold mt-6";
    grid.appendChild(winningsLabel);
    const list = await ListingTable(listedWins);
    grid.appendChild(list);
  }

  const activeBids = await fetchBidsByProfile(username);
  const listingsBidOn = activeBids.map((bid: Bid) => bid.listing);

  const sortByEndedAt = (a: Listing, b: Listing) => {
    const dateA = new Date(a.endsAt).getTime();
    const dateB = new Date(b.endsAt).getTime();
    return dateA - dateB;
  };
  listingsBidOn.sort(sortByEndedAt);

  const today = new Date();
  const activeBidsList = listingsBidOn.filter((listing: Listing) => {
    const listingEndsAt = new Date(listing.endsAt);
    return listingEndsAt > today;
  });

  let includeEnded = false;

  const seeEndedBids = document.createElement("button");
  seeEndedBids.type = "button";
  seeEndedBids.className =
    "w-fit text-md text-gray-400 cursor-pointer flex items-center gap-2";

  const seeEndedLabel = document.createElement("span");
  seeEndedLabel.className = "text-gray-100 hover:underline";
  const icon = document.createElement("i");
  icon.setAttribute("aria-hidden", "true");

  const updateToggleLabel = () => {
    seeEndedLabel.textContent = includeEnded
      ? "Exclude ended"
      : "Include ended";
    icon.className = includeEnded ? "fa-solid fa-minus" : "fa-solid fa-plus";
    icon.classList.add("text-gray-100");
  };

  seeEndedBids.append(icon, seeEndedLabel);
  updateToggleLabel();

  if (activeBids.length > 0) {
    const activeLabel = document.createElement("h3");
    activeLabel.textContent = "Active bids";
    activeLabel.className = "text-2xl font-semibold mt-6";
    grid.appendChild(activeLabel);
    grid.appendChild(seeEndedBids);
  } else {
    const noActiveBids = document.createElement("div");
    noActiveBids.className = "flex flex-col items-center justify-center mt-20";
    noActiveBids.textContent = `You have no active bids, ${username}.`;
    grid.appendChild(noActiveBids);
  }

  const bidsList = await ListingTable(activeBidsList);
  seeEndedBids.addEventListener("click", async () => {
    includeEnded = !includeEnded;
    const allBidsList = includeEnded ? listingsBidOn : activeBidsList;
    bidsList.innerHTML = "";
    bidsList.appendChild(await ListingTable(allBidsList));
    updateToggleLabel();
  });

  grid.appendChild(bidsList);
  container.appendChild(grid);

  return container;
};
