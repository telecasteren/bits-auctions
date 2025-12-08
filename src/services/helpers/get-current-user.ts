import { fetchSingleProfile } from "@/services/api/profiles/fetch-single-profile";
import { Profile } from "@/services/types/profile";

export const getCurrentUser = async () => {
  const userFromPath =
    window.location.pathname.split("/bits-auctions/profile/")[1] || "";
  const userProfile = await fetchSingleProfile(userFromPath);
  const profile = userProfile as Profile;

  if (!profile) {
    window.location.pathname = "/bits-auctions/404.html";
    return;
  }

  return { userFromPath, profile };
};
