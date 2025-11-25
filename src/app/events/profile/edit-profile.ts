import { updateProfile } from "@/services/api/profiles/update/update-profile";
import { Profile } from "@/services/types/profile";

export const editProfile = (user: Profile) => {
  const button = document.querySelector("#save-btn");
  if (!button) return;

  const username = user.name || "";

  button.addEventListener("click", async (e: Event) => {
    e.preventDefault();

    const usernameInput = document.getElementById(
      "username-input",
    ) as HTMLInputElement | null;
    const bioInput = document.getElementById(
      "user-bio-textarea",
    ) as HTMLTextAreaElement | null;
    const emailInput = document.getElementById(
      "email-input",
    ) as HTMLInputElement | null;
    const avatarInput = document.getElementById(
      "avatar-url-input",
    ) as HTMLInputElement | null;

    const newData: Partial<{
      name: string;
      email: string;
      bio: string;
      avatar: string;
    }> = {};

    if (usernameInput && usernameInput.value !== user.name) {
      newData.name = usernameInput.value;
    }
    if (emailInput && emailInput.value !== user.email) {
      newData.email = emailInput.value;
    }
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
