import navigation from "@/app/events/navbar/navbar-events";
import renderContent from "@/app/ui/render-content";
import { isAuthenticated } from "@/utils/config/constants";
import { logoText, logoImg } from "../branding/brand-logo";

const navbar = () => {
  const nav = document.createElement("nav");
  nav.id = "navbar";

  const logoLink = document.createElement("div");
  logoLink.id = "nav-logo-container";
  nav.appendChild(logoLink);

  logoLink.addEventListener("click", () => {
    history.pushState(null, "", "/bits-auctions/");
    renderContent();
  });

  const logoTextElement = logoText(true);
  logoLink.appendChild(logoTextElement);

  const logoImgElement = logoImg();
  logoLink.appendChild(logoImgElement);

  const navList = document.createElement("ul");

  const navItems = [
    isAuthenticated ? "Overview" : null,
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

  nav.appendChild(navList);
  document.body.prepend(nav);

  navigation();
};
export default navbar;
