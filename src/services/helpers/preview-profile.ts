import UserProfile from "@/app/ui/features/account/UserProfile";
import type { Profile } from "@/services/types/profile";

export const previewProfile = async (user: Profile) => {
  const container = document.querySelector("#content");
  if (!container) return;
  container.innerHTML = "";
  await UserProfile(user);
};
