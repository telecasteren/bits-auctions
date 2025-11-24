import createBarChart from "@/app/components/charts/create-bar-chart";
import chartData from "@/app/components/charts/chart-data";
import createTrendingUpIcon from "@/app/components/charts/create-trends-icon";
import {
  currentMonths,
  currentYear,
} from "@/services/helpers/calculate-months";

const BarChart = () => {
  const card = document.createElement("div");
  card.className = "card";

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";

  const cardTitle = document.createElement("h3");
  cardTitle.className = "card-title";
  cardTitle.textContent = "Bids monthly";

  const cardDescription = document.createElement("p");
  cardDescription.className = "card-description";
  cardDescription.textContent = `${currentMonths().range} ${currentYear()}`;

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(cardDescription);

  const cardContent = document.createElement("div");
  cardContent.className = "card-content";

  const chart = createBarChart(chartData);
  cardContent.appendChild(chart);

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";

  const trendingDiv = document.createElement("div");
  trendingDiv.className = "trending-up";
  trendingDiv.textContent = `Trending up by ${5.2}% this month `; // Make dynamic
  trendingDiv.appendChild(createTrendingUpIcon());

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "card-description";
  descriptionDiv.textContent = `Showing total bids for the last ${currentMonths().length} months`;

  cardFooter.appendChild(trendingDiv);
  cardFooter.appendChild(descriptionDiv);

  card.appendChild(cardHeader);
  card.appendChild(cardContent);
  card.appendChild(cardFooter);

  return card;
};
export default BarChart;
