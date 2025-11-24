export const createText = (text: string, extraClass?: string): HTMLElement => {
  const span = document.createElement("span");
  span.className = "whitespace-nowrap";
  if (extraClass) span.className += " " + extraClass;
  span.textContent = text;
  return span;
};
