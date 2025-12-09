import { getStatusBadge } from "./helpers/get-status-badge";
import renderContent from "@/app/ui/render-content";
import { getCurrentUser } from "@/services/helpers/get-current-user";
import type { Profile } from "@/services/types/profile";
import type { Listing } from "@/services/types/listing";

const ListingCards = (listings: Listing[]) => {
  const container = document.createElement("div");
  container.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl w-full";

  listings.forEach(async (listing) => {
    const listingsSeller = listing.seller;
    const listingSellerName = listingsSeller?.name || "Unknown seller";
    const sellerObject = ((await getCurrentUser())?.profile as Profile) || null;
    const sellerName = sellerObject?.name || listingSellerName;
    const endingDate = new Date(listing.endsAt).toLocaleDateString();
    const listingTitle = listing.title || "Untitled listing";
    const listingDescription = listing.description || "No description";
    const listingBidsCount =
      listing._count.bids > 0 ? listing._count.bids : "No bids yet";

    const card = document.createElement("div");
    card.className = `relative group rounded-lg border bg-card p-4 shadow-sm hover:shadow-lg transition-shadow
    cursor-pointer overflow-hidden cursor-pointer hover:scale-102 transition-transform`;

    const overlay = document.createElement("div");
    overlay.className =
      "absolute inset-0 pointer-events-none bg-[#1e293b0f] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg";
    card.appendChild(overlay);

    const title = document.createElement("h3");
    title.className = "mb-2 text-lg font-semibold";
    title.textContent = listingTitle;
    card.appendChild(title);

    const image = document.createElement("img");
    image.className = "mb-2 rounded max-w-40 justify-self-center";
    image.src = listing.media.length > 0 ? listing.media[0].url : "";
    image.alt = listingTitle || "Listing image";
    card.appendChild(image);

    const statsWrapper = document.createElement("div");
    statsWrapper.className = "flex flex-col gap-1 mb-4";
    card.appendChild(statsWrapper);

    const bids = document.createElement("p");
    bids.className = "mb-2 text-sm font-medium";
    bids.textContent = `Bids: ${listingBidsCount}`;
    statsWrapper.appendChild(bids);

    const status = document.createElement("div");
    status.appendChild(
      getStatusBadge(listing.endsAt > new Date() ? "active" : "ended"),
    );
    statsWrapper.appendChild(status);

    const endsAt = document.createElement("div");
    endsAt.className = "text-sm italic";
    endsAt.textContent = `Last call: ${endingDate}`;

    const seller = document.createElement("p");
    seller.className = "mb-2 text-sm";
    seller.innerHTML = `<span style="font-weight: bold;">Seller:</span> ${sellerName}`;
    card.appendChild(seller);

    seller.addEventListener("click", () => {
      window.location.pathname = `/bits-auctions/profile/${sellerName}`;
      renderContent();
    });

    image.addEventListener("click", async () => {
      window.location.pathname = `/bits-auctions/listings/${listing.id}`;
      renderContent();
    });

    const description = document.createElement("p");
    description.className = "text-sm text-muted-foreground";
    description.textContent = listingDescription;
    card.appendChild(description);
    card.appendChild(endsAt);

    container.appendChild(card);
  });

  return container;
};

export default ListingCards;
