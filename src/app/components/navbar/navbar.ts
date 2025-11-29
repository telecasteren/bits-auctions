import navigation from "@/app/events/navbar/navbar-events";
import { isAuthenticated } from "@/utils/config/constants";

const navbar = () => {
  const nav = document.createElement("nav");
  nav.id = "navbar";

  const logoLink = document.createElement("a");
  logoLink.href = "/";
  logoLink.id = "nav-logo-container";
  nav.appendChild(logoLink);

  const navLogo = document.createElement("div");
  navLogo.id = "nav-logo";
  navLogo.className = "lemon-font";
  navLogo.textContent = "Bits";
  logoLink.appendChild(navLogo);

  const logoImg = document.createElement("img");
  logoImg.src = "/assets/site-logo.png";
  logoImg.alt = "Bits Logo";
  logoImg.id = "nav-logo-img";
  logoLink.appendChild(logoImg);

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
