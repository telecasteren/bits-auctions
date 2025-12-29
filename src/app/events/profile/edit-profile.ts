import { updateProfile } from "@/services/api/profiles/update/update-profile";
import { Profile } from "@/services/types/profile";

export const editProfile = async (user: Profile) => {
  const button = document.querySelector("#save-btn");
  if (!button) return;

  const username = user.name || "";

  const bioInput = document.getElementById(
    "user-bio-textarea"
  ) as HTMLTextAreaElement | null;
  const avatarInput = document.getElementById(
    "user-avatar-input"
  ) as HTMLInputElement | null;

  const newData: Partial<{
    bio: string;
    avatar: { url: string; alt: string };
  }> = {};

  if (bioInput && bioInput.value) {
    newData.bio = bioInput.value;
  }

  if (avatarInput && avatarInput.value) {
    newData.avatar = { url: avatarInput.value, alt: user.avatar.alt };
  }

  if (Object.keys(newData).length > 0) {
    await updateProfile(username, newData);
  } else {
    throw new Error("No changes to update.");
  }
};
