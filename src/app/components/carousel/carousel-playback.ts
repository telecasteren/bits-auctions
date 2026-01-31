export const carouselPlayback = (
  root: HTMLElement,
  state: { index: number },
  setActive: (next: number) => void,
  slides: NodeListOf<HTMLDivElement>,
  previousBtn: HTMLButtonElement,
  nextBtn: HTMLButtonElement,
  indicatorButtons: HTMLButtonElement[],
  startImageIndex: number,
  autoplay = true,
) => {
  const AUTOPLAY_DELAY = 3000;
  let autoplayId: number | undefined;

  const stopAutoplay = () => {
    if (autoplayId !== undefined) {
      clearInterval(autoplayId);
      autoplayId = undefined;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (autoplay && slides.length > 1) {
      autoplayId = window.setInterval(() => {
        setActive(state.index + 1);
      }, AUTOPLAY_DELAY);
    }
  };

  previousBtn.addEventListener("click", () => {
    setActive(state.index - 1);
    if (autoplay) startAutoplay();
  });

  nextBtn.addEventListener("click", () => {
    setActive(state.index + 1);
    if (autoplay) startAutoplay();
  });

  indicatorButtons.forEach((btn, i) =>
    btn.addEventListener("click", () => {
      setActive(i);
      if (autoplay) startAutoplay();
    }),
  );

  if (autoplay) {
    root.addEventListener("mouseenter", stopAutoplay);
    root.addEventListener("mouseleave", startAutoplay);
  }

  setActive(startImageIndex);
  if (autoplay) startAutoplay();
};
