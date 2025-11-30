import { logoImg, logoText } from "@/app/components/branding/brand-logo";
import Carousel from "@/app/components/carousel/Carousel";

const Landing = async () => {
  const container = document.querySelector("#content");
  if (!container) return;

  const navLogo = document.getElementById("nav-logo-container");
  if (navLogo) navLogo.classList.add("opacity-0");

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-rows items-center justify-center mt-20 gap-4";

  const header = document.createElement("header");

  const h1 = logoText(false);
  h1.classList.add("text-[80px]", "md:text-[120px]", "lg:text-[162px]");

  const p = document.createElement("p");
  p.id = "page-tagline";
  p.className = "mt-[-6%]";
  p.textContent = "Monitor your listings and bids in real-time.";

  const logo = logoImg();
  logo.className = "w-58 mb-6";

  // const buttonsWrapper = document.createElement("div");
  // buttonsWrapper.className = "flex flex-row gap-16 mt-25 justify-center";

  // const listingsBtn = document.createElement("button");
  // listingsBtn.id = "landing-listings-button";
  // listingsBtn.className = "btn btn-secondary";
  // listingsBtn.textContent = "See Listings";
  // buttonsWrapper.appendChild(listingsBtn);

  // const loginBtn = document.createElement("button");
  // loginBtn.id = "landing-login-button";
  // loginBtn.className = "btn btn-primary";
  // loginBtn.textContent = "Log in";
  // buttonsWrapper.appendChild(loginBtn);

  // const signupBtn = document.createElement("button");
  // signupBtn.id = "landing-signup-button";
  // signupBtn.className = "btn btn-tertiary";

  // signupBtn.textContent = "Create Account";
  // buttonsWrapper.appendChild(signupBtn);

  const carouselEl = Carousel();

  header.appendChild(h1);
  header.appendChild(p);
  wrapper.appendChild(header);
  wrapper.appendChild(logo);
  container.appendChild(wrapper);
  // container.appendChild(buttonsWrapper);
  container.appendChild(carouselEl);
};
export default Landing;
