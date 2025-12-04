import { getStatusBadge } from "./helpers/get-status-badge";
import { fetchAllListings } from "@/services/api/listings/fetch/fetch-all-listings";
import type { Listing } from "@/services/types/listing";

const ListingCards = async () => {
  const container = document.createElement("div");
  container.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl w-full";

  const response = await fetchAllListings(100, 1);
  const listings = response.data as Listing[];

  listings.forEach((listing) => {
    const card = document.createElement("div");
    card.className =
      "relative group rounded-lg border bg-card p-4 shadow-sm hover:shadow-lg transition-shadow cursor-pointer overflow-hidden";

    const overlay = document.createElement("div");
    overlay.className =
      "absolute inset-0 pointer-events-none bg-[#1e293b0f] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg";
    card.appendChild(overlay);

    const title = document.createElement("h3");
    title.className = "mb-2 text-lg font-semibold";
    title.textContent = listing.title;
    card.appendChild(title);

    const image = document.createElement("img");
    image.className = "mb-2 rounded max-w-40 justify-self-center";
    image.src = listing.media.length > 0 ? listing.media[0].url : "";
    image.alt = listing.title || "Listing image";
    card.appendChild(image);

    const statsWrapper = document.createElement("div");
    statsWrapper.className = "flex flex-col gap-1 mb-4";
    card.appendChild(statsWrapper);

    const bids = document.createElement("p");
    bids.className = "mb-2 text-sm font-medium";
    bids.textContent = `Bids: ${listing._count.bids > 0 ? listing._count.bids : "No bids yet"}`;
    statsWrapper.appendChild(bids);

    const status = document.createElement("div");
    status.appendChild(
      getStatusBadge(listing.endsAt > new Date() ? "active" : "ended")
    );
    statsWrapper.appendChild(status);

    const endsAt = document.createElement("div");
    endsAt.className = "text-sm italic";
    endsAt.textContent = `Last call: ${new Date(listing.endsAt).toLocaleDateString()}`;

    const description = document.createElement("p");
    description.className = "text-sm text-muted-foreground";
    description.textContent = listing.description;
    card.appendChild(description);
    card.appendChild(endsAt);

    container.appendChild(card);
  });

  return container;
};

export default ListingCards;
