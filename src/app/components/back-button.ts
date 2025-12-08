import type { Profile } from "@/services/types/profile";

export const backButton = (user: Profile) => {
  const username = user.name || "";
  const backButton = document.createElement("button");
  backButton.id = "back-button";
  backButton.textContent = "← Back";
  backButton.className =
    "mb-6 text-[var(--accent-strong)] hover:underline cursor-pointer justify-self-start";
  backButton.addEventListener("click", () => {
    if (window.location.pathname === `/bits-auctions/account/${username}`) {
      window.location.pathname = `/bits-auctions/account/${username}`;
    } else {
      window.history.back();
    }
  });
  return backButton;
};
