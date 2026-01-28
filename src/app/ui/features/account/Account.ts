import { getAuthenticatedUser } from "@/services/helpers/get-current-user";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";
import { isAuthenticated } from "@/utils/config/constants";
import { fetchSingleProfile } from "@/services/api/profiles/fetch/fetch-single-profile";
import Header from "@/app/ui/features/account/header";
import { logOutUser } from "@/services/helpers/logout-user";
import { profileCards } from "./info-cards";
import { backButton } from "@/app/components/back-button";
import { AccountSkeleton } from "@/app/components/skeletons/account-skeleton";
import { Profile } from "@/services/types/profile";

const Account = async () => {
  const container = document.querySelector("#content");
  container?.classList.add("max-w-[1000px]");
  if (!container) return;

  if (!isAuthenticated) {
    unAuthenticatedEvents();
    return;
  }

  container.appendChild(AccountSkeleton());

  const userFromStorage = await getAuthenticatedUser();
  const username = userFromStorage?.name as Profile["name"];
  const user = await fetchSingleProfile(username);

  container.innerHTML = "";

  const backBtn = backButton(user);
  const header = await Header(user);
  const infoCards = profileCards(user);

  const hr = document.createElement("hr");
  hr.className = "mt-4 w-full border-gray-300 dark:border-gray-700";

  const logOutButton = logOutUser(false);
  logOutButton.classList.add("mt-60", "justify-self-end");

  container.appendChild(backBtn);
  container.appendChild(header);
  container.appendChild(hr);
  container.appendChild(infoCards);
  container.appendChild(logOutButton);
};

export default Account;
