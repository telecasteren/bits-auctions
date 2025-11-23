import {
  displayFormErrors,
  // clearFormErrors,
} from "@/services/helpers/auth-form-errors";
import { getAuthInputs } from "@/app/events/auth/get-auth-inputs";

export const passwordValidation = () => {
  const { passwordInput, confirmPassInput } = getAuthInputs();

  if (!passwordInput) {
    return;
  }

  if (passwordInput) {
    const password = passwordInput.value;
    const errors = [];

    if (password.length < 8) {
      errors.push("contain at least 8 characters");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("contain at least 1 lowercase letter");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("contain at least 1 uppercase letter");
    }
    if (!/[0-9]/.test(password)) {
      errors.push("contain at least 1 number");
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
      errors.push("contain at least 1 special sign (Ex. !@#$%^&*)");
    }

    if (errors.length > 0) {
      return "Password not valid. It must:\n- " + errors.join("\n- ");
    }

    if (confirmPassInput && confirmPassInput.value !== password) {
      displayFormErrors(confirmPassInput, "Passwords must match.");
    }

    return "The password is valid";
  }
};
