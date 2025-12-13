export const setNavItemActive = () => {
  const liItems = document.querySelectorAll("nav ul li");
  const path = window.location.pathname;

  if (!liItems) return;

  liItems.forEach((li) => {
    li.classList.remove("active");
    switch (li.id) {
      case "nav-landing":
        if (path === "/bits-auctions/") li.classList.add("active");
        break;
      case "nav-overview":
        if (path.startsWith("/bits-auctions/overview"))
          li.classList.add("active");
        break;
      case "nav-listings":
        if (path.startsWith("/bits-auctions/listings"))
          li.classList.add("active");
        break;
      case "nav-account":
        if (path.startsWith("/bits-auctions/account"))
          li.classList.add("active");
        break;
      case "nav-login":
        if (path.startsWith("/bits-auctions/login")) li.classList.add("active");
        break;
      case "nav-signup":
        if (path.startsWith("/bits-auctions/signup"))
          li.classList.add("active");
        break;
      default:
        break;
    }
  });
};
