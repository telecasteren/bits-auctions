export const setNavItemActive = () => {
  const liItems = document.querySelectorAll("nav ul li");
  const path = window.location.pathname;

  if (!liItems) return;

  liItems.forEach((li) => {
    li.classList.remove("active");
    switch (li.id) {
      case "nav-overview":
        if (path === "/") li.classList.add("active");
        break;
      case "nav-listings":
        if (path.startsWith("/listings")) li.classList.add("active");
        break;
      case "nav-account":
        if (path.startsWith("/account")) li.classList.add("active");
        break;
      case "nav-login":
        if (path.startsWith("/auth")) li.classList.add("active");
        break;
      default:
        break;
    }
  });
};
