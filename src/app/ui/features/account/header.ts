import type { Profile } from "@/services/types/profile";
import { previewProfile } from "@/services/helpers/preview-profile";
import { saveKey } from "@/utils/storage/storage";

const Header = async (user: Profile) => {
  const container = document.createElement("div");
  const username = user.name || "";
  const userAvatar =
    user.avatar.url ||
    user.name.charAt(0).toUpperCase() ||
    "/no-avatar-img.jpg";
  const userAvatarAlt = `${user.avatar.alt || `${username}'s avatar`}`;
  const userEmail = user.email || "";

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
  avatar.src = userAvatar;
  avatar.alt = userAvatarAlt;
  avatar.className = "w-22 h-22 rounded-full mb-4";

  const info = document.createElement("p");
  info.id = "account-info";
  info.innerHTML = userEmail;

  const creditsWrapper = document.createElement("div");
  creditsWrapper.id = "account-credits-wrapper";
  creditsWrapper.className = "flex flex-row items-center gap-2";

  const walletIcon = document.createElement("span");
  walletIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;
  creditsWrapper.appendChild(walletIcon);

  const creditsLabel = document.createElement("p");
  creditsLabel.textContent = "Credits:";
  creditsWrapper.appendChild(creditsLabel);

  const credits = document.createElement("p");
  credits.id = "account-credits";
  credits.textContent = (user.credits || 0).toString();
  saveKey("credits", user.credits || 0);
  creditsWrapper.appendChild(credits);

  const verifiedContainer = document.createElement("div");
  verifiedContainer.id = "account-verified-container";
  verifiedContainer.className = "flex flex-row items-center gap-2";

  const verifiedBadge = document.createElement("p");
  verifiedBadge.id = "account-verified-badge";
  verifiedBadge.innerHTML = `<span style="color:var(--selector-background);">&#10004;</span>`;

  const verifiedText = document.createElement("p");
  verifiedText.id = "account-verified-text";
  verifiedText.className = "font-bold";
  verifiedText.textContent = "Verified user";

  const details = document.createElement("div");
  details.className = "w-full justify-self-center transition-all duration-300";

  const profile = document.createElement("a");
  profile.href = "#";
  profile.className =
    "justify-self-center lg:justify-self-start text-md text-[var(--accent-strong)] hover:underline mb-4";
  profile.textContent = "Profile";

  profile.addEventListener("click", async (e) => {
    e.preventDefault();
    previewProfile(user);
  });

  container.appendChild(h1);
  container.appendChild(p);
  infoWrapper.appendChild(avatar);
  infoBioWrapper.appendChild(info);
  infoBioWrapper.appendChild(creditsWrapper);

  verifiedContainer.appendChild(verifiedText);
  verifiedContainer.appendChild(verifiedBadge);
  infoBioWrapper.appendChild(verifiedContainer);

  infoBioWrapper.appendChild(profile);
  infoWrapper.appendChild(infoBioWrapper);

  container.appendChild(infoWrapper);
  container.appendChild(details);

  return container;
};

export default Header;
