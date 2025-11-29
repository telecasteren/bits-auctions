import Dashboard from "@/app/ui/features/dashboard";
import Listings from "@/app/ui/features/listings";
import Account from "@/app/ui/features/account/account";
import Landing from "@/app/ui/features/landing";
import renderAuthForm from "./features/auth/render-auth-form";
import PageNotFound from "@/app/ui/utils/page-not-found";
import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";

const renderContent = () => {
  const user = (loadKey("user") as Profile) || "";
  const username = user.name || "";

  const content = document.querySelector<HTMLElement>("#content");
  if (!content) return;

  content.classList.add("fade-out");

  content.addEventListener(
    "transitionend",
    function handler() {
      content.removeEventListener("transitionend", handler);
      content.innerHTML = "";

      switch (window.location.pathname) {
        case "/":
          Landing();
          break;
        case "/overview":
          Dashboard();
          break;
        case "/listings":
          Listings();
          break;
        case `/account/${username}`:
          Account();
          break;
        case "/login":
          renderAuthForm(false);
          break;
        case "/signup":
          renderAuthForm(true);
          break;
        case "/404.html":
          PageNotFound();
          break;
        default:
          break;
      }

      void content.offsetWidth;
      content.classList.remove("fade-out");
    },
    { once: true },
  );
};

export default renderContent;
