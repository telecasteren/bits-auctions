// import { isDark } from "@/utils/config/theme";
import {
  brandShortName,
  brandLogoImg,
  brandFullName,
} from "@/utils/config/constants";

export const logoText = (short = false) => {
  const logoText = document.createElement("div");
  logoText.id = short ? "nav-logo" : "nav-logo-alt";
  logoText.className = short ? "lemon-font" : "lemon-font-alt";
  logoText.textContent = short ? brandShortName : brandFullName;

  // if (isDark) {
  //   logoText.classList.add("text-white");
  // }

  return logoText;
};

export const logoImg = () => {
  const logoImg = document.createElement("img");
  logoImg.id = "nav-logo-img";
  logoImg.src = brandLogoImg;
  logoImg.alt = `${brandShortName} Logo`;

  return logoImg;
};
