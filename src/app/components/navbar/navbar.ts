import navigation from "@/app/events/navbar/navbar-events";
import { isAuthenticated } from "@/utils/config/constants";
import { logoText, logoImg } from "../branding/brand-logo";
import { renderApp } from "@/services/helpers/render-app";
import { loadKey } from "@/utils/storage/storage";

const navbar = () => {
  const nav = document.createElement("nav");
  nav.id = "navbar";

  const logoLink = document.createElement("div");
  logoLink.id = "nav-logo-container";
  nav.appendChild(logoLink);

  logoLink.addEventListener("click", () => {
    history.pushState(null, "", "/bits-auctions/");
    renderApp();
  });

  const logoTextElement = logoText(true);
  logoLink.appendChild(logoTextElement);

  const logoImgElement = logoImg();
  logoLink.appendChild(logoImgElement);

  const creditsWrapper = document.createElement("div");
  creditsWrapper.id = "nav-credits-wrapper";

  const userCredits = loadKey("credits");
  const credits = document.createElement("p");
  credits.id = "nav-credits";
  credits.textContent = userCredits ? userCredits.toString() : "0";

  const walletIcon = document.createElement("span");
  walletIcon.id = "nav-wallet-icon";
  walletIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;

  const navList = document.createElement("ul");

  const navItems = [
    isAuthenticated ? "Overview" : null,
    isAuthenticated ? "New" : null,
    "Listings",
    isAuthenticated ? "Account" : "Login",
    !isAuthenticated ? "Signup" : null,
  ];

  navItems.forEach((item) => {
    if (!item) return;
    const li = document.createElement("li");
    li.id = `nav-${item.toLowerCase()}`;
    li.textContent = item;
    navList.appendChild(li);
  });

  creditsWrapper.appendChild(credits);
  creditsWrapper.appendChild(walletIcon);

  nav.appendChild(navList);
  nav.appendChild(creditsWrapper);
  document.body.prepend(nav);

  navigation();
};
export default navbar;
