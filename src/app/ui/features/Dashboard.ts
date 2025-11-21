import BarChart from "@/app/components/charts/bar-chart";

const loadDashboard = () => {
  const container = document.querySelector("#content");

  container.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.id = "page-title";
  h1.textContent = "Bits Auction-house";

  const p = document.createElement("p");
  p.id = "page-tagline";
  p.textContent = "Monitor your auctions and bids in real-time.";

  container.appendChild(h1);
  container.appendChild(p);

  const chartComponent = BarChart();
  container.appendChild(chartComponent);
};

export default loadDashboard;
