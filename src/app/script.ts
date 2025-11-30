import "/css/styles.css";
import renderContent from "@/app/ui/render-content";
import navbar from "@/app/components/navbar/navbar";
import { setThemeListener } from "@/utils/config/theme";

setThemeListener((isDark) => {
  document.body.classList.toggle("dark", isDark);
});

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  renderContent();
});
