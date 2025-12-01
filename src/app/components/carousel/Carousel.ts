const Carousel = () => {
  const container = document.createElement("div");

  const carousel = document.createElement("div");
  carousel.id = "carousel-placeholder";
  carousel.className =
    "mt-20 w-full border-t border-b border-t-12 border-b-12 border-[var(--selector-background)] rounded-sm";

  const carouselImgs = document.createElement("div");
  carouselImgs.className = "flex flex-row gap-4 overflow-x-auto py-2";

  const text = document.createElement("a");
  text.href = "/bits-auctions/listings";
  text.textContent = "See all listings";
  text.className =
    "flex justify-self-end justify-end w-40 py-2 text-md font-semibold text-black hover:underline cursor-pointer";

  for (let i = 1; i <= 10; i++) {
    const img = document.createElement("div");
    img.className =
      "flex-shrink-0 flex items-center justify-center w-58 h-58 bg-gray-200 rounded-sm";
    img.textContent = `Item ${i}`;
    carouselImgs.appendChild(img);
  }

  carousel.appendChild(carouselImgs);
  carousel.appendChild(text);
  container.appendChild(carousel);

  return container;
};
export default Carousel;
