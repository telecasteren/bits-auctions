import BarChart from "@/app/components/charts/bar-chart";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";
import { isAuthenticated } from "@/utils/config/constants";
import { getAuthenticatedUser } from "@/services/helpers/get-current-user";
import { OverviewSkeleton } from "@/app/components/skeletons/overview-skeleton";
import type { Profile } from "@/services/types/profile";

const Dashboard = async () => {
  const container = document.querySelector("#content");
  if (!container) return;

  if (!isAuthenticated()) {
    unAuthenticatedEvents();
    return;
  }

  container.innerHTML = "";
  container.appendChild(OverviewSkeleton());

  const currentUser = (await getAuthenticatedUser()) as Profile;
  const chartComponent = await BarChart(currentUser);

  container.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.id = "page-title";
  h1.textContent = "Overview";

  const p = document.createElement("p");
  p.id = "page-tagline";
  p.textContent = "Monitor your listings and bids in real-time.";

  container.appendChild(h1);
  container.appendChild(p);
  container.appendChild(chartComponent);
};

export default Dashboard;
