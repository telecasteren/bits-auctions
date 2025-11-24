import type { Profile } from "@/services/types/profile";
import { loadKey } from "@/utils/storage/storage";
import { logOutUser } from "@/services/helpers/logout-user";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";
import { isAuthenticated } from "@/utils/config/constants";
import { fetchSingleProfile } from "@/services/api/profiles/fetch-single-profile";
import UserDetails from "@/app/components/forms/user-details/user-details";
import ListingTable from "@/app/components/listings/listing-table";
import EmptyListing from "@/app/components/listings/empty-listing";

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

  const infoWrapper = document.createElement("div");
  infoWrapper.id = "account-infoWrapper";
  infoWrapper.className = "flex flex-row items-center gap-6 mt-6";

  const infoBioWrapper = document.createElement("div");
  infoBioWrapper.className = "flex flex-col gap-2";

  const avatar = document.createElement("img");
  avatar.id = "account-avatar";
  avatar.src = user.avatar.url || "/no-avatar-img.jpg";
  avatar.alt = `${user.avatar.alt || `${username}'s avatar`}`;
  avatar.className = "w-22 h-22 rounded-full mb-4";

  const info = document.createElement("p");
  info.id = "account-info";
  info.innerHTML = `<b>Email:</b> ${user.email}`;

  const bio = document.createElement("p");
  bio.id = "account-bio";
  bio.innerHTML = `<b>Bio:</b> ${user.bio || "No bio available"}`;

  const settings = document.createElement("a");
  settings.href = "#";
  settings.className =
    "justify-self-center lg:justify-self-start text-md text-[hsl(var(--accent-strong))] hover:underline mb-4";
  settings.textContent = "Settings";

  const accountGrid = document.createElement("div");
  accountGrid.className = "grid grid-cols-1 gap-6 mt-6 mb-20";

  const table = ListingTable();

  const details = document.createElement("div");
  details.className = "w-full justify-self-center transition-all duration-300";

  const userDetailsForm = UserDetails(user);
  userDetailsForm.classList.add("hidden");

  const logOutButton = logOutUser();
  logOutButton.classList.add("justify-self-end");

  const numberOfListings = user.listings ? user.listings.length : 0;
  if (numberOfListings < 1) {
    const noListings = EmptyListing();
    accountGrid.appendChild(noListings);
  } else {
    accountGrid.appendChild(table);
  }

  settings.addEventListener("click", (e) => {
    e.preventDefault();
    details.scrollIntoView({ behavior: "smooth" });
    userDetailsForm.classList.remove("hidden");
  });

  container.appendChild(h1);
  container.appendChild(p);
  infoWrapper.appendChild(avatar);
  infoBioWrapper.appendChild(info);
  infoBioWrapper.appendChild(bio);
  infoBioWrapper.appendChild(settings);
  infoWrapper.appendChild(infoBioWrapper);
  container.appendChild(infoWrapper);

  details.appendChild(userDetailsForm);
  container.appendChild(details);

  container.appendChild(accountGrid);
  container.appendChild(logOutButton);
};

export default Account;
