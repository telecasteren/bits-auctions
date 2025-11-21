import createBarChart from "@/app/components/charts/create-bar-chart";
import chartData from "@/app/components/charts/chart-data";
import createTrendingUpIcon from "@/app/components/charts/create-trends-icon";

const BarChart = () => {
  const card = document.createElement("div");
  card.className = "card";
  card.style.cssText = `
    border-radius: calc(var(--radius) - 2px);
    border: 1px solid hsl(var(--border));
    background-color: hsl(var(--card));
    color: hsl(var(--card-foreground));
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  `;

  const cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.style.cssText = `
    flex-direction: column;
    space-y: 1.5;
    padding: 1.5rem;
    padding-bottom: 0;
  `;

  const cardTitle = document.createElement("h3");
  cardTitle.className = "card-title";
  cardTitle.style.cssText = `
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -0.025em;
  `;
  cardTitle.textContent = "Bids weekly";

  const cardDescription = document.createElement("p");
  cardDescription.className = "card-description";
  cardDescription.style.cssText = `
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));
    margin-top: 0.375rem;
  `;
  cardDescription.textContent = "January - June 2024"; // Make dynamic

  cardHeader.appendChild(cardTitle);
  cardHeader.appendChild(cardDescription);

  const cardContent = document.createElement("div");
  cardContent.className = "card-content";
  cardContent.style.cssText = `
    padding: 1.5rem;
    padding-top: 0;
  `;

  const chart = createBarChart(chartData);
  cardContent.appendChild(chart);

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  cardFooter.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    padding: 1.5rem;
    padding-top: 0;
    font-size: 0.875rem;
  `;

  const trendingDiv = document.createElement("div");
  trendingDiv.style.cssText = `
    display: flex;
    gap: 0.5rem;
    line-height: 1;
    font-weight: 500;
    align-items: center;
  `;
  trendingDiv.textContent = "Trending up by 5.2% this week "; // Make dynamic
  trendingDiv.appendChild(createTrendingUpIcon());

  const descriptionDiv = document.createElement("div");
  descriptionDiv.style.cssText = `
    color: hsl(var(--muted-foreground));
    line-height: 1;
  `;
  descriptionDiv.textContent = "Showing total bids for the last 3 weeks"; // Make dynamic

  cardFooter.appendChild(trendingDiv);
  cardFooter.appendChild(descriptionDiv);

  card.appendChild(cardHeader);
  card.appendChild(cardContent);
  card.appendChild(cardFooter);

  return card;
};
export default BarChart;
