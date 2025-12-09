import { getStatusBadge } from "./get-status-badge";
import { icons } from "./icons";
import createButton from "./create-button";
import type { Listing } from "@/services/types/listing";
import SingleListing from "@/app/ui/features/single-listing";

const renderTaskRow = (listing: Listing) => {
  const row = document.createElement("tr");
  row.setAttribute("data-id", listing.id);
  row.className =
    "border-b group transition-colors hover:bg-[#1e293b0f] inner-shadow-md data-[state=selected]:bg-muted cursor-pointer";

  const titleTd = document.createElement("td");
  titleTd.className = "pl-10 align-middle px-4 py-4 font-medium";
  const titleSpan = document.createElement("span");
  titleSpan.className = "block truncate cursor-help";
  titleSpan.textContent = listing.title;
  titleSpan.title = listing.title;
  titleTd.appendChild(titleSpan);
  row.appendChild(titleTd);

  const sellerTd = document.createElement("td");
  sellerTd.className =
    "text-center align-middle px-4 py-4 text-sm text-muted-foreground";
  sellerTd.textContent = listing.seller.name;
  row.appendChild(sellerTd);

  const statusTd = document.createElement("td");
  statusTd.className = "text-center align-middle px-4 py-4";
  statusTd.appendChild(
    getStatusBadge(listing.endsAt > new Date() ? "active" : "ended")
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

  const actionsTd = document.createElement("td");
  actionsTd.className = "text-center align-middle px-6 py-4";
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "flex items-center gap-1";

  const viewButton = createButton(icons.file, "View Details");

  actionsDiv.appendChild(viewButton);
  actionsTd.appendChild(actionsDiv);
  row.appendChild(actionsTd);

  row.addEventListener("click", async () => {
    SingleListing(listing);
    window.history.pushState({}, "", `/bits-auctions/listings/${listing.id}`);
  });

  return row;
};

export { renderTaskRow };
