import { fetchAllListings } from "@/services/api/listings/fetch/fetch-all-listings";
import { renderApp } from "@/services/helpers/render-app";
import type { Listing } from "@/services/types/listing";
import { carouselEvents } from "@/app/components/carousel/carousel-events";
import { carouselPlayback } from "@/app/components/carousel/carousel-playback";
import type { Options, ImageItem } from "@/app/components/carousel/types";
import { popUpModal } from "@/app/components/modals/modal";

export const Carousel = async (options: Options = {}, listing?: Listing) => {
  let images: ImageItem[] = [];

  if (listing) {
    const title = listing.title || "Listing image";
    images = (listing.media ?? [])
      .map((media, index) => ({
        src: media.url,
        alt: `${title} - Image ${index + 1}`,
        listingId: listing.id,
      }))
      .filter((img) => img.src);
  } else {
    const response = await fetchAllListings(9, 1);
    const listings = response.data as Listing[];
    images = listings
      .map((item) => ({
        src: item.media.length > 0 ? item.media[0].url : "",
        alt: item.title || "Listing image",
        listingId: item.id,
      }))
      .filter((img) => img.src);
  }

  const id = options.id ?? "default-carousel";
  const startImageIndex = Math.min(
    Math.max(options.startImageIndex ?? 0, 0),
    Math.max(images.length - 1, 0)
  );

  const root = document.createElement("div");
  root.id = id;
  root.className = "relative w-full";
  root.setAttribute("data-carousel", "slide");

  const wrapper = document.createElement("div");
  wrapper.className =
    "relative h-56 overflow-hidden rounded-lg md:h-96 bg-gray-100 dark:bg-gray-900";
  root.appendChild(wrapper);

  images.forEach((img, index) => {
    const item = document.createElement("div");
    item.className =
      "absolute inset-0 mt-4 mb-4 transition-all duration-700 ease-in-out will-change-transform";
    item.setAttribute("data-carousel-item", "");

    const image = document.createElement("img");
    image.src = img.src;
    image.alt = img.alt ?? `Slide ${index + 1}`;
    image.className =
      "absolute inset-0 block w-full h-full object-contain rounded cursor-pointer";

    if (!listing) {
      image.addEventListener("click", async () => {
        window.history.pushState(
          {},
          "",
          `/bits-auctions/listings/${images[index].listingId}`
        );
        renderApp();
      });
    } else {
      image.addEventListener("click", async () => {
        images.forEach((img) => {
          popUpModal(img.src);
        });
      });
    }

    item.appendChild(image);
    wrapper.appendChild(item);
    return item;
  });

  const indicators = document.createElement("div");
  indicators.className =
    "absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse";
  root.appendChild(indicators);

  const SVG_URL = "http://www.w3.org/2000/svg";
  const chevronSvg = (direction: "left" | "right") => {
    const svg = document.createElementNS(SVG_URL, "svg");
    svg.setAttribute("class", "w-5 h-5 dark:text-white rtl:rotate-180");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("xmlns", SVG_URL);
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("viewBox", "0 0 24 24");

    const path = document.createElementNS(SVG_URL, "path");
    path.setAttribute("stroke", "currentColor");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");
    path.setAttribute("stroke-width", "2");
    path.setAttribute(
      "d",
      direction === "left" ? "m15 19-7-7 7-7" : "m9 5 7 7-7 7"
    );
    svg.appendChild(path);
    return svg;
  };

  const previousBtn = document.createElement("button");
  previousBtn.type = "button";
  previousBtn.className =
    "absolute top-0 start-0 z-30 flex items-center justify-center h-[90%] px-4 cursor-pointer group focus:outline-none";
  previousBtn.setAttribute("data-carousel-prev", "");

  const previousSpan = document.createElement("span");
  previousSpan.className =
    "inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none";
  previousSpan.appendChild(chevronSvg("left"));
  const previousSr = document.createElement("span");
  previousSr.className = "sr-only";
  previousSr.textContent = "Previous";
  previousSpan.appendChild(previousSr);
  previousBtn.appendChild(previousSpan);
  root.appendChild(previousBtn);

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className =
    "absolute top-0 end-0 z-30 flex items-center justify-center h-[90%] px-4 cursor-pointer group focus:outline-none";
  nextBtn.setAttribute("data-carousel-next", "");

  const nextSpan = document.createElement("span");
  nextSpan.className =
    "inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none";
  nextSpan.appendChild(chevronSvg("right"));
  const nextSr = document.createElement("span");
  nextSr.className = "sr-only";
  nextSr.textContent = "Next";
  nextSpan.appendChild(nextSr);
  nextBtn.appendChild(nextSpan);
  root.appendChild(nextBtn);

  images.forEach((_, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `w-3 h-3 rounded-full z-10 bg-black/40 dark:bg-gray-600/40 transition
    aria-[current=true]:bg-black dark:aria-[current=true]:bg-white aria-[current=true]:scale-110`;
    btn.setAttribute("aria-label", `Slide ${index + 1}`);
    btn.setAttribute("data-carousel-slide-to", String(index));
    btn.setAttribute(
      "aria-current",
      index === startImageIndex ? "true" : "false"
    );
    indicators.appendChild(btn);
    return btn;
  });

  const text = document.createElement("p");
  text.textContent = "See all listings";
  text.className =
    "flex justify-self-end justify-end w-full py-2 text-md font-semibold text-black dark:text-white hover:underline cursor-pointer";

  if (!listing) root.appendChild(text);

  text.addEventListener("click", async () => {
    history.pushState({}, "", "/bits-auctions/listings");
    renderApp();
  });

  const wireEvents = carouselEvents(root);
  if (wireEvents) {
    carouselPlayback(
      root,
      wireEvents.state,
      wireEvents.setActive,
      wireEvents.slides,
      wireEvents.previousBtn,
      wireEvents.nextBtn,
      wireEvents.indicatorButtons,
      wireEvents.startImageIndex,
      !listing
    );
  }

  return { root };
};
