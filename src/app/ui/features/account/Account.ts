import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";
import { isAuthenticated } from "@/utils/config/constants";
import { fetchSingleProfile } from "@/services/api/profiles/fetch-single-profile";
import { editProfile } from "@/app/events/profile/edit-profile";
import Header from "@/app/ui/features/account/header";
import AccountDetails from "@/app/ui/features/account/details";

const Account = async () => {
  const container = document.querySelector("#content");
  if (!container) return;

  if (!isAuthenticated) {
    const restrictedMessage = unAuthenticatedEvents();
    container.appendChild(restrictedMessage);
    return;
  }

  const userFromStorage = loadKey("user") as Profile | undefined;
  const username = userFromStorage?.name || "";
  const user = await fetchSingleProfile(username);

  container.innerHTML = "";

  const header = await Header(user);
  const accountDetails = await AccountDetails(user);

  container.appendChild(header);
  container.appendChild(accountDetails);

  // editAvatarEvent(user);
  editProfile(user);
};

export default Account;
