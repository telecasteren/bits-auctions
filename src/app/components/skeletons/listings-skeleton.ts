export const ListingsSkeleton = () => {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-6 max-w-[1000px] mx-auto p-6";

  const title = document.createElement("div");
  title.className = "w-40 h-10 rounded-md bg-gray-800 animate-pulse mb-6";

  const searchInput = document.createElement("div");
  searchInput.className =
    "w-full h-10 rounded-md bg-gray-800 animate-pulse mb-4";

  const tabMenu = document.createElement("div");
  tabMenu.className = "flex gap-4 mt-4";
  for (let i = 0; i < 2; i++) {
    const tab = document.createElement("div");
    tab.className = "w-24 h-8 rounded-md bg-gray-800 animate-pulse";
    tabMenu.appendChild(tab);
  }

  const cards = document.createElement("div");
  cards.className = "grid grid-cols-1 md:grid-cols-3 gap-6";
  for (let i = 0; i < 6; i++) {
    const card = document.createElement("div");
    card.className = "h-48 rounded-md bg-gray-800 animate-pulse";
    cards.appendChild(card);
  }

  wrapper.appendChild(title);
  wrapper.appendChild(searchInput);
  wrapper.appendChild(tabMenu);
  wrapper.appendChild(cards);

  return wrapper;
};
