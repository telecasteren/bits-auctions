import {
  displayFormErrors,
  clearFormErrors,
} from "@/app/ui/utils/auth-form-errors";
import { getAuthInputs } from "@/app/events/auth/get-auth-inputs";

export const emailValidation = () => {
  const { emailInput } = getAuthInputs();
  const validDomains = "@stud.noroff.no";

  if (emailInput) {
    emailInput.addEventListener("input", () => {
      const cleanEmail = emailInput.value.trim();
      const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!pattern.test(cleanEmail)) {
        emailInput.setCustomValidity("Please enter a valid email address.");
        displayFormErrors(
          emailInput,
          `Email must contain a "@" and a "." to be valid.`,
        );
        return;
      }

      const emailDomainIsValid = cleanEmail.endsWith(validDomains);
      if (!emailDomainIsValid) {
        displayFormErrors(
          emailInput,
          `Valid emails end with: ${validDomains}.`,
        );
        return;
      }

      emailInput.setCustomValidity("");
      clearFormErrors(emailInput);
    });
  }
};
