import { renderTaskRow } from "./helpers/render-task-row";
import type { Listing } from "@/services/types/listing";

const ListingTable = async (listings: Listing[]) => {
  const container = document.createElement("div");
  container.className =
    "mx-auto max-w-6xl overflow-x-auto rounded-lg border bg-card w-full";

  const table = document.createElement("table");
  table.className = "w-full caption-bottom text-sm table-fixed";

  const thead = document.createElement("thead");
  thead.className = "[&_tr]:border-b";

  const headerRow = document.createElement("tr");
  headerRow.className = "border-b transition-colors hover:bg-transparent";

  const headers = [
    {
      text: "Title",
      className:
        "h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
    },
    {
      text: "Seller",
      className:
        "h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
    },
    {
      text: "Status",
      className:
        "h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[120px]",
    },
    {
      text: "Added date",
      className:
        "h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
    },
    {
      text: "Description",
      className:
        "h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
    },
    {
      text: "Actions",
      className:
        "h-12 px-4 text-center align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 w-[180px]",
    },
  ];

  headers.forEach((header) => {
    const th = document.createElement("th");
    th.className = header.className;
    th.textContent = header.text;
    headerRow.appendChild(th);
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  tbody.className = "[&_tr:last-child]:border-0";

  listings.forEach((listing) => {
    tbody.appendChild(renderTaskRow(listing));
  });

  table.appendChild(tbody);
  container.appendChild(table);

  return container;
};

export default ListingTable;
