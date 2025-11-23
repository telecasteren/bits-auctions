import { displayFormErrors } from "@/services/helpers/auth-form-errors";
import { login } from "@/services/api/auth/login";
import { register } from "@/services/api/auth/register";
import { getAuthInputs } from "./get-auth-inputs.js";

export const handleAuth = async (isSignup = false) => {
  const { usernameInput, emailInput, passwordInput } = getAuthInputs(isSignup);

  if (!emailInput || !passwordInput) return;

  const username = usernameInput
    ? usernameInput.value.replace(/\s+/g, "_").toLowerCase()
    : "";
  const email = emailInput ? emailInput.value.trim() : "";
  const password = passwordInput ? passwordInput.value.trim() : "";

  if (isSignup) {
    try {
      const newUser = await register(username, email, password);
      const { name } = (await login(email, password)) || email.split("@")[0];

      window.location.href = `/account/${newUser.data.username || name}`;
      console.log("newUser data: ", newUser.data);
    } catch (error) {
      displayFormErrors(
        emailInput,
        "Registration failed. Email may be in use."
      );
      throw error;
    }
  } else {
    try {
      const { name } = await login(email, password);
      window.location.href = `/account/${name}`;
    } catch (error) {
      displayFormErrors(emailInput, "Login failed. Invalid email or password.");
      throw error;
    }
  }
};
