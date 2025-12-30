import "/css/styles.css";
import renderContent from "@/app/ui/render-content";
import navbar from "@/app/components/navbar/navbar";
import { setThemeListener } from "@/utils/config/theme";
import { renderApp } from "@/services/helpers/render-app";

setThemeListener((isDark) => {
  document.body.classList.toggle("dark", isDark);
});

document.addEventListener("DOMContentLoaded", async () => {
  await navbar();
  await renderContent();
});

window.addEventListener("popstate", () => {
  renderApp();
});
