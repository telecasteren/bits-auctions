import { getStatusBadge } from "./get-status-badge";
import type { Listing } from "@/services/types/listing";
import { renderApp } from "@/services/helpers/render-app";

const renderRow = (listing: Listing, hideSeller: boolean = false) => {
  const row = document.createElement("tr");
  row.setAttribute("data-id", listing.id);
  row.className =
    "border-b group transition-colors hover:bg-[#1e293b0f] inner-shadow-md data-[state=selected]:bg-muted cursor-pointer";

  const coverImageTd = document.createElement("td");
  coverImageTd.className = "pl-4 align-middle px-4 py-4 text-center";
  const image = document.createElement("img");
  image.className = "w-12 h-12 object-cover rounded-md mx-auto";
  image.src = listing.media.length > 0 ? listing.media[0].url : "";
  image.alt = listing.title;
  coverImageTd.appendChild(image);
  row.appendChild(coverImageTd);

  const titleTd = document.createElement("td");
  titleTd.className =
    "pl-10 hidden md:table-cell align-middle px-4 py-4 font-medium";
  const titleSpan = document.createElement("span");
  titleSpan.className = "block cursor-help truncate";
  titleSpan.textContent = listing.title;
  titleTd.appendChild(titleSpan);
  row.appendChild(titleTd);

  const statusTd = document.createElement("td");
  statusTd.className = "text-center align-middle px-4 py-4";
  statusTd.appendChild(
    getStatusBadge(new Date(listing.endsAt) > new Date() ? "active" : "ended"),
  );
  row.appendChild(statusTd);

  const endsAtDate = document.createElement("td");
  endsAtDate.className =
    "text-center align-middle hidden md:table-cell px-4 py-4 text-sm text-muted-foreground";
  endsAtDate.textContent = new Date(listing.endsAt).toLocaleDateString();
  row.appendChild(endsAtDate);

  const descriptionTd = document.createElement("td");
  descriptionTd.className =
    "text-center align-middle hidden md:table-cell px-4 py-4 max-w-[300px] text-sm text-muted-foreground";
  const descriptionSpan = document.createElement("span");
  descriptionSpan.className = "block cursor-help truncate";
  descriptionSpan.textContent = listing.description;
  descriptionSpan.title = listing.description;
  descriptionTd.appendChild(descriptionSpan);
  row.appendChild(descriptionTd);

  const sellerTd = document.createElement("td");
  sellerTd.className =
    "text-center align-middle px-4 py-4 hidden md:table-cell text-sm text-muted-foreground block cursor-help truncate";
  if (hideSeller) {
    sellerTd.classList.remove("md:table-cell");
  }
  sellerTd.textContent = listing.seller?.name;
  row.appendChild(sellerTd);

  row.addEventListener("click", async () => {
    window.history.pushState({}, "", `/listings/${listing.id}`);
    renderApp();
  });

  return row;
};

export { renderRow };
