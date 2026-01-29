import { isAuthenticated } from "@/utils/config/constants";
import { handleAuth } from "@/app/events/auth/handle-auth";
import { renderApp } from "@/services/helpers/render-app";

export const AuthenticateUser = async (isSignup = false) => {
  if (isAuthenticated()) {
    window.history.pushState({}, "", "/bits-auctions/");
    renderApp();
  }

  const form = document.getElementById("auth-form") as HTMLFormElement;
  if (!form) {
    console.warn(
      "AuthenticateUser: auth-form not found in DOM when attaching handler.",
    );
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await handleAuth(isSignup);
  });
};
