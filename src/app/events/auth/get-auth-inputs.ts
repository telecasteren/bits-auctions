interface AuthInputs {
  usernameInput: HTMLInputElement | null;
  emailInput: HTMLInputElement | null;
  passwordInput: HTMLInputElement | null;
  confirmPassInput: HTMLInputElement | null;
}

export const getAuthInputs = (isSignup = false): AuthInputs => {
  const usernameInput = isSignup
    ? (document.getElementById("username") as HTMLInputElement | null)
    : null;
  const emailInput = document.getElementById(
    "email"
  ) as HTMLInputElement | null;
  const passwordInput = document.getElementById(
    "password"
  ) as HTMLInputElement | null;
  const confirmPassInput = isSignup
    ? (document.getElementById("confirm-password") as HTMLInputElement | null)
    : null;

  return { usernameInput, emailInput, passwordInput, confirmPassInput };
};
