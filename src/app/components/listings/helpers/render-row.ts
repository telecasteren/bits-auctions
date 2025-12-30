import { getStatusBadge } from "./get-status-badge";
import type { Listing } from "@/services/types/listing";
import SingleListing from "@/app/ui/features/single-listing";

const renderRow = (listing: Listing, hideSeller: boolean = false) => {
  const row = document.createElement("tr");
  row.setAttribute("data-id", listing.id);
  row.className =
    "border-b group transition-colors hover:bg-[#1e293b0f] inner-shadow-md data-[state=selected]:bg-muted cursor-pointer";

  const coverImageTd = document.createElement("td");
  coverImageTd.className = "pl-4 align-middle px-4 py-4";
  const image = document.createElement("img");
  image.className = "w-12 h-12 object-cover rounded-md justify-self-center";
  image.src = listing.media.length > 0 ? listing.media[0].url : "";
  image.alt = listing.title;
  coverImageTd.appendChild(image);
  row.appendChild(coverImageTd);

  const titleTd = document.createElement("td");
  titleTd.className = "pl-10 align-middle px-4 py-4 font-medium";
  const titleSpan = document.createElement("span");
  titleSpan.className = "block cursor-help truncate";
  titleSpan.textContent = listing.title;
  titleTd.appendChild(titleSpan);
  row.appendChild(titleTd);

  const statusTd = document.createElement("td");
  statusTd.className = "text-center align-middle px-4 py-4";
  statusTd.appendChild(
    getStatusBadge(new Date(listing.endsAt) > new Date() ? "active" : "ended")
  );
  row.appendChild(statusTd);

  const createdDate = document.createElement("td");
  createdDate.className =
    "text-center align-middle px-4 py-4 text-sm text-muted-foreground";
  createdDate.textContent = new Date(listing.created).toLocaleDateString();
  row.appendChild(createdDate);

  const descriptionTd = document.createElement("td");
  descriptionTd.className =
    "text-center align-middle px-4 py-4 max-w-[300px] text-sm text-muted-foreground";
  const descriptionSpan = document.createElement("span");
  descriptionSpan.className = "block cursor-help truncate";
  descriptionSpan.textContent = listing.description;
  descriptionSpan.title = listing.description;
  descriptionTd.appendChild(descriptionSpan);
  row.appendChild(descriptionTd);

  const sellerTd = document.createElement("td");
  sellerTd.className =
    "text-center align-middle px-4 py-4 text-sm text-muted-foreground block cursor-help truncate" +
    (hideSeller ? " hidden" : "");
  sellerTd.textContent = listing.seller?.name;
  row.appendChild(sellerTd);

  row.addEventListener("click", async () => {
    SingleListing(listing);
    window.history.pushState({}, "", `/bits-auctions/listings/${listing.id}`);
  });

  return row;
};

export { renderRow };
