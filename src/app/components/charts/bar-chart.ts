import createBarChart from "@/app/components/charts/create-bar-chart";
import { getBidsPerMonth } from "@/app/components/charts/get-monthly-bids";
import { getMonthlyTrends } from "@/app/components/charts/get-monthly-trends";
import createTrendingUpIcon from "@/app/components/charts/create-trends-icon";
import {
  currentMonths,
  currentYear,
} from "@/services/helpers/calculate-months";
import type { Profile } from "@/services/types/profile";

const BarChart = async (userName?: Profile) => {
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

  const bidsChart = document.createElement("div");
  bidsChart.className = "flex flex-row gap-4 mb-4 text-sm";

  const allBidsChart = document.createElement("p");
  allBidsChart.className = "hover:underline cursor-pointer";
  allBidsChart.textContent = "All bids";

  const userBidsChart = document.createElement("p");
  userBidsChart.id = "user-bids-btn";
  userBidsChart.className = "hover:underline cursor-pointer";
  userBidsChart.textContent = "My bids";

  let chart = createBarChart(
    await getBidsPerMonth({
      onlyCurrentUser: false,
      currentUserName: userName?.name,
    }),
  );

  allBidsChart.addEventListener("click", async () => {
    chart.innerHTML = "";
    const newChart = createBarChart(
      await getBidsPerMonth({
        onlyCurrentUser: false,
        currentUserName: userName?.name,
      }),
    );
    chart.replaceWith(newChart);
    chart = newChart;
  });

  userBidsChart.addEventListener("click", async () => {
    if (!userName?.name) {
      alert("Can't find user. User possibly undefined.");
      return;
    }

    chart.innerHTML = "";
    const newChart = createBarChart(
      await getBidsPerMonth({
        onlyCurrentUser: true,
        currentUserName: userName.name,
      }),
    );
    chart.replaceWith(newChart);
    chart = newChart;
  });

  cardContent.appendChild(bidsChart);
  bidsChart.appendChild(allBidsChart);
  bidsChart.appendChild(userBidsChart);
  cardContent.appendChild(chart);

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";

  const trends = await getMonthlyTrends();
  const trendingDiv = document.createElement("div");
  trendingDiv.className = "trending-up";
  trendingDiv.textContent = trends.text;
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
