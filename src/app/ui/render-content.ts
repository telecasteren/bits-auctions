import loadDashboard from "@/app/ui/features/Dashboard";
import ListingsPage from "@/app/ui/features/Listings";

const renderContent = () => {
  const content = document.querySelector<HTMLElement>("#content");
  if (!content) return;

  content.classList.add("fade-out");

  content.addEventListener(
    "transitionend",
    function handler() {
      content.removeEventListener("transitionend", handler);
      content.innerHTML = "";
      if (window.location.pathname === "/") {
        loadDashboard();
      } else if (window.location.pathname === "/listings") {
        ListingsPage();
      }
      void content.offsetWidth;
      content.classList.remove("fade-out");
    },
    { once: true }
  );
};

export default renderContent;
