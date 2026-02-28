import { spinner } from "@/app/components/loaders/spinner";
import { logoutFromStorage } from "@/utils/storage/storage";
import { renderApp } from "./render-app";

export const logOutUser = (isLoading = false) => {
  const logOutButton = document.createElement("button");
  if (isLoading) {
    logOutButton.replaceChildren(spinner());
  } else {
    logOutButton.textContent = "Log out";
  }
  logOutButton.className = "btn-logout";

  logOutButton.addEventListener("click", () => {
    isLoading = true;
    logOutButton.replaceChildren(spinner());
    logoutFromStorage();

    setTimeout(() => {
      window.history.pushState({}, "", "/");
      renderApp();
    }, 500);
  });

  return logOutButton;
};
