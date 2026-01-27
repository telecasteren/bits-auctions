import { getAuthenticatedUser } from "@/services/helpers/get-current-user";
import { renderApp } from "@/services/helpers/render-app";
import { createDialogue } from "@/app/components/modals/dialogue/create-dialogue";
import { loadKey } from "@/utils/storage/storage";
import { setNavItemActive } from "./set-nav-item-active";

const navigation = async () => {
  const liItems = document.querySelectorAll("nav ul li");

  const user = await getAuthenticatedUser();
  const username = user?.name;

  liItems.forEach((li) => {
    li.addEventListener("click", (event: Event) => {
      const target = event.target as HTMLElement | null;
      const selectedItem = target?.id;

      switch (selectedItem) {
        case "nav-landing":
          window.history.pushState({}, "", "/bits-auctions/");
          renderApp();
          break;
        case "nav-overview":
          window.history.pushState({}, "", "/bits-auctions/overview");
          renderApp();
          break;
        case "nav-new":
          if (!user) {
            window.history.pushState({}, "", "/bits-auctions/login");
            renderApp();
            break;
          }
          createDialogue(user);
          break;
        case "nav-listings":
          window.history.pushState({}, "", "/bits-auctions/listings");
          renderApp();
          break;
        case "nav-account":
          window.history.pushState(
            {},
            "",
            `/bits-auctions/account/${username}`,
          );
          renderApp();
          break;
        case "nav-login":
          window.history.pushState({}, "", "/bits-auctions/login");
          renderApp();
          break;
        case "nav-signup":
          window.history.pushState({}, "", "/bits-auctions/signup");
          renderApp();
          break;
        default:
          break;
      }
    });
  });

  window.addEventListener("creditsUpdated", () => {
    const newCredits = loadKey("credits") as number;
    const wallet = document.getElementById("nav-credits") as HTMLElement;
    if (wallet) wallet.textContent = newCredits.toString();
  });

  window.addEventListener("navItemChanged", setNavItemActive);
};
export default navigation;
