import ViewProfile from "@/app/ui/features/account/view-profile";
import type { Profile } from "@/services/types/profile";

export const previewProfile = async (user: Profile) => {
  const container = document.querySelector("#content");
  if (!container) return;
  container.innerHTML = "";
  const userProfileView = await ViewProfile(user);
  container.appendChild(userProfileView);
};
