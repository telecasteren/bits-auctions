const createBadge = (text: string, className: string) => {
  const badge = document.createElement("span");
  badge.className = `inline-flex items-center rounded-full border px-2.5 py-0.5
  text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`;
  badge.textContent = text;
  return badge;
};

export { createBadge };
