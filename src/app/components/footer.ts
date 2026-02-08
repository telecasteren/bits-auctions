export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footer = document.querySelector("footer") as HTMLElement;
  footer.textContent = `© ${currentYear} Bits Auctions. All rights reserved.`;
  return footer;
};
