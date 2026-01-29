import renderContent from "@/app/ui/render-content";
import { setNavItemActive } from "@/app/events/navbar/set-nav-item-active";
import { setPageTitle } from "@/utils/meta/page-titles";
import navbar from "@/app/components/navbar/navbar";

export const renderApp = async () => {
  renderContent();
  setNavItemActive();
  setPageTitle();

  document.getElementById("navbar")?.remove();
  await navbar();
};
