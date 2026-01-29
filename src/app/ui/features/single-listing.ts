import type { Listing } from "@/services/types/listing";
import { renderApp } from "@/services/helpers/render-app";
import { popUpModal } from "@/app/components/modals/modal";
import { getStatusBadge } from "@/app/components/listings/helpers/get-status-badge";
import { isAuthenticated } from "@/utils/config/constants";
import { submitUserBid } from "@/app/events/listing/submit-bid";
import { userMessage } from "@/app/ui/utils/user-messages";
import { loadKey } from "@/utils/storage/storage";
import { createBadge } from "@/app/components/listings/helpers/create-badge";
import { Carousel } from "@/app/components/carousel/images-carousel";
import { getAuthenticatedUser } from "@/services/helpers/get-current-user";
import { SingleListingSkeleton } from "@/app/components/skeletons/single-listing-skeleton";
import { fetchSingleListing } from "@/services/api/listings/fetch/fetch-single-listing";

const SingleListing = async (listing: Listing) => {
  const endsAt = new Date(listing.endsAt);
  const today = new Date();
  const isActive = endsAt > today;

  const listingTitle = listing.title || "Untitled listing";
  const listingDescription = listing.description || "No description";

  if (!listing.seller || !listing.seller.name) {
    try {
      const fullListing = await fetchSingleListing(listing.id);
      listing = fullListing;
    } catch (error) {
      throw new Error("Failed to fetch full listing data.", error as Error);
    }
  }

  const listingSellerName = listing.seller?.name;
  const listingSeller = listingSellerName;

  const listingBids = listing._count?.bids || 0;
  const bidAmounts = listing.bids?.map((bid) => bid.amount) || [];

  const authUser = await getAuthenticatedUser();
  const sellerIsAuthUser = listingSeller === authUser?.name;

  const container = document.getElementById("content");
  if (!container) return;

  container.innerHTML = "";

  if (!listing) {
    container.appendChild(SingleListingSkeleton());
    return;
  }

  const multipleMedia = listing.media.length > 1;
  if (multipleMedia) {
    const { root: carouselEl } = await Carousel({}, listing);
    container.appendChild(carouselEl);
  } else if (listing.media.length === 1) {
    const mediaImage = document.createElement("div");
    mediaImage.className = "media-carousel";
    const img = document.createElement("img");
    img.src = listing.media[0].url;
    img.alt = listing.title || "Listing image";
    img.className =
      "m-4 w-90 h-90 bg-gray-200 rounded-sm justify-self-center object-cover cursor-pointer";

    img.addEventListener("click", () => {
      popUpModal(listing.media[0].url);
    });

    mediaImage.appendChild(img);
    container.appendChild(mediaImage);
  }

  const detailsSection = document.createElement("div");
  detailsSection.className =
    "px-4 mb-6 flex flex-row flex-wrap items-start justify-between w-full md:w-[82%] justify-self-center";

  const textSection = document.createElement("div");
  textSection.className = "w-full md:w-[60%] mt-5 md:mt-0";

  const title = document.createElement("h1");
  title.className = "text-3xl font-bold mb-2";
  title.textContent = listingTitle || "Untitled listing";

  const description = document.createElement("p");
  description.className = "text-black dark:text-gray-200 text-md mb-4";
  description.textContent = listingDescription;

  const listingEndsAt = document.createElement("p");
  listingEndsAt.className = "text-sm text-gray-500 dark:text-gray-400 mb-2";
  listingEndsAt.textContent = `Bidding closes: ${endsAt.toLocaleDateString()}`;

  const seller = document.createElement("p");
  seller.className =
    "w-40 text-gray-600 dark:text-gray-300 text-sm mb-4 hover:underline hover:text-[var(--accent-strong)] cursor-pointer";
  seller.textContent = listingSeller;

  const actionCenter = document.createElement("div");
  actionCenter.className =
    "flex flex-row flex-wrap items-center justify-end gap-4";

  const status = document.createElement("p");
  status.className = "text-sm";
  status.appendChild(getStatusBadge(isActive ? "active" : "ended"));

  const bids = document.createElement("div");
  const bidsText = listingBids ? `${listingBids} bids` : "0 bids";
  const bidsBadge = createBadge(bidsText, "border-none");
  bids.appendChild(bidsBadge);

  const placeBidButton = document.createElement("button");
  placeBidButton.className = "btn btn-primary";
  placeBidButton.textContent = "Place Bid";

  const userCredits = loadKey("credits");
  const bidForm = document.createElement("div");
  bidForm.className = "flex flex-col gap-4";

  const highestBid =
    bidAmounts.find((amount) => amount === Math.max(...bidAmounts)) || 0;
  const highestBidLabel = document.createElement("label");
  highestBidLabel.className = "font-medium text-[var(--accent-strong)]";
  highestBidLabel.textContent = `Current highest bid: ${highestBid} credits`;

  const viewAllBidsSummary = document.createElement("summary");
  viewAllBidsSummary.textContent = "View all bids";
  viewAllBidsSummary.className = "font-medium";
  const viewAllBidsDetails = document.createElement("details");
  viewAllBidsDetails.textContent = "Credit amounts: " + bidAmounts.join(", ");
  viewAllBidsDetails.appendChild(viewAllBidsSummary);

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

  bidForm.appendChild(highestBidLabel);
  bidForm.appendChild(viewAllBidsDetails);
  bidForm.appendChild(bidLabel);
  bidForm.appendChild(bidInput);
  bidForm.appendChild(submitBid);

  const hr = document.createElement("hr");
  hr.className = "mb-4 mt-4 w-full border-gray-300";
  detailsSection.appendChild(hr);

  placeBidButton.addEventListener("click", () => {
    if (!userCredits || userCredits === "0") {
      userMessage("error", "You don't have any credits.", { duration: 10000 });
      return;
    } else {
      popUpModal("", bidForm);
    }
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
  textSection.appendChild(listingEndsAt);
  detailsSection.appendChild(textSection);

  actionCenter.appendChild(status);
  actionCenter.appendChild(bids);
  detailsSection.appendChild(actionCenter);

  if (isActive && isAuthenticated() && !sellerIsAuthUser) {
    actionCenter.appendChild(placeBidButton);
  }

  container.appendChild(detailsSection);
};
export default SingleListing;
