import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";

const navigation = () => {
  const liItems = document.querySelectorAll("nav ul li");

  const user = (loadKey("user") as Profile) || "";
  const username = user.name || "";

  liItems.forEach((li) => {
    li.addEventListener("click", (event) => {
      const target = event.target as HTMLElement | null;
      const selectedItem = target?.id;

      switch (selectedItem) {
        case "nav-overview":
          window.location.pathname = "/";
          break;
        case "nav-listings":
          window.location.pathname = "/listings";
          break;
        case "nav-account":
          window.location.pathname = `/account/${username}`;
          break;
        case "nav-login":
          window.location.pathname = "/auth";
          break;
        default:
          break;
      }
    });
  });
};
export default navigation;
