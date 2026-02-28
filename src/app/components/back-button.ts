import { renderApp } from "@/services/helpers/render-app";
import type { Profile } from "@/services/types/profile";

export const backButton = (user: Profile, preview: boolean = false) => {
  const username = user.name || "";
  const isAccount = window.location.pathname.includes("account");
  const backButton = document.createElement("button");
  backButton.id = "back-button";
  backButton.textContent = "← Back";
  backButton.className = "btn-back";

  backButton.addEventListener("click", () => {
    if (preview && isAccount) {
      window.history.pushState({}, "", `/account/${username}`);
      renderApp();
    } else {
      window.history.back();
    }
  });
  return backButton;
};
