export const carouselEvents = (root: HTMLElement) => {
  const slides = root.querySelectorAll<HTMLDivElement>("[data-carousel-item]");
  const previousBtn = root.querySelector<HTMLButtonElement>(
    "[data-carousel-prev]"
  );
  const nextBtn = root.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const indicatorButtons = Array.from(
    root.querySelectorAll<HTMLButtonElement>("[data-carousel-slide-to]")
  );

  if (!previousBtn || !nextBtn || indicatorButtons.length === 0) return;

  const startImageIndex = Math.max(
    0,
    indicatorButtons.findIndex(
      (btn) => btn.getAttribute("aria-current") === "true"
    )
  );
  const state = { index: startImageIndex };

  slides.forEach((slide) => {
    slide.classList.remove("hidden");
    slide.classList.add("slide-default");
  });

  const slidePositions = () => {
    const total = slides.length;

    slides.forEach((slide, i) => {
      // here we set how many steps the slide is 'ahead' of the focused one
      const ahead = (i - state.index + total) % total;

      slide.classList.remove(
        "slide-active",
        "slide-next",
        "slide-previous",
        "slide-off-right",
        "slide-off-left"
      );

      if (ahead === 0) {
        slide.classList.add("slide-active");
      } else if (ahead === 1) {
        slide.classList.add("slide-next");
      } else if (ahead === total - 1) {
        slide.classList.add("slide-previous");
      } else if (ahead < total / 2) {
        slide.classList.add("slide-off-right");
      } else {
        slide.classList.add("slide-off-left");
      }
    });

    indicatorButtons.forEach((btn, i) => {
      btn.setAttribute("aria-current", i === state.index ? "true" : "false");
    });
  };

  const setActive = (next: number) => {
    state.index = (next + slides.length) % slides.length;
    slidePositions();
  };

  return {
    setActive,
    state,
    slides,
    previousBtn,
    nextBtn,
    indicatorButtons,
    startImageIndex,
  };
};
