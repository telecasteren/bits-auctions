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
  logOutButton.className = "btn bg-red-600 text-white flex mt-6 px-4 py-2";

  logOutButton.addEventListener("click", () => {
    isLoading = true;
    logOutButton.replaceChildren(spinner());
    logoutFromStorage();

    setTimeout(() => {
      window.history.pushState({}, "", "/bits-auctions/");
      renderApp();
    }, 500);
  });

  return logOutButton;
};
