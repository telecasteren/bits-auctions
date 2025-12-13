import type { Listing } from "@/services/types/listing";
import type { Profile } from "@/services/types/profile";
import { renderApp } from "@/services/helpers/render-app";
import { popUpModal } from "@/app/components/modal/modal";
import { getStatusBadge } from "@/app/components/listings/helpers/get-status-badge";
import { userMessage } from "@/app/ui/utils/user-messages";
import { isAuthenticated } from "@/utils/config/constants";

const SingleListing = async (listing: Listing) => {
  const container = document.getElementById("content");
  if (!container) return;

  container.innerHTML = "";

  const mediaCarousel = document.createElement("div");
  mediaCarousel.className =
    "w-full h-68 md:h-96 bg-gray-200 mb-6 flex gap-2 rounded-md overflow-hidden flex items-center justify-center";

  const mediaImages = document.createElement("div");
  mediaImages.className = "flex flex-row gap-4 overflow-x-auto py-2";

  listing.media.forEach((media) => {
    const img = document.createElement("img");
    img.setAttribute("id", `media-${listing.title}`);
    img.src = media.url;
    img.alt = listing.title || "Listing image";
    img.className =
      "flex-shrink-0 flex items-center justify-center w-58 h-58 md:w-80 md:h-80 rounded-sm object-cover cursor-pointer";
    mediaImages.appendChild(img);

    img.addEventListener("click", () => {
      popUpModal(media.url);
    });
  });

  const detailsSection = document.createElement("div");
  detailsSection.className =
    "px-4 mb-6 flex flex-row items-start justify-between w-full";

  const textSection = document.createElement("div");
  textSection.className = "w-[60%]";

  const title = document.createElement("h1");
  title.className = "text-3xl font-bold mb-2";
  title.textContent = listing.title || "Untitled listing";

  const description = document.createElement("p");
  description.className = "text-black dark:text-gray-200 text-md mb-4";
  description.textContent = listing.description || "No description";

  const seller = document.createElement("p");
  seller.className =
    "w-40 text-gray-600 dark:text-gray-300 text-sm mb-4 hover:underline hover:text-[var(--accent-strong)] cursor-pointer";
  seller.textContent = (listing.seller as Profile)?.name || "Unknown seller";

  const actionCenter = document.createElement("div");
  actionCenter.className = "flex flex-row items-center justify-end gap-4";

  const status = document.createElement("p");
  status.className = "text-sm";
  status.appendChild(
    getStatusBadge(listing.endsAt > new Date() ? "active" : "ended"),
  );

  const bids = document.createElement("p");
  bids.className = "text-sm";
  bids.innerHTML = listing._count.bids
    ? `${listing._count.bids} bids`
    : "0 bids";

  const placeBidButton = document.createElement("button");
  placeBidButton.className = "btn btn-primary";
  placeBidButton.textContent = "Place Bid";

  if (new Date(listing.endsAt) > new Date() && isAuthenticated) {
    actionCenter.appendChild(placeBidButton);
  }

  let usedCredits; // profile.credits - bid amount = creditsLeft
  placeBidButton.addEventListener("click", () => {
    // implement bidding logic --> set actual amount, e.g. 200 credits
    // + confirmation on bid placed
    userMessage(
      "success",
      `You placed a bid of ${usedCredits || "200 credits"}!`,
    );
  });

  seller.addEventListener("click", () => {
    history.pushState({}, "", `/bits-auctions/profile/${listing.seller.name}`);
    renderApp();
  });

  textSection.appendChild(title);
  textSection.appendChild(description);
  textSection.appendChild(seller);
  detailsSection.appendChild(textSection);

  actionCenter.appendChild(status);
  actionCenter.appendChild(bids);
  detailsSection.appendChild(actionCenter);

  mediaCarousel.appendChild(mediaImages);
  container.appendChild(mediaCarousel);
  container.appendChild(detailsSection);
};
export default SingleListing;
