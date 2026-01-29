import { displayFormErrors } from "@/app/ui/utils/auth-form-errors.js";
import { login } from "@/services/api/auth/login";
import { register } from "@/services/api/auth/register";
import { getAuthInputs } from "./get-auth-inputs.js";
import { passwordValidation } from "./password-validation.js";
import { renderApp } from "@/services/helpers/render-app.js";

export const handleAuth = async (isSignup = false) => {
  const { usernameInput, emailInput, passwordInput, confirmPassInput } =
    getAuthInputs(isSignup);

  if (!emailInput || !passwordInput) return;

  const username = usernameInput
    ? usernameInput.value.replace(/\s+/g, "_").toLowerCase()
    : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  if (isSignup && confirmPassInput && confirmPassInput.value !== password) {
    displayFormErrors(confirmPassInput, "Passwords must match.");
    return;
  }

  if (isSignup) {
    try {
      const { valid, message } = passwordValidation(
        password,
        confirmPassInput?.value,
      );

      if (!valid) {
        displayFormErrors(passwordInput, message);
        return;
      }

      const newUser = await register(username, email, password);
      const { name } = (await login(email, password)) || email.split("@")[0];

      window.history.pushState(
        {},
        "",
        `/bits-auctions/account/${newUser.data.username || name}`,
      );
      renderApp();
    } catch (error) {
      displayFormErrors(
        emailInput,
        `Registration failed. Email may be in use or invalid.`,
      );
      throw error;
    }
  } else {
    try {
      const { name } = await login(email, password);
      window.history.pushState({}, "", `/bits-auctions/account/${name}`);
      renderApp();
    } catch (error) {
      displayFormErrors(emailInput, "Login failed. Invalid email or password.");
      throw error;
    }
  }
};
