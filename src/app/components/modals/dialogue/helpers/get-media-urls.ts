export const getAllMediaUrls = (mediaGroup: HTMLElement): string[] => {
  const inputs = mediaGroup.querySelectorAll(
    `input[name="media"]`,
  ) as NodeListOf<HTMLInputElement>;

  const urls: string[] = [];

  inputs.forEach((input) => {
    const inputValue = input.value.trim();
    if (inputValue) {
      urls.push(inputValue);
    }
  });

  return urls;
};
