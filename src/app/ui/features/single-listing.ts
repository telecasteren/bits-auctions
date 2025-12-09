import type { Listing } from "@/services/types/listing";
import type { Profile } from "@/services/types/profile";
import renderContent from "../render-content";
import { popUpModal } from "@/app/components/modal/modal";

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
      "flex-shrink-0 flex items-center justify-center w-58 h-58 md:w-80 md:h-80 rounded-sm object-cover";
    mediaImages.appendChild(img);

    img.addEventListener("click", () => {
      popUpModal(media.url);
    });
  });

  const detailsSection = document.createElement("div");
  detailsSection.className = "px-4";

  const title = document.createElement("h1");
  title.className = "text-3xl font-bold mb-2";
  title.textContent = listing.title || "Untitled listing";

  const description = document.createElement("p");
  description.className = "text-gray-200 text-md mb-4";
  description.textContent = listing.description || "No description";

  const seller = document.createElement("p");
  seller.className =
    "w-40 text-gray-400 text-sm mb-4 hover:underline hover:text[var(--accent-strong)] cursor-pointer";
  seller.textContent = (listing.seller as Profile)?.name || "Unknown seller";

  seller.addEventListener("click", () => {
    window.location.pathname = `/bits-auctions/profile/${listing.seller.name}`;
    renderContent();
  });

  detailsSection.appendChild(title);
  detailsSection.appendChild(description);
  detailsSection.appendChild(seller);

  mediaCarousel.appendChild(mediaImages);
  container.appendChild(mediaCarousel);
  container.appendChild(detailsSection);
};
export default SingleListing;
