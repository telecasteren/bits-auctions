import { renderApp } from "@/services/helpers/render-app";
import AccountListings from "@/app/ui/features/account/account-listings";
import type { Profile } from "@/services/types/profile";

export const profileCards = (user: Profile) => {
  const container = document.createElement("div");
  container.className =
    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 mx-auto max-w-2xl w-full";

  const infoItems = [
    { title: "My account", subtitle: "See and edit your account details." },
    {
      title: "Active bids",
      subtitle: "See all the listings you've placed a bid on.",
    },
    { title: "My listings", subtitle: "See and manage your listings." },
  ];

  const icons = {
    account: "/bits-auctions/icons/Vector.svg",
    bids: "/bits-auctions/icons/Shoppingmode.svg",
    listings: "/bits-auctions/icons/BarChart.svg",
  };

  infoItems.forEach((item) => {
    const card = document.createElement("div");
    card.setAttribute(
      "data-card-id",
      item.title.toLowerCase().replace(" ", "-"),
    );
    card.className =
      "relative group rounded-lg border bg-card mb-20 mt-20 p-4 shadow-sm hover:shadow-lg hover:scale-105 duration-300 transition-all cursor-pointer overflow-hidden";

    const overlay = document.createElement("div");
    overlay.className =
      "absolute inset-0 pointer-events-none bg-[#1e293b0f] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg";
    card.appendChild(overlay);

    const itemContainer = document.createElement("div");
    itemContainer.className = "mb-4";

    const icon = document.createElement("img");
    icon.className =
      "mb-4 w-8 h-8 text-white dark:invert flex items-center justify-center";
    icon.src =
      icons[
        item.title === "My account"
          ? "account"
          : item.title === "Active bids"
            ? "bids"
            : "listings"
      ];
    itemContainer.appendChild(icon);

    const title = document.createElement("h3");
    title.className = "text-2xl pb-2 font-semibold";
    title.textContent = item.title;
    itemContainer.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.className = "text-sm";
    subtitle.textContent = item.subtitle;
    itemContainer.appendChild(subtitle);

    card.appendChild(itemContainer);
    container.appendChild(card);

    card.addEventListener("click", async () => {
      const wrapper = document.createElement("div");
      wrapper.className = "";

      const closeBtn = document.createElement("div");
      closeBtn.className =
        "text-2xl font-bold mb-4 cursor-pointer hover:text-[var(--accent)] justify-self-end";
      closeBtn.innerHTML = "&times;";
      wrapper.appendChild(closeBtn);

      closeBtn.addEventListener("click", () => {
        renderApp();
      });

      const cardId = card.getAttribute("data-card-id");

      container.innerHTML = "";
      container.className = "";

      if (cardId === "my-account") {
        // account details form here
      } else if (cardId === "active-bids") {
        // active bids list here
      } else if (cardId === "my-listings") {
        const accountListings = await AccountListings(user);
        wrapper.appendChild(accountListings);
        container.appendChild(wrapper);
      }
    });
  });

  return container;
};
