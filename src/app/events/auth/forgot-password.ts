import { spinner } from "@/app/components/loaders/spinner";
import {
  userMessage,
  clearUserMessage,
} from "@/services/helpers/user-messages";
import { AuthForm } from "@/app/components/forms/auth-form";
import { AuthenticateUser } from "./authenticate-user";

export const forgotPasswordRoute = (authContainer: HTMLElement) => {
  return (event: Event) => {
    event.preventDefault();

    authContainer.innerHTML = "";
    const spinnerEL = spinner();
    spinnerEL.className = "flex justify-center items-center mt-48";
    authContainer.prepend(spinnerEL);

    userMessage("info", "Forgot your password? Please signup again.");

    setTimeout(() => {
      const authFormElement = AuthForm(true);
      authContainer.appendChild(authFormElement);

      if (authContainer) {
        AuthenticateUser(true);
      }
      spinnerEL.remove();
    }, 1000);

    setTimeout(() => {
      clearUserMessage();
    }, 3000);
  };
};
