import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";
import { isAuthenticated } from "@/utils/config/constants";
import { fetchSingleProfile } from "@/services/api/profiles/fetch-single-profile";
import { editProfile } from "@/app/events/profile/edit-profile";
import Header from "@/app/ui/features/account/header";
import { logOutUser } from "@/services/helpers/logout-user";
import { profileCards } from "./info-cards";

const Account = async () => {
  const container = document.querySelector("#content");
  container?.classList.add("max-w-[1000px]");
  if (!container) return;

  if (!isAuthenticated) {
    unAuthenticatedEvents();
    return;
  }

  const userFromStorage = loadKey("user") as Profile | undefined;
  const username = userFromStorage?.name || "";
  const user = await fetchSingleProfile(username);

  container.innerHTML = "";

  const header = await Header(user);
  const infoCards = profileCards(user);

  const logOutButton = logOutUser(false);
  logOutButton.classList.add("mt-60", "justify-self-end");

  container.appendChild(header);
  container.appendChild(infoCards);
  container.appendChild(logOutButton);

  // editAvatarEvent(user);
  editProfile(user);
};

export default Account;
