import "/css/styles.css";
import { removeKey } from "@/utils/storage/storage";
import renderContent from "@/app/ui/render-content";
import navbar from "@/app/components/navbar/navbar";
import { setThemeListener } from "@/utils/config/theme";
import { renderApp } from "@/services/helpers/render-app";
import { setPageTitle } from "@/utils/meta/page-titles";
import { Footer } from "./components/footer";

setThemeListener((isDark) => {
  document.body.classList.toggle("dark", isDark);
});

window.addEventListener("auth:unauthorized", () => {
  removeKey("token");
  removeKey("user");
  window.history.pushState({}, "", "/login");
  renderApp();
});

document.addEventListener("DOMContentLoaded", async () => {
  await navbar();
  await renderContent();
  setPageTitle();
});

window.addEventListener("popstate", () => {
  renderApp();
});

Footer();
