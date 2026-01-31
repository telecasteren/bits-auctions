import { createDialogue } from "@/app/components/modals/dialogue/create-dialogue";
import { getAuthenticatedUser } from "@/services/helpers/get-current-user";
import type { Profile } from "@/services/types/profile";

export const createListingBtn = async () => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn-modal-trigger w-max";
  button.textContent = "Create listing";

  const userObject = (await getAuthenticatedUser()) as Profile;

  button.addEventListener("click", () => {
    createDialogue(userObject);
  });
  return button;
};
