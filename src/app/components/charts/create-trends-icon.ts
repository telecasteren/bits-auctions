const createTrendingUpIcon = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "h-4 w-4");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const polyline = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline",
  );
  polyline.setAttribute("points", "22,7 13.5,15.5 8.5,10.5 2,17");
  svg.appendChild(polyline);

  const polyline2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "polyline",
  );
  polyline2.setAttribute("points", "16,7 22,7 22,13");
  svg.appendChild(polyline2);

  return svg;
};
export default createTrendingUpIcon;
