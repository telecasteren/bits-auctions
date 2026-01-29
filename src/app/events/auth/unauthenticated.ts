import { renderApp } from "@/services/helpers/render-app";
import { isAuthenticated } from "@/utils/config/constants";

export const unAuthenticatedEvents = () => {
  const content = document.getElementById("content");
  if (!content) return;

  content.innerHTML = "";
  const loginMessage = document.createElement("p");

  if (!isAuthenticated()) {
    loginMessage.innerHTML = `Create an account or log in to access the ${window.location.pathname.slice(1)} page.
    <br/>
    <b class="hover:underline cursor-pointer">Click here to log in.</b>`;
    loginMessage.className = `mt-6 flex justify-self-center text-center w-full max-w-sm flex-col items-center gap-4
    rounded-lg border border-input bg-red-800 text-white dark:bg-red-800/50 p-6 shadow-md hover:shadow-lg transition-shadow`;
  }

  loginMessage.addEventListener("click", () => {
    window.history.pushState({}, "", "/bits-auctions/login");
    renderApp();
  });

  content.appendChild(loginMessage);
};
