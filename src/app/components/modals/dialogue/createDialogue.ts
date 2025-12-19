import { submitNewListingEvents } from "@/app/events/listing/submit-new-events";
import { handleClicks } from "@/app/components/modals/dialogue/handleClicks";
import type { Profile } from "@/services/types/profile";

export const createDialogue = (username: Profile) => {
  const form = document.createElement("div");
  // form.className = "dialogue-content";
  form.className = "justify-self-end";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "btn-outline";
  trigger.textContent = "Create Listing";
  form.appendChild(trigger);

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

  header.appendChild(formTitle);
  header.appendChild(formDescription);

  const body = document.createElement("div");
  body.className = "grid gap-4";

  const endsAtGroup = document.createElement("div");
  endsAtGroup.className = "grid grid-cols-2 gap-3 items-center";
  const endsAtLabel = document.createElement("label");
  endsAtLabel.className = "text-white";
  endsAtLabel.htmlFor = "ends-at-1";
  endsAtLabel.textContent = "Bidding ends at";
  const endsAtInput = document.createElement("input");
  endsAtInput.type = "date";
  endsAtInput.name = "ends-at";
  endsAtInput.value = new Date().toISOString();
  endsAtInput.className = "p-2 rounded-md border bg-[var(--background)]";
  endsAtGroup.appendChild(endsAtLabel);
  endsAtGroup.appendChild(endsAtInput);

  const listingTitleGroup = document.createElement("div");
  listingTitleGroup.className = "grid gap-3";
  const listingTitleLabel = document.createElement("label");
  listingTitleLabel.className = "LABEL";
  listingTitleLabel.htmlFor = "title-1";
  listingTitleLabel.textContent = "Title";
  const titleInput = document.createElement("input");
  titleInput.id = "title-1";
  titleInput.name = "title";
  titleInput.placeholder = "Enter listing title...";
  titleInput.className = "INPUT_BASE";
  listingTitleGroup.appendChild(listingTitleLabel);
  listingTitleGroup.appendChild(titleInput);

  const imageGalleryGroup = document.createElement("div");
  imageGalleryGroup.className = "grid gap-3";
  const imageGalleryLabel = document.createElement("label");
  imageGalleryLabel.className = "LABEL";
  imageGalleryLabel.htmlFor = "img-gallery-1";
  imageGalleryLabel.textContent = "Image gallery urls";

  const urlInputs = document.createElement("input");
  urlInputs.id = "img-gallery-1";
  urlInputs.name = "image-gallery";
  urlInputs.value = "https://example.com/image.jpg";
  urlInputs.className = "INPUT_BASE";
  imageGalleryGroup.appendChild(imageGalleryLabel);
  imageGalleryGroup.appendChild(urlInputs);

  const descriptionGroup = document.createElement("div");
  descriptionGroup.className = "grid gap-3";
  const descriptionLabel = document.createElement("label");
  descriptionLabel.className = "LABEL";
  descriptionLabel.htmlFor = "description-1";
  descriptionLabel.textContent = "Description (optional)";
  const descriptionInput = document.createElement("textarea");
  descriptionInput.id = "description-1";
  descriptionInput.name = "description";
  descriptionInput.rows = 4;
  descriptionInput.placeholder = "Enter description...";
  descriptionInput.className = "INPUT_BASE";
  descriptionGroup.appendChild(descriptionLabel);
  descriptionGroup.appendChild(descriptionInput);

  const tagsGroup = document.createElement("div");
  tagsGroup.className = "grid gap-3";
  const tagsLabel = document.createElement("label");
  tagsLabel.className = "LABEL";
  tagsLabel.htmlFor = "tags-1";
  tagsLabel.textContent = "Tags (optional)";
  const tagsInput = document.createElement("input");
  tagsInput.id = "tags-1";
  tagsInput.name = "tags";
  tagsInput.placeholder = "clothes, fashion...";
  tagsInput.className = "INPUT_BASE";
  tagsGroup.appendChild(tagsLabel);
  tagsGroup.appendChild(tagsInput);

  body.appendChild(endsAtGroup);
  body.appendChild(listingTitleGroup);
  body.appendChild(imageGalleryGroup);
  body.appendChild(descriptionGroup);
  body.appendChild(tagsGroup);

  const footer = document.createElement("div");
  footer.className = "dialogue-footer";

  const cancelBtn = document.createElement("button");
  cancelBtn.type = "button";
  cancelBtn.className = "btn-outline cursor-pointer";
  cancelBtn.textContent = "Cancel";

  const saveBtn = document.createElement("button");
  saveBtn.type = "button";
  saveBtn.className = "dialogue-primary-btn cursor-pointer";
  saveBtn.textContent = "Save changes";

  footer.appendChild(cancelBtn);
  footer.appendChild(saveBtn);

  content.appendChild(header);
  content.appendChild(body);
  content.appendChild(footer);

  const { close } = handleClicks({ trigger, cancelBtn, overlay, content });
  submitNewListingEvents(username, close);

  return form;
};
