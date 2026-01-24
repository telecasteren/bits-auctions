export const AccountSkeleton = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-6 max-w-[1000px] mx-auto p-6";

  const header = document.createElement("div");
  header.className = "w-98 h-12 rounded-md bg-gray-800 animate-pulse";

  const avatar = document.createElement("div");
  avatar.className = "w-24 h-24 rounded-full bg-gray-800 animate-pulse";

  const infoRow = document.createElement("div");
  infoRow.className = "flex flex-col gap-6 mt-6";

  const email = document.createElement("div");
  email.className = "w-40 h-6 rounded-md bg-gray-800 animate-pulse";

  const verified = document.createElement("div");
  verified.className = "w-24 h-6 rounded-md bg-gray-800 animate-pulse";

  const hr = document.createElement("div");
  hr.className = "h-[1px] w-full bg-gray-800 my-4";

  const cards = document.createElement("div");
  cards.className = "grid grid-cols-1 md:grid-cols-3 gap-4 w-full";
  for (let i = 0; i < 3; i++) {
    const card = document.createElement("div");
    card.className = "h-48 rounded-md bg-gray-800 animate-pulse";
    cards.appendChild(card);
  }

  wrapper.appendChild(header);
  infoRow.appendChild(avatar);
  infoRow.appendChild(email);
  infoRow.appendChild(verified);
  wrapper.appendChild(infoRow);
  wrapper.appendChild(hr);
  wrapper.appendChild(cards);

  return wrapper;
};
