import type { Profile } from "@/services/types/profile";
import UserDetails from "@/app/components/forms/user-details/user-details";

const Header = async (user: Profile) => {
  const container = document.createElement("div");
  const username = user.name || "";
  const userAvatar = user.avatar.url || "/no-avatar-img.jpg";
  const userAvatarAlt = `${user.avatar.alt || `${username}'s avatar`}`;
  const userEmail = user.email || "";
  const userBio = `${user.bio || "No bio available"}`;

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
  info.innerHTML = `<b>Email:</b> ${userEmail}`;

  const bio = document.createElement("p");
  bio.id = "account-bio";
  bio.innerHTML = `<b>Bio:</b> ${userBio}`;

  const details = document.createElement("div");
  details.className = "w-full justify-self-center transition-all duration-300";

  const userDetailsForm = UserDetails(user);
  userDetailsForm.classList.add("hidden");

  const settings = document.createElement("a");
  settings.href = "#";
  settings.className =
    "justify-self-center lg:justify-self-start text-md text-[hsl(var(--accent-strong))] hover:underline mb-4";
  settings.textContent = "Settings";

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

  return container;
};

export default Header;
