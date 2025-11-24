import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";
import { logOutUser } from "@/services/helpers/logout-user";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";
import { isAuthenticated } from "@/utils/config/constants";
import { fetchSingleProfile } from "@/services/api/profiles/fetch-single-profile";
import UserDetails from "@/app/components/forms/user-details/user-details";
import ListingTable from "@/app/components/listings/listing-table";

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

  const h1 = document.createElement("h1");
  h1.id = "page-title";
  h1.textContent = `Welcome, ${username || "John Doe"}`;

  const p = document.createElement("p");
  p.id = "page-tagline";
  p.textContent = "Keep your account and listings up to date.";

  const info = document.createElement("p");
  info.id = "account-info";
  info.innerHTML = `<b>Email:</b> ${user.email}`;

  const accountGrid = document.createElement("div");
  accountGrid.className = "grid grid-cols-1 gap-6 mt-6 mb-20";

  const table = ListingTable();
  const profileDetails = UserDetails(user);
  profileDetails.className =
    "max-w-[300px] md:min-w-[500px] justify-self-center lg:justify-self-end lg:mr-8 transition-all";

  accountGrid.appendChild(profileDetails);
  accountGrid.appendChild(table);

  const logOutButton = logOutUser();

  container.appendChild(h1);
  container.appendChild(p);
  container.appendChild(info);
  container.appendChild(accountGrid);
  container.appendChild(logOutButton);
};

export default Account;
