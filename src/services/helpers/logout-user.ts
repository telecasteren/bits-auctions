import { spinner } from "@/app/components/loaders/spinner";
import { removeKey } from "@/utils/storage/storage";

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
    removeKey("token");
    removeKey("user");
    removeKey("credits");

    setTimeout(() => {
      window.location.pathname = "/bits-auctions/";
    }, 500);
  });

  return logOutButton;
};
