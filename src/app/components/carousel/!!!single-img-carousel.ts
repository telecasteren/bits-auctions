// import { popUpModal } from "@/app/components/modals/modal";
// import type { Listing } from "@/services/types/listing";

// export const singleListingCarousel = async (listing: Listing) => {
//   const container = document.createElement("div");

//   const carousel = document.createElement("div");
//   carousel.id = "carousel-placeholder";
//   carousel.className = "media-carousel";

//   const carouselImgs = document.createElement("div");
//   carouselImgs.className =
//     "flex flex-row gap-4 w-full justify-center justify-self-center overflow-x-auto py-2";

//   listing.media.forEach((media) => {
//     const img = document.createElement("img");
//     img.src = media.url;
//     img.alt = listing.title || "Listing image";
//     img.className =
//       "flex-shrink-0 flex items-center justify-center w-58 h-58 bg-gray-200 rounded-sm object-cover cursor-pointer hover:scale-102 transition-transform";
//     carouselImgs.appendChild(img);

//     img.addEventListener("click", () => {
//       popUpModal(media.url);
//     });
//   });

//   carousel.appendChild(carouselImgs);
//   container.appendChild(carousel);

//   return container;
// };
