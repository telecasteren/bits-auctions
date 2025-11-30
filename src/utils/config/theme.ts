export const isDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

if (isDark) {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}
