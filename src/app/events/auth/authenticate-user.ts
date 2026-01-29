import { isAuthenticated } from "@/utils/config/constants";
import { handleAuth } from "@/app/events/auth/handle-auth";
import { renderApp } from "@/services/helpers/render-app";

export const AuthenticateUser = async (isSignup = false) => {
  if (isAuthenticated()) {
    window.history.pushState({}, "", "/bits-auctions/");
    renderApp();
  }

  const form = document.getElementById("auth-form") as HTMLFormElement;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleAuth(isSignup);
  });
};
