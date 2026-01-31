import { updateProfile } from "@/services/api/profiles/update/update-profile";

type ProfileUpdate = {
  bio?: string;
  avatarUrl?: string;
};

export const editProfile = async (
  user: string,
  update: ProfileUpdate,
  initial: ProfileUpdate,
) => {
  const username = user;
  const newData: Partial<{
    bio: string;
    avatar?: { url: string; alt: string };
  }> = {};

  if (update.bio !== initial.bio) {
    newData.bio = update.bio;
  }

  if (
    update.avatarUrl !== initial.avatarUrl &&
    update.avatarUrl !== undefined
  ) {
    newData.avatar = {
      url: update.avatarUrl,
      alt: "",
    };
  }

  if (!Object.keys(newData).length) {
    throw new Error("No changes to update.");
  }

  await updateProfile(username, newData);
};
