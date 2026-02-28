import { fetchSingleProfile } from "@/services/api/profiles/fetch/fetch-single-profile";
import { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";

export const getCurrentUser = async () => {
  const profileUserFromPath = window.location.pathname.split(
    "/profile/",
  )[1];

  const accountUserFromPath = window.location.pathname.split(
    "/account/",
  )[1];

  if (profileUserFromPath) {
    const userProfile = await fetchSingleProfile(profileUserFromPath);
    const profile = userProfile as Profile;

    if (!profile) {
      window.location.pathname = "/404.html";
      return;
    }

    return { profileUserFromPath, profile: userProfile as Profile };
  } else if (accountUserFromPath) {
    const userProfile = await fetchSingleProfile(accountUserFromPath);
    const profile = userProfile as Profile;

    if (!profile) {
      window.location.pathname = "/404.html";
      return;
    }

    return {
      profileUserFromPath: accountUserFromPath,
      profile: userProfile as Profile,
    };
  }

  return { profileUserFromPath };
};

export const getAuthenticatedUser = async () => {
  const userFromStorage = loadKey("user") as Profile;

  if (!userFromStorage) return null;

  const userFromApi = await fetchSingleProfile(
    userFromStorage ? userFromStorage.name : "",
  );
  return userFromApi as Profile;
};
