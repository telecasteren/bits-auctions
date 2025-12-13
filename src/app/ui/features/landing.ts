import { logoImg, logoText } from "@/app/components/branding/brand-logo";
import Carousel from "@/app/components/carousel/Carousel";

const Landing = async () => {
  const container = document.querySelector("#content");
  if (!container) return;

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

  const carouselEl = await Carousel();

  header.appendChild(h1);
  header.appendChild(p);
  wrapper.appendChild(header);
  wrapper.appendChild(logo);
  container.appendChild(wrapper);
  container.appendChild(carouselEl);
};
export default Landing;
