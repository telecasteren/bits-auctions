import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";
import { setNavItemActive } from "@/app/events/navbar/set-nav-item-active";
import renderContent from "@/app/ui/render-content";

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
          // window.location.pathname = "/bits-auctions/";
          window.history.pushState({}, "", "/bits-auctions/");
          break;
        case "nav-overview":
          // window.location.pathname = "/bits-auctions/overview";
          window.history.pushState({}, "", "/bits-auctions/overview");
          break;
        case "nav-listings":
          // window.location.pathname = "/bits-auctions/listings";
          window.history.pushState({}, "", "/bits-auctions/listings");
          break;
        case "nav-account":
          // window.location.pathname = `/bits-auctions/account/${username}`;
          window.history.pushState(
            {},
            "",
            `/bits-auctions/account/${username}`,
          );
          break;
        case "nav-login":
          // window.location.pathname = "/bits-auctions/login";
          window.history.pushState({}, "", "/bits-auctions/login");
          break;
        case "nav-signup":
          // window.location.pathname = "/bits-auctions/signup";
          window.history.pushState({}, "", "/bits-auctions/signup");
          break;
        default:
          break;
      }

      renderContent();
      setNavItemActive();
    });
  });
};
export default navigation;
