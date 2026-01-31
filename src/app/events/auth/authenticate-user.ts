import { isAuthenticated } from "@/utils/config/constants";
import { handleAuth } from "@/app/events/auth/handle-auth";
import { renderApp } from "@/services/helpers/render-app";
import { spinner } from "@/app/components/loaders/spinner";

export const AuthenticateUser = async (isSignup = false) => {
  if (isAuthenticated()) {
    window.history.pushState({}, "", "/bits-auctions/");
    renderApp();
  }

  const form = document.getElementById("auth-form") as HTMLFormElement;
  const submitButton = document.getElementById(
    "submit-auth",
  ) as HTMLButtonElement;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const originalText = Array.from(submitButton.childNodes);
    submitButton.disabled = true;
    submitButton.replaceChildren(spinner());

    try {
      await new Promise((request) => setTimeout(request, 200));
      await handleAuth(isSignup);
    } finally {
      submitButton.disabled = false;
      submitButton.replaceChildren(...originalText);
    }
  });
};
