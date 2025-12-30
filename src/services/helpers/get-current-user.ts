import { fetchSingleProfile } from "@/services/api/profiles/fetch/fetch-single-profile";
import { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";

export const getCurrentUser = async () => {
  const userFromPath = window.location.pathname.split(
    "/bits-auctions/profile/"
  )[1];

  if (userFromPath) {
    const userProfile = await fetchSingleProfile(userFromPath);

    const profile = userProfile as Profile;

    if (!profile) {
      window.location.pathname = "/bits-auctions/404.html";
      return;
    }

    return { userFromPath, profile: userProfile as Profile };
  }

  return { userFromPath };
};

export const getAuthenticatedUser = async () => {
  const userFromStorage = loadKey("user") as Profile;

  if (!userFromStorage) return null;

  const userFromApi = await fetchSingleProfile(
    userFromStorage ? userFromStorage.name : ""
  );
  return userFromApi as Profile;
};
