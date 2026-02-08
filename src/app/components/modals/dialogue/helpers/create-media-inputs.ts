export const createMediaInputs = (amount: number = 1, max: number = 10) => {
  const mediaGroup = document.createElement("div");
  mediaGroup.id = "media-gallery-inputs";
  mediaGroup.className = "grid gap-3";

  const mediaLabel = document.createElement("label");
  mediaLabel.className = "LABEL";
  mediaLabel.htmlFor = "media-1";
  mediaLabel.textContent = "Image gallery urls";

  const mediaInputGroup = document.createElement("div");
  mediaInputGroup.className = "grid grid-cols-2 items-center gap-3";
  mediaInputGroup.setAttribute("data-role", "media-input-group");

  mediaGroup.appendChild(mediaLabel);
  mediaGroup.appendChild(mediaInputGroup);

  const createInput = (index: number) => {
    const inputWrapper = document.createElement("div");
    const urlInput = document.createElement("input");
    urlInput.id = `media-${index}`;
    urlInput.name = "media";
    urlInput.placeholder = `Image url ${index}`;
    urlInput.className = "INPUT_BASE";

    if (urlInput.placeholder === "Image url 1") {
      urlInput.required = true;
      urlInput.placeholder = "Image url 1 *";
    }

    inputWrapper.appendChild(urlInput);
    mediaInputGroup.appendChild(inputWrapper);
  };

  const create = Math.min(Math.max(0, amount), max);
  for (let i = 1; i <= create; i++) createInput(i);

  mediaGroup.dataset.max = String(max);
  return mediaGroup;
};
