import type { Listing } from "@/services/types/listing";
import type { Profile } from "@/services/types/profile";
import { renderApp } from "@/services/helpers/render-app";
import { popUpModal } from "@/app/components/modal/modal";
import { getStatusBadge } from "@/app/components/listings/helpers/get-status-badge";
import { isAuthenticated } from "@/utils/config/constants";
import { submitUserBid } from "@/app/events/listing/submit-bid";
import { clearUserMessage, userMessage } from "@/app/ui/utils/user-messages";
import { loadKey } from "@/utils/storage/storage";

const SingleListing = async (listing: Listing) => {
  const endsAt = new Date(listing.endsAt);
  const today = new Date();
  const isActive = endsAt > today;

  const listingTitle = listing.title || "Untitled listing";
  const listingDescription = listing.description || "No description";
  const listingSeller = (listing.seller as Profile)?.name || "Unknown seller";

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
    img.setAttribute("id", `media-${listingTitle}`);
    img.src = media.url;
    img.alt = listingTitle;
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
  title.textContent = listingTitle || "Untitled listing";

  const description = document.createElement("p");
  description.className = "text-black dark:text-gray-200 text-md mb-4";
  description.textContent = listingDescription;

  const seller = document.createElement("p");
  seller.className =
    "w-40 text-gray-600 dark:text-gray-300 text-sm mb-4 hover:underline hover:text-[var(--accent-strong)] cursor-pointer";
  seller.textContent = listingSeller;

  const actionCenter = document.createElement("div");
  actionCenter.className = "flex flex-row items-center justify-end gap-4";

  const status = document.createElement("p");
  status.className = "text-sm";
  status.appendChild(getStatusBadge(isActive ? "active" : "ended"));

  const bids = document.createElement("p");
  bids.className = "text-sm";
  bids.innerHTML = listing._count.bids
    ? `${listing._count.bids} bids`
    : "0 bids";

  const placeBidButton = document.createElement("button");
  placeBidButton.className = "btn btn-primary";
  placeBidButton.textContent = "Place Bid";

  if (isActive && isAuthenticated) {
    actionCenter.appendChild(placeBidButton);
  }

  const userCredits = loadKey("credits");
  const bidForm = document.createElement("div");
  bidForm.className = "flex flex-col gap-4";

  const bidLabel = document.createElement("label");
  bidLabel.textContent = `You have ${userCredits} credits available.`;

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.placeholder = "Enter credit amount";
  bidInput.className =
    "input input-bordered border border-[var(--accent-strong)] p-2 rounded w-full";

  const submitBid = document.createElement("button");
  submitBid.className = "btn btn-primary";
  submitBid.textContent = "Submit your bid";

  bidForm.appendChild(bidLabel);
  bidForm.appendChild(bidInput);
  bidForm.appendChild(submitBid);

  placeBidButton.addEventListener("click", () => {
    if (!userCredits || userCredits === "0") {
      userMessage("error", "You don't have any credits.");
      return;
    } else {
      popUpModal("", bidForm);
    }
    setTimeout(() => {
      clearUserMessage();
    }, 4000);
  });

  submitBid.addEventListener("click", async () => {
    const bidAmount = Number(bidInput.value);
    const listingId = listing.id;

    await submitUserBid(bidAmount, listingId);
  });

  seller.addEventListener("click", () => {
    history.pushState({}, "", `/bits-auctions/profile/${listingSeller}`);
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
