export const StyleGuide = () => {
  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = "";

  const pdfUrl = `${import.meta.env.BASE_URL}styleguidepdf.pdf`;

  const container = document.createElement("div");
  container.id = "style-guide-container";

  const heading = document.createElement("h1");
  heading.id = "page-title";
  heading.classList.add("mb-6");
  heading.textContent = "Style Guide";

  const objectEl = document.createElement("object");
  objectEl.data = pdfUrl;
  objectEl.type = "application/pdf";
  objectEl.width = "100%";
  objectEl.height = "600";

  const fallbackText = document.createElement("p");
  fallbackText.textContent = "Your browser does not support PDFs.";

  const fallbackLink = document.createElement("a");
  fallbackLink.href = pdfUrl;
  fallbackLink.textContent = "Download the PDF.";

  container.appendChild(heading);
  fallbackText.appendChild(fallbackLink);
  objectEl.appendChild(fallbackText);
  container.appendChild(objectEl);
  content.appendChild(container);
};
