import "/css/styles.css";
import renderContent from "@/app/ui/render-content";
import navbar from "@/app/components/navbar/navbar";
import { setThemeListener } from "@/utils/config/theme";
import { setNavItemActive } from "@/app/events/navbar/set-nav-item-active";

setThemeListener((isDark) => {
  document.body.classList.toggle("dark", isDark);
});

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  renderContent();
});

window.addEventListener("popstate", () => {
  renderContent();
  setNavItemActive();
});
