import ListingCards from "@/app/components/listings/listing-cards";
import ListingTable from "@/app/components/listings/listing-table";

const Listings = () => {
  const container = document.querySelector("#content");
  if (!container) return;

  container.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.className = "mb-6 text-2xl font-semibold";
  h1.textContent = "Listings";

  const searchContainer = document.createElement("div");
  searchContainer.className = "mb-4";

  const searchInput = document.createElement("input");
  searchInput.id = "listing-search";
  searchInput.type = "text";
  searchInput.placeholder = "Search listings...";
  searchInput.className = `w-full rounded border border-input bg-background px-3 py-2 placeholder:text-muted-foreground
  focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`;

  const tabMenu = document.createElement("div");
  tabMenu.className =
    "flex flex-wrap gap-4 items-center w-full sticky top-0 left-0 mb-6 pb-2";

  const tableView = document.createElement("a");
  tableView.href = "#";
  tableView.id = "listings-tableView";
  tableView.textContent = "Table view";
  tableView.className = "active mb-4 flex items-center";

  const cardView = document.createElement("a");
  cardView.href = "#";
  cardView.id = "listings-cardView";
  cardView.textContent = "Card view";
  cardView.className = "mb-4 fit-content flex flex-col gap-6 items-center";

  const table = ListingTable();
  const cards = ListingCards();
  cards.classList.add("hidden");

  const viewsWrapper = document.createElement("div");
  viewsWrapper.className = "flex flex-col mt-12 gap-6 mx-auto max-w-6xl";
  viewsWrapper.appendChild(table);
  viewsWrapper.appendChild(cards);

  const tabMenuElements = [tableView, cardView];

  tabMenuElements.forEach((tab) => {
    tab.addEventListener("click", (e) => {
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
    });
  });

  container.appendChild(h1);
  searchContainer.appendChild(searchInput);
  container.appendChild(searchContainer);

  tabMenu.appendChild(tableView);
  tabMenu.appendChild(cardView);
  container.appendChild(tabMenu);
  container.appendChild(viewsWrapper);
};

export default Listings;
