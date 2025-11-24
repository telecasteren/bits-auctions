import { removeKey } from "@/utils/storage/storage";

export const logOutUser = () => {
  const logOutButton = document.createElement("button");
  logOutButton.textContent = "Log out";
  logOutButton.className = `flex mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer`;
  logOutButton.addEventListener("click", () => {
    removeKey("token");
    removeKey("user");
    window.location.pathname = "/listings";
  });

  return logOutButton;
};
