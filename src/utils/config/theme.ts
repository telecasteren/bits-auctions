export const setThemeListener = (onChange: (isDark: boolean) => void) => {
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const updateTheme = () => onChange(mediaQuery.matches);

  mediaQuery.addEventListener("change", updateTheme);
  updateTheme();

  return () => mediaQuery.removeEventListener("change", updateTheme);
};

export const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
