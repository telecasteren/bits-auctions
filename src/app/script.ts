import "/css/styles.css";
import renderContent from "@/app/ui/render-content";
import navbar from "@/app/components/navbar/navbar";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  renderContent();
});
