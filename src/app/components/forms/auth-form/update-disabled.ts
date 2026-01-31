export const updateDisabledState = (isSignup = false) => {
  const form = document.getElementById("auth-form") as HTMLFormElement;
  if (!form) return;

  const passwordInput = document.getElementById("password") as HTMLInputElement;
  const confirmPasswordInput = isSignup
    ? (document.getElementById("confirm-password") as HTMLInputElement)
    : null;

  const submitButton = document.getElementById(
    "submit-auth",
  ) as HTMLButtonElement;

  const isValid = form.checkValidity();

  const passwordMatch =
    !isSignup || confirmPasswordInput?.value === passwordInput.value;
  submitButton.disabled = !isValid || !passwordMatch;
};
