const navigation = () => {
  const liItems = document.querySelectorAll("nav ul li");

  liItems.forEach((li) => {
    li.addEventListener("click", (event) => {
      const selectedItem = event.target.id;

      switch (selectedItem) {
        case "nav-overview":
          window.location.pathname = "/";
          break;
        case "nav-listings":
          window.location.pathname = "/listings";
          break;
        case "nav-account":
          window.location.pathname = "/account";
          break;
        default:
          break;
      }
    });
  });
};
export default navigation;
