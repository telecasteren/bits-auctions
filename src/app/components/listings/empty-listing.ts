const EmptyListing = () => {
  const container = document.createElement("div");
  container.className =
    "flex flex-col items-center justify-center px-4 text-center";

  const header = document.createElement("div");
  header.className = "flex flex-col items-center gap-4 mb-6";

  const media = document.createElement("div");
  media.className =
    "flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4";

  const iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  iconSvg.setAttribute("width", "24");
  iconSvg.setAttribute("height", "24");
  iconSvg.setAttribute("viewBox", "0 0 24 24");
  iconSvg.setAttribute("fill", "none");
  iconSvg.setAttribute("stroke", "currentColor");
  iconSvg.setAttribute("stroke-width", "2");
  iconSvg.setAttribute("stroke-linecap", "round");
  iconSvg.setAttribute("stroke-linejoin", "round");
  iconSvg.setAttribute("class", "text-muted-foreground");

  const iconPath1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  iconPath1.setAttribute("d", "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z");

  const iconPath2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  iconPath2.setAttribute("d", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z");

  iconSvg.appendChild(iconPath1);
  iconSvg.appendChild(iconPath2);
  media.appendChild(iconSvg);

  const title = document.createElement("h3");
  title.className = "text-lg font-semibold";
  title.textContent = "No listings yet";

  const description = document.createElement("p");
  description.className = "text-sm text-muted-foreground max-w-sm";
  description.textContent =
    "You haven't created any listings yet. Get started by creating your first listing.";

  header.appendChild(media);
  header.appendChild(title);
  header.appendChild(description);

  const content = document.createElement("div");
  content.className = "flex gap-2 mb-4";

  const createButton = document.createElement("button");
  // createButton.className =
  //   "inline-flex items-center bg-[hsl(var(--accent-strong))] text-white hover:shadow-lg justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 hover:brightness-90 h-10 px-4 py-2 cursor-pointer";
  createButton.className = "btn bg-[var(--accent-strong)] text-white";
  createButton.textContent = "Create Listing";

  content.appendChild(createButton);

  // Learn more - FAQ?
  const learnMoreLink = document.createElement("a");
  learnMoreLink.id = "learn-more-link";
  learnMoreLink.href = "/bits-auctions/404.html";
  learnMoreLink.className =
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-9 px-4 py-2 text-muted-foreground";

  const learnMoreText = document.createTextNode("Learn More ");
  learnMoreLink.appendChild(learnMoreText);

  const arrowIcon = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg",
  );
  arrowIcon.setAttribute("width", "16");
  arrowIcon.setAttribute("height", "16");
  arrowIcon.setAttribute("viewBox", "0 0 24 24");
  arrowIcon.setAttribute("fill", "none");
  arrowIcon.setAttribute("stroke", "currentColor");
  arrowIcon.setAttribute("stroke-width", "2");
  arrowIcon.setAttribute("stroke-linecap", "round");
  arrowIcon.setAttribute("stroke-linejoin", "round");
  arrowIcon.setAttribute("class", "ml-1 inline-block");

  const arrowPath1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  arrowPath1.setAttribute("d", "M7 17L17 7");

  const arrowPath2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "path",
  );
  arrowPath2.setAttribute("d", "M7 7h10v10");

  arrowIcon.appendChild(arrowPath1);
  arrowIcon.appendChild(arrowPath2);
  learnMoreLink.appendChild(arrowIcon);

  container.appendChild(header);
  container.appendChild(content);
  container.appendChild(learnMoreLink);

  return container;
};

export default EmptyListing;
