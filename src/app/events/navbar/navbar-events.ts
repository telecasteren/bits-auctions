import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";
import { renderApp } from "@/services/helpers/render-app";

const navigation = () => {
  const liItems = document.querySelectorAll("nav ul li");

  const user = (loadKey("user") as Profile) || "";
  const username = user.name || "";

  liItems.forEach((li) => {
    li.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement | null;
      const selectedItem = target?.id;

      switch (selectedItem) {
        case "nav-landing":
          window.history.pushState({}, "", "/bits-auctions/");
          break;
        case "nav-overview":
          window.history.pushState({}, "", "/bits-auctions/overview");
          break;
        case "nav-listings":
          window.history.pushState({}, "", "/bits-auctions/listings");
          break;
        case "nav-account":
          window.history.pushState(
            {},
            "",
            `/bits-auctions/account/${username}`,
          );
          break;
        case "nav-login":
          window.history.pushState({}, "", "/bits-auctions/login");
          break;
        case "nav-signup":
          window.history.pushState({}, "", "/bits-auctions/signup");
          break;
        default:
          break;
      }

      renderApp();
    });
  });
};
export default navigation;
