import { userMessage } from "@/app/ui/utils/user-messages";
import { submitNewListing } from "@/services/api/listings/submit-new-listing";
import { renderApp } from "@/services/helpers/render-app";
import type { Listing } from "@/services/types/listing";
import type { Profile } from "@/services/types/profile";

export const submitNewListingEvents = async (
  username: Profile,
  close?: () => void,
) => {
  const saveBtn = document.getElementById("dialogue-save-btn");
  if (!saveBtn) return;

  const titleInput = document.getElementById("title") as HTMLInputElement;
  const descriptionInput = document.getElementById(
    "description",
  ) as HTMLTextAreaElement;
  const tagsInput = document.getElementById("tags") as HTMLInputElement;
  const endsAtInput = document.getElementById("ends-at") as HTMLInputElement;

  const mediaGroup = document.getElementById(
    "media-gallery-inputs",
  ) as HTMLDivElement | null;
  const inputs = Array.from(
    mediaGroup?.querySelectorAll(`input[name="media"]`) ?? [],
  ) as HTMLInputElement[];

  const media = inputs
    .map((input) => input.value.trim())
    .filter((url) => url.length > 0)
    .map((url) => ({
      url,
      alt: `${titleInput.value.trim() || "Listing"} image`,
    }));

  const newListing: Listing = {
    id: "",
    title: titleInput.value || "",
    description: descriptionInput.value || "",
    tags: tagsInput.value
      ? tagsInput.value.split(",").map((tag) => tag.trim())
      : [],
    media,
    created: new Date(),
    endsAt: new Date(endsAtInput.value),
    seller: username,
  };

  try {
    await submitNewListing(newListing);
    userMessage("success", "Listing created.", { duration: 3000 });
    close?.();
    window.history.pushState({}, "", "/listings");
    renderApp();
  } catch (error) {
    if (error instanceof Error) {
      userMessage("error", `Failed to create listing: ${error.message}`, {
        duration: 5000,
      });
      return;
    }
  }
};
