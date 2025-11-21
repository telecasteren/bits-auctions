const createButton = (
  icon: string,
  tooltip: string,
  onClick: (() => void) | null = null,
  disabled = false,
  variant = "outline"
) => {
  const button = document.createElement("button");
  const baseClasses =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variantClasses =
    variant === "destructive"
      ? "h-8 w-8 text-destructive hover:bg-destructive hover:text-white border border-input bg-background hover:bg-accent hover:text-accent-foreground"
      : "h-8 w-8 border border-input bg-background hover:bg-accent hover:text-accent-foreground";

  button.className = `${baseClasses} ${variantClasses}`;
  button.innerHTML = icon;
  button.disabled = disabled;
  button.title = tooltip;

  if (onClick && !disabled) {
    button.addEventListener("click", onClick);
  }

  return button;
};
export default createButton;
