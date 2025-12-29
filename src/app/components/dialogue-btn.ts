import { createDialogue } from "@/app/components/modals/dialogue/create-dialogue";
import { loadKey } from "@/utils/storage/storage";
import type { Profile } from "@/services/types/profile";

export const createListingBtn = () => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn-secondary w-max";
  button.textContent = "Create listing";

  const userObject = loadKey("user") as Profile;

  button.addEventListener("click", () => {
    createDialogue(userObject);
  });
  return button;
};
