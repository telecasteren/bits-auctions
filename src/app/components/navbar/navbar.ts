import navigation from "@/app/events/navbar-events";
import { isAuthenticated } from "@/utils/config/constants";

const navbar = () => {
  const nav = document.createElement("nav");
  nav.id = "navbar";

  const logoDiv = document.createElement("div");
  logoDiv.id = "nav-logo-container";
  nav.appendChild(logoDiv);

  const navLogo = document.createElement("div");
  navLogo.id = "nav-logo";
  navLogo.textContent = "Bits";
  logoDiv.appendChild(navLogo);

  const logoImg = document.createElement("img");
  logoImg.src = "/assets/site-logo.png";
  logoImg.alt = "Bits Logo";
  logoImg.id = "nav-logo-img";
  logoDiv.appendChild(logoImg);

  const navList = document.createElement("ul");

  const navItems = [
    "Overview",
    "Listings",
    isAuthenticated ? "Account" : "Login",
  ];
  navItems.forEach((item) => {
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
