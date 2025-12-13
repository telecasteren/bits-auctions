import { renderApp } from "@/services/helpers/render-app";
import { fetchAllListings } from "@/services/api/listings/fetch/fetch-all-listings";
import type { Listing } from "@/services/types/listing";

const Carousel = async () => {
  const container = document.createElement("div");

  const carousel = document.createElement("div");
  carousel.id = "carousel-placeholder";
  carousel.className =
    "mt-20 w-full border-t border-b border-t-12 border-b-12 border-[var(--selector-background)] rounded-sm";

  const carouselImgs = document.createElement("div");
  carouselImgs.className = "flex flex-row gap-4 overflow-x-auto py-2";

  const text = document.createElement("p");
  text.textContent = "See all listings";
  text.className =
    "flex justify-self-end justify-end w-40 py-2 text-md font-semibold text-black dark:text-white hover:underline cursor-pointer";

  text.addEventListener("click", async () => {
    history.pushState({}, "", "/bits-auctions/listings");
    renderApp();
  });

  const response = await fetchAllListings(10, 1);
  const listings = response.data as Listing[];

  listings.forEach((listing) => {
    const img = document.createElement("img");
    img.src = listing.media.length > 0 ? listing.media[0].url : "";
    img.alt = listing.title || "Listing image";
    img.className =
      "flex-shrink-0 flex items-center justify-center w-58 h-58 bg-gray-200 rounded-sm object-cover cursor-pointer hover:scale-102 transition-transform";
    carouselImgs.appendChild(img);

    img.addEventListener("click", async () => {
      history.pushState({}, "", `/bits-auctions/listings/${listing.id}`);
      renderApp();
    });
  });

  carousel.appendChild(carouselImgs);
  container.appendChild(carousel);
  container.appendChild(text);

  return container;
};
export default Carousel;
