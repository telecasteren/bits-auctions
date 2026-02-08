import { submitNewListingEvents } from "@/app/events/listing/submit-new-events";
import { handleClicks } from "@/app/components/modals/dialogue/helpers/handle-clicks";
import { createMediaInputs } from "./helpers/create-media-inputs";
import { addExtraInput } from "@/app/components/modals/dialogue/helpers/add-extra-input";
import type { Profile } from "@/services/types/profile";
import { checkMandatoryInputs } from "./helpers/check-mandatory-fields";
import { spinner } from "../../loaders/spinner";

export const createDialogue = (
  username: Profile,
  container: HTMLElement | null = document.getElementById("content"),
) => {
  const form = document.createElement("div");
  form.className = "justify-self-end";

  const overlay = document.createElement("div");
  overlay.className = "dialogue-overlay";

  const content = document.createElement("div");
  content.className = "dialogue-content";
  content.setAttribute("role", "dialog");
  content.setAttribute("aria-modal", "true");

  const header = document.createElement("div");

  const formTitle = document.createElement("h2");
  formTitle.id = "dialogue-form-title";
  formTitle.className = "text-lg font-medium";
  formTitle.textContent = "Create listing";

  const formDescription = document.createElement("p");
  formDescription.id = "dialogue-form-description";
  formDescription.textContent = "Fill in the form to create a new listing.";

  const body = document.createElement("div");
  body.className = "grid gap-4";

  const endsAtGroup = document.createElement("div");
  endsAtGroup.className = "grid grid-cols-2 gap-3 items-center";

  const endsAtLabel = document.createElement("label");
  endsAtLabel.className = "text-white";
  endsAtLabel.htmlFor = "ends-at";
  endsAtLabel.textContent = "Bidding ends at";

  const today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrow = today.toLocaleDateString("en-CA");
  const endsAtInput = document.createElement("input");
  endsAtInput.id = "ends-at";
  endsAtInput.type = "date";
  endsAtInput.name = "ends-at";
  endsAtInput.min = tomorrow;
  endsAtInput.value = tomorrow;
  endsAtInput.className = "p-2 rounded-md border bg-[var(--background)]";

  const listingTitleGroup = document.createElement("div");
  listingTitleGroup.className = "grid gap-3";
  const listingTitleLabel = document.createElement("label");
  listingTitleLabel.className = "LABEL";
  listingTitleLabel.htmlFor = "title";
  listingTitleLabel.textContent = "Title";

  const titleInput = document.createElement("input");
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.placeholder = "Enter listing title *";
  titleInput.className = "INPUT_BASE";

  const imageGalleryGroup = document.createElement("div");
  imageGalleryGroup.className = "grid gap-3";

  const urlInputs = createMediaInputs(3);

  const addImageBtn = document.createElement("button");
  addImageBtn.type = "button";
  addImageBtn.className = "btn-add-media-input w-max";
  addImageBtn.textContent = "+ Add";

  const descriptionGroup = document.createElement("div");
  descriptionGroup.className = "grid gap-3";

  const descriptionLabel = document.createElement("label");
  descriptionLabel.className = "LABEL";
  descriptionLabel.htmlFor = "description";
  descriptionLabel.textContent = "Description (recommended)";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "description";
  descriptionInput.name = "description";
  descriptionInput.rows = 4;
  descriptionInput.placeholder = "Enter description";
  descriptionInput.className = "INPUT_BASE";

  const tagsGroup = document.createElement("div");
  tagsGroup.className = "grid gap-3";

  const tagsLabel = document.createElement("label");
  tagsLabel.className = "LABEL";
  tagsLabel.htmlFor = "tags";
  tagsLabel.textContent = "Tags (optional)";

  const tagsInput = document.createElement("input");
  tagsInput.id = "tags";
  tagsInput.name = "tags";
  tagsInput.placeholder = "clothes, fashion...";
  tagsInput.className = "INPUT_BASE";

  const footer = document.createElement("div");
  footer.className = "dialogue-footer";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "btn-cancel";
  cancelBtn.textContent = "Cancel";

  const saveBtn = document.createElement("button");
  saveBtn.id = "dialogue-save-btn";
  saveBtn.type = "button";
  saveBtn.disabled = true;
  saveBtn.className = "btn-save";
  saveBtn.textContent = "Save changes";

  header.appendChild(formTitle);
  header.appendChild(formDescription);
  endsAtGroup.appendChild(endsAtLabel);
  endsAtGroup.appendChild(endsAtInput);

  listingTitleGroup.appendChild(listingTitleLabel);
  listingTitleGroup.appendChild(titleInput);
  imageGalleryGroup.appendChild(urlInputs);
  imageGalleryGroup.appendChild(addImageBtn);

  descriptionGroup.appendChild(descriptionLabel);
  descriptionGroup.appendChild(descriptionInput);
  tagsGroup.appendChild(tagsLabel);
  tagsGroup.appendChild(tagsInput);

  body.appendChild(endsAtGroup);
  body.appendChild(listingTitleGroup);
  body.appendChild(imageGalleryGroup);
  body.appendChild(descriptionGroup);
  body.appendChild(tagsGroup);

  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);

  content.appendChild(header);
  content.appendChild(body);
  content.appendChild(footer);

  endsAtInput.addEventListener("change", () => {
    if (endsAtInput.value < endsAtInput.min)
      endsAtInput.value = endsAtInput.min;
  });

  addImageBtn.addEventListener("click", () => {
    const newAddition = addExtraInput(urlInputs, 1);
    if (newAddition === 0) addImageBtn.disabled = true;

    if (addImageBtn.disabled) {
      addImageBtn.textContent = "Max images reached";
      return;
    }
  });

  container?.appendChild(form);

  const { open } = handleClicks({
    cancelBtn,
    overlay,
    content,
  });
  open();

  const { close } = handleClicks({
    cancelBtn,
    overlay,
    content,
  });

  checkMandatoryInputs();

  saveBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const originalText = Array.from(saveBtn.childNodes);
    saveBtn.disabled = true;
    saveBtn.replaceChildren(spinner());

    try {
      await new Promise((request) => setTimeout(request, 200));
      await submitNewListingEvents(username, close);
    } finally {
      saveBtn.disabled = false;
      saveBtn.replaceChildren(...originalText);
    }
  });
};
