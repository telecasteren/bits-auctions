import { searchListings } from "@/services/api/listings/search/search-listings";
import ListingCards from "@/app/components/listings/listing-cards";
import ListingTable from "@/app/components/listings/listing-table";

export const renderSearchResults = async (query: string) => {
  const listingsResponse = await searchListings(query);
  const listings = listingsResponse.data ?? [];

  const table = await ListingTable(listings);
  const cards = ListingCards(listings);

  const container = document.querySelector("#listings-wrapper");
  if (!container) return;

  container.innerHTML = "";

  const cardView = document.getElementById("listings-cardView");
  const showCards = cardView?.classList.contains("active");

  if (showCards) {
    cards.classList.remove("hidden");
    table.classList.add("hidden");
    container.appendChild(cards);
  } else {
    table.classList.remove("hidden");
    cards.classList.add("hidden");
    container.appendChild(table);
  }
};
