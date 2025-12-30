import { getAuthenticatedUser } from "@/services/helpers/get-current-user";
import { renderApp } from "@/services/helpers/render-app";
import { createDialogue } from "@/app/components/modals/dialogue/create-dialogue";

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
          break;
        case "nav-overview":
          window.history.pushState({}, "", "/bits-auctions/overview");
          break;
        case "nav-new":
          if (!user) {
            window.history.pushState({}, "", "/bits-auctions/login");
            break;
          }
          createDialogue(user);
          break;
        case "nav-listings":
          window.history.pushState({}, "", "/bits-auctions/listings");
          break;
        case "nav-account":
          window.history.pushState(
            {},
            "",
            `/bits-auctions/account/${username}`
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
