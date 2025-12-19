import BarChart from "@/app/components/charts/bar-chart";
import { unAuthenticatedEvents } from "@/app/events/auth/unauthenticated";
import { isAuthenticated } from "@/utils/config/constants";
import { loadKey } from "@/utils/storage/storage";
import type { Profile } from "@/services/types/profile";

const Dashboard = async () => {
  const container = document.querySelector("#content");
  if (!container) return;

  if (!isAuthenticated) {
    unAuthenticatedEvents();
    return;
  }

  container.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.id = "page-title";
  h1.textContent = "Overview";

  const p = document.createElement("p");
  p.id = "page-tagline";
  p.textContent = "Monitor your listings and bids in real-time.";

  container.appendChild(h1);
  container.appendChild(p);

  const currentUser = loadKey("user") as Profile;
  const currentUserName = currentUser?.name;

  const chartComponent = await BarChart(currentUserName);
  container.appendChild(chartComponent);
};

export default Dashboard;
