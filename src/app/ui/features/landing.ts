import { logoImg, logoText } from "@/app/components/branding/brand-logo";
import { Carousel } from "@/app/components/carousel/images-carousel";

const Landing = async () => {
  const container = document.querySelector("#content");
  if (!container) return;

  container.innerHTML = "";

  const wrapper = document.createElement("div");
  wrapper.className =
    "sm:grid sm:grid-cols-2 md:flex md:flex-row items-center justify-center lg:mt-[-8%] gap-4";

  const header = document.createElement("header");
  header.className = "justify-self-center md:justify-self-start";

  const h1 = logoText(false);
  h1.classList.add("text-[80px]", "md:text-[120px]", "lg:text-[162px]");

  const p = document.createElement("p");
  p.id = "page-tagline";
  p.className = "mt-[-6%]";
  p.textContent = "Monitor your listings and bids in real-time.";

  const logo = logoImg();
  logo.className = "w-58 mb-6";

  const { root: carouselEl } = await Carousel();

  const hr = document.createElement("hr");
  hr.className = "mt-10 w-full border-gray-300 dark:border-gray-700";

  const aboutSection = document.createElement("section");
  aboutSection.id = "about-section";
  aboutSection.className = "mt-10";
  const subtitle = document.createElement("h2");
  subtitle.className = "text-xl font-semibold mb-4";
  subtitle.textContent = "What is Bits Auctions?";
  const aboutText = document.createElement("p");
  aboutText.className = "text-md";
  aboutText.innerHTML = `A modern online marketplace where anyone can browse listings and verified users can place their bids. Auctions are simple and transparent, when the timer ends ➡️ the highest bidder wins.
  <span class="signup-link"><a href="/bits-auctions/signup">Create your account</a></span> to list your items and place bids. No fuzz, just bid, buy and sell.`;

  header.appendChild(h1);
  header.appendChild(p);
  wrapper.appendChild(header);
  wrapper.appendChild(logo);
  container.appendChild(wrapper);
  container.appendChild(carouselEl);

  container.appendChild(hr);

  aboutSection.prepend(subtitle);
  aboutSection.appendChild(aboutText);
  container.appendChild(aboutSection);
};
export default Landing;
