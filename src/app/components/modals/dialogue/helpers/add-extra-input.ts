export const addExtraInput = (
  mediaGroup: HTMLElement,
  amount: number,
  newMax?: number,
) => {
  const inputGroup = mediaGroup.querySelector(
    `[data-role="media-input-group"]`,
  ) as HTMLElement;
  const max =
    typeof newMax === "number" ? newMax : Number(mediaGroup.dataset.max ?? 10);
  const currentAmount =
    inputGroup.querySelectorAll(`input[name="media"]`).length;

  const remaining = Math.max(0, max - currentAmount);
  const toAdd = Math.min(Math.max(0, amount), remaining);

  for (let i = 1; i <= toAdd; i++) {
    const inputWrapper = document.createElement("div");
    const index = currentAmount + i;
    const urlInput = document.createElement("input");
    urlInput.id = `media-${index}`;
    urlInput.name = "media";
    urlInput.placeholder = `Image url ${index}`;
    urlInput.className = "INPUT_BASE";

    inputWrapper.appendChild(urlInput);
    inputGroup.appendChild(inputWrapper);
  }

  return toAdd;
};
