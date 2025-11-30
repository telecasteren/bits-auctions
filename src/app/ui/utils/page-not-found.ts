const PageNotFound = () => {
  const container = document.getElementById("content");

  const notFoundContent = document.createElement("div");
  notFoundContent.className =
    "flex flex-col items-center justify-center h-full py-10";

  const header = document.createElement("h1");
  header.className = "text-4xl font-bold mb-4 text-[var(--accent-strong)]";
  header.textContent = "404 - Page Not Found";

  const description = document.createElement("p");
  description.className = "text-lg text-muted-foreground mb-6";
  description.textContent =
    "Sorry, the page you are looking for does not exist.";

  const goHomeButton = document.createElement("a");
  goHomeButton.href = "/overview";
  goHomeButton.textContent = "Go to Overview";
  goHomeButton.className =
    "inline-flex items-center btn bg-[var(--accent-strong)] text-white hover:bg-[var(--accent-strong)] px-4 py-2 rounded";

  notFoundContent.appendChild(header);
  notFoundContent.appendChild(description);
  notFoundContent.appendChild(goHomeButton);
  container?.appendChild(notFoundContent);
};
export default PageNotFound;
