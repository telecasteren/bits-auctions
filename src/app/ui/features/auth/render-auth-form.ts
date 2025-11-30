import { isAuthenticated, brandShortName } from "@/utils/config/constants";
import { AuthenticateUser } from "@/app/events/auth/authenticate-user";
import Account from "@/app/ui/features/account/account";
import { AuthForm } from "@/app/components/forms/auth-form";

const renderAuthForm = async (isSignup = false) => {
  if (isAuthenticated) {
    window.location.pathname = "/account";
    Account();
    return;
  }

  const container = document.querySelector("#content");
  if (!container) return;

  container.innerHTML = "";

  const h1 = document.createElement("h1");
  h1.id = "page-title";
  h1.textContent = `Welcome to ${brandShortName}`;

  const p = document.createElement("p");
  p.id = "page-tagline";
  p.textContent = "Where the magic happens!";

  const form = AuthForm(isSignup);

  container.appendChild(h1);
  container.appendChild(p);
  container.appendChild(form);

  if (container) {
    AuthenticateUser(isSignup);
  }
};

export default renderAuthForm;
