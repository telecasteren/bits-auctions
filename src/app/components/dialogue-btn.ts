import { createDialogue } from "@/app/components/modals/dialogue/create-dialogue";
import { getAuthenticatedUser } from "@/services/helpers/get-current-user";

export const createListingBtn = async () => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn-secondary w-max";
  button.textContent = "Create listing";

  const userObject = await getAuthenticatedUser();

  button.addEventListener("click", () => {
    createDialogue(userObject);
  });
  return button;
};
