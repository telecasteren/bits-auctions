export const ProfileSkeleton = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-6 max-w-[1000px] mx-auto p-6";

  const avatarRow = document.createElement("div");
  avatarRow.className = "flex flex-row gap-4 items-center";

  const avatar = document.createElement("div");
  avatar.className = "w-24 h-24 rounded-full bg-gray-800 animate-pulse";

  const name = document.createElement("div");
  name.className = "w-38 h-10 rounded-md bg-gray-800 animate-pulse";

  const infoRow = document.createElement("div");
  infoRow.className = "flex flex-row gap-6 mt-6";

  const email = document.createElement("div");
  email.className = "w-40 h-6 rounded-md bg-gray-800 animate-pulse";

  const verified = document.createElement("div");
  verified.className = "w-24 h-6 rounded-md bg-gray-800 animate-pulse";

  const bio = document.createElement("div");
  bio.className = "w-80 h-6 rounded-md bg-gray-800 animate-pulse mb-2";

  const hr = document.createElement("div");
  hr.className = "h-[1px] w-full bg-gray-800 my-4";

  const listingsTitle = document.createElement("div");
  listingsTitle.className =
    "w-32 h-8 rounded-md bg-gray-800 animate-pulse mb-4";

  const listings = document.createElement("div");
  listings.className = "grid grid-cols-1 md:grid-cols-3 gap-4 w-full";
  for (let i = 0; i < 3; i++) {
    const card = document.createElement("div");
    card.className = "h-48 rounded-md bg-gray-800 animate-pulse";
    listings.appendChild(card);
  }

  avatarRow.appendChild(avatar);
  avatarRow.appendChild(name);
  wrapper.appendChild(avatarRow);
  infoRow.appendChild(email);
  infoRow.appendChild(verified);
  wrapper.appendChild(infoRow);
  wrapper.appendChild(bio);
  wrapper.appendChild(hr);
  wrapper.appendChild(listingsTitle);
  wrapper.appendChild(listings);

  return wrapper;
};
