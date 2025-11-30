import { spinner } from "@/app/components/loaders/spinner";
import { removeKey } from "@/utils/storage/storage";

export const logOutUser = (isLoading = false) => {
  const logOutButton = document.createElement("button");
  if (isLoading) {
    logOutButton.replaceChildren(spinner());
  } else {
    logOutButton.textContent = "Log out";
  }
  // logOutButton.className = `flex mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer`;
  logOutButton.className = `flex mt-6 px-4 py-2 btn bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer`;

  logOutButton.addEventListener("click", () => {
    isLoading = true;
    logOutButton.replaceChildren(spinner());
    removeKey("token");
    removeKey("user");

    setTimeout(() => {
      window.location.pathname = "/";
    }, 500);
  });

  return logOutButton;
};
