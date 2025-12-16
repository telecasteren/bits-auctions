import { updateProfile } from "@/services/api/profiles/update/update-profile";
import { Profile } from "@/services/types/profile";

export const editProfile = (user: Profile) => {
  const button = document.querySelector("#save-btn");
  if (!button) return;

  const username = user.name || "";

  button.addEventListener("click", async (e: Event) => {
    e.preventDefault();

    const bioInput = document.getElementById(
      "user-bio-textarea"
    ) as HTMLTextAreaElement | null;
    const avatarInput = document.getElementById(
      "avatar-url-input"
    ) as HTMLInputElement | null;

    const newData: Partial<{
      bio: string;
      avatar: string;
    }> = {};

    if (bioInput && bioInput.value !== user.bio) {
      newData.bio = bioInput.value;
    }

    if (avatarInput && avatarInput.value !== user.avatar.url) {
      newData.avatar = avatarInput.value;
    }

    if (Object.keys(newData).length > 0) {
      await updateProfile(username, newData);
    } else {
      throw new Error("No changes to update.");
    }
  });
};
