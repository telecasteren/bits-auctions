import { submitNewListing } from "@/services/api/listings/submit-new-listing";
import type { Listing } from "@/services/types/listing";
import type { Profile } from "@/services/types/profile";

export const submitNewListingEvents = (
  username: Profile,
  close?: () => void
) => {
  const saveBtn = document.getElementById("dialogue-save-btn");
  if (!saveBtn) return;

  const titleInput = document.getElementById("title-1") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description-1"
  ) as HTMLTextAreaElement;
  const tagsInput = document.getElementById("tags-1") as HTMLInputElement;
  const urlInputs = document.getElementById(
    "img-gallery-1"
  ) as HTMLInputElement;
  const endsAtInput = document.getElementById("ends-at-1") as HTMLInputElement;

  saveBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    const newListing: Listing = {
      id: "",
      title: titleInput.value || "",
      description: descriptionInput.value || "",
      tags: tagsInput.value
        ? tagsInput.value.split(",").map((tag) => tag.trim())
        : [],
      media: [urlInputs.value.trim()].map((url) => ({
        url,
        alt: `${titleInput.value.trim() || "Listing"} image`,
      })),
      created: new Date(),
      updated: new Date(),
      endsAt: new Date(endsAtInput.value),
      seller: username,
      bids: [],
      _count: {
        bids: 0,
      },
    };

    await submitNewListing(newListing);
    close?.();
  });
};
