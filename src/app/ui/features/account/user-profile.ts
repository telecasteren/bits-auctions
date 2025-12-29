import type { Profile } from "@/services/types/profile";
import { backButton } from "@/app/components/back-button";
import { fetchListingsByProfile } from "@/services/api/listings/fetch/fetch-profile-listings";
import ListingCards from "@/app/components/listings/listing-cards";

const UserProfile = async (user: Profile) => {
  const username = user.name || "John Doe";
  const userAvatar =
    user.avatar.url ||
    user.name.charAt(0).toUpperCase() ||
    "/no-avatar-img.jpg";
  const userAvatarAlt = `${user.avatar.alt || `${username}'s avatar`}`;
  const userEmail = user.email || "";
  const userBio = `${user.bio || "No bio available"}`;

  const container = document.querySelector("#content");
  if (!container) return;
  container?.classList.add("max-w-[1000px]");

  container.innerHTML = "";

  const backBtn = backButton(user, true);

  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-rows gap-4 items-center";

  const avatar = document.createElement("img");
  avatar.id = "account-avatar";
  avatar.src = userAvatar;
  avatar.alt = userAvatarAlt;
  avatar.className = "w-22 h-22 rounded-full";
  wrapper.appendChild(avatar);

  const h1 = document.createElement("h1");
  h1.id = "page-title";
  h1.textContent = username;
  wrapper.appendChild(h1);

  const infoWrapper = document.createElement("div");
  infoWrapper.id = "account-infoWrapper";
  infoWrapper.className = "flex flex-row items-center gap-6 mt-6";

  const infoBioWrapper = document.createElement("div");
  infoBioWrapper.className = "flex flex-col gap-2";

  const info = document.createElement("p");
  info.id = "account-info";
  info.innerHTML = userEmail;

  const verifiedContainer = document.createElement("div");
  verifiedContainer.id = "account-verified-container";
  verifiedContainer.className = "flex flex-row items-center gap-2";

  const verifiedText = document.createElement("p");
  verifiedText.id = "account-verified-text";
  verifiedText.className = "font-bold";
  verifiedText.textContent = "Verified user";

  const verifiedBadge = document.createElement("p");
  verifiedBadge.id = "account-verified-badge";
  verifiedBadge.innerHTML = `<span style="color:var(--selector-background);">&#10004;</span>`; // Use proper checkmark icon

  const bio = document.createElement("p");
  bio.id = "account-bio";
  bio.innerHTML = `<b>Bio:</b> ${userBio}`;

  const hr = document.createElement("hr");
  hr.className = "my-4 border-gray-300 dark:border-gray-700";

  const listingsContainer = document.createElement("div");
  listingsContainer.id = "account-listings-container";
  listingsContainer.className = "mt-6";
  listingsContainer.innerHTML = `<h2 class="text-xl font-bold mb-4">Listings</h2>`;

  const listings = await fetchListingsByProfile(username);

  if (listings.length === 0) {
    const noListingsText = document.createElement("p");
    noListingsText.textContent = "This user has no listings.";
    listingsContainer.appendChild(noListingsText);
  } else {
    const listingsList = ListingCards(listings);
    listingsContainer.appendChild(listingsList);
  }

  container.appendChild(backBtn);
  container.appendChild(wrapper);
  infoBioWrapper.appendChild(info);

  verifiedContainer.appendChild(verifiedText);
  verifiedContainer.appendChild(verifiedBadge);
  infoBioWrapper.appendChild(verifiedContainer);
  infoBioWrapper.appendChild(bio);

  infoWrapper.appendChild(infoBioWrapper);
  container.appendChild(infoWrapper);
  container.appendChild(hr);
  container.appendChild(listingsContainer);
};

export default UserProfile;
