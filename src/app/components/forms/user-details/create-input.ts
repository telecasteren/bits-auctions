export const createInput = (
  placeholder: string,
  extraClass?: string
): HTMLInputElement => {
  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.className =
    "flex h-10 w-full mb-2 rounded-md border border-input bg-[hsl(var(--background))] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";
  if (extraClass) input.className += " " + extraClass;
  return input;
};
