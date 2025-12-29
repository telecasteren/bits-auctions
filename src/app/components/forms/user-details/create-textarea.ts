export const createTextarea = (placeholder: string): HTMLTextAreaElement => {
  const textarea = document.createElement("textarea");
  textarea.value = placeholder || "";
  textarea.className = `flex min-h-[100px] w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background
  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
  disabled:cursor-not-allowed disabled:opacity-50`;
  return textarea;
};
