import renderContent from "@/app/ui/render-content";
import { setNavItemActive } from "@/app/events/navbar/set-nav-item-active";

export const renderApp = () => {
  renderContent();
  setNavItemActive();
};
