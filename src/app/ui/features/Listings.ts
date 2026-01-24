import ListingCards from "@/app/components/listings/listing-cards";
import ListingTable from "@/app/components/listings/listing-table";
import { fetchAllListings } from "@/services/api/listings/fetch/fetch-all-listings";
import { renderSearchResults } from "@/app/events/listing/search";
import { ListingsSkeleton } from "@/app/components/skeletons/listings-skeleton";

const Listings = async () => {
  const container = document.querySelector("#content");
  container?.classList.add("max-w-[1000px]");
  if (!container) return;

  container.innerHTML = "";

  const loader = ListingsSkeleton();
  container.appendChild(loader);

  const listingsResponse = await fetchAllListings(20, 1);
  const listings = listingsResponse.data ?? [];

  container.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.id = "page-title";
  h1.className = "mb-6";
  h1.textContent = "Listings";

  const searchContainer = document.createElement("div");
  searchContainer.className = "mb-4";

  const searchInput = document.createElement("input");
  searchInput.id = "listing-search";
  searchInput.type = "text";
  searchInput.placeholder = "Search listings...";
  searchInput.className = `w-full rounded border border-input bg-background px-3 py-2 placeholder:text-muted-foreground
  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`;

  searchInput.addEventListener("input", async (e) => {
    const target = e.target as HTMLInputElement;
    const query = target.value.trim();

    await renderSearchResults(query);
    console.log("Searching for:", query);
  });

  const tabMenu = document.createElement("div");
  tabMenu.className =
    "flex flex-wrap gap-4 items-center w-full sticky top-0 left-0 border-b border-gray-300";

  const tableView = document.createElement("a");
  tableView.href = "#";
  tableView.id = "listings-tableView";
  tableView.textContent = "Table view";
  tableView.className = "flex items-center transition duration-300 ease-in-out";

  const cardView = document.createElement("a");
  cardView.href = "#";
  cardView.id = "listings-cardView";
  cardView.textContent = "Card view";
  cardView.className =
    "active fit-content flex flex-col gap-6 items-center transition duration-300 ease-in-out";

  const nextPageButton = document.createElement("button");
  nextPageButton.id = "next-page-button";
  nextPageButton.textContent = "See more";
  nextPageButton.className = "btn-secondary";

  let table = await ListingTable(listings);
  let cards = ListingCards(listings);
  table.classList.add("hidden");

  const viewsWrapper = document.createElement("div");
  viewsWrapper.id = "listings-wrapper";
  viewsWrapper.className = "flex flex-col mt-12 gap-6 mx-auto max-w-6xl";
  viewsWrapper.appendChild(table);
  viewsWrapper.appendChild(cards);

  let currentPage = 1;
  let allListings = [...listings];

  nextPageButton.addEventListener("click", async () => {
    nextPageButton.disabled = true;

    try {
      currentPage += 1;
      const listingsResponse = await fetchAllListings(10, currentPage);
      const next = listingsResponse.data ?? [];

      if (next.length === 0) {
        nextPageButton.disabled = true;
        nextPageButton.textContent = "You reached the end :)";
        return;
      }

      allListings = [...allListings, ...next];

      const newTable = await ListingTable(allListings);
      const newCards = ListingCards(allListings);

      const isTableActive = tableView.classList.contains("active");
      newTable.classList.toggle("hidden", !isTableActive);
      newCards.classList.toggle("hidden", isTableActive);

      table.replaceWith(newTable);
      cards.replaceWith(newCards);
      table = newTable;
      cards = newCards;
    } finally {
      nextPageButton.disabled = false;
    }
  });

  const tabMenuElements = [tableView, cardView];

  tabMenuElements.forEach((tab) => {
    tab.addEventListener("click", async (e) => {
      e.preventDefault();

      if (tab === tableView) {
        table.classList.remove("hidden");
        cards.classList.add("hidden");
        tableView.classList.add("active");
        cardView.classList.remove("active");
      } else {
        cards.classList.remove("hidden");
        table.classList.add("hidden");
        cardView.classList.add("active");
        tableView.classList.remove("active");
      }

      const isQuery = searchInput.value.trim();
      if (isQuery) {
        await renderSearchResults(isQuery);
      }
    });
  });

  container.appendChild(h1);
  searchContainer.appendChild(searchInput);
  container.appendChild(searchContainer);

  tabMenu.appendChild(cardView);
  tabMenu.appendChild(tableView);
  container.appendChild(tabMenu);
  container.appendChild(viewsWrapper);
  container.appendChild(nextPageButton);
};

export default Listings;
