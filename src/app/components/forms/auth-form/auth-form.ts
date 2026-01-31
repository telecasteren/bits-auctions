import { emailValidation } from "@/app/events/auth/email-validation";
import { forgotPasswordRoute } from "@/app/events/auth/forgot-password";
import { updateDisabledState } from "./update-disabled";

export const AuthForm = (isSignup = false) => {
  const authContainer = document.createElement("div");
  authContainer.id = "auth-form-container";

  const wrapper = document.createElement("div");
  wrapper.className =
    "grid w-full max-w-sm gap-6 mx-auto min-h-full py-12 px-6 lg:px-8";

  const titleWrapper = document.createElement("div");
  titleWrapper.className = "w-full max-w-sm mx-auto";

  const title = document.createElement("h2");
  title.className =
    "font-sans mt-10 text-center text-2xl font-bold tracking-tight";
  title.textContent = isSignup
    ? "Create your account"
    : "Log in to your account";
  titleWrapper.appendChild(title);

  const formContainer = document.createElement("div");
  formContainer.className = "mt-10 w-full max-w-sm mx-auto";

  const form = document.createElement("form");
  form.id = "auth-form";
  form.className = "grid gap-6";

  const emailDiv = document.createElement("div");
  const emailLabel = document.createElement("label");
  emailLabel.className = "block text-sm font-medium text-muted-foreground";
  emailLabel.setAttribute("for", "email");
  emailLabel.textContent = "Email address.";

  const emailInputDiv = document.createElement("div");
  emailInputDiv.className = "mt-2";

  const emailInput = document.createElement("input");
  emailInput.className = `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`;
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("id", "email");
  emailInput.setAttribute("name", "email");
  emailInput.setAttribute("autocomplete", "email");
  emailInput.setAttribute("required", "true");

  emailInputDiv.appendChild(emailInput);
  emailDiv.appendChild(emailLabel);
  emailDiv.appendChild(emailInputDiv);

  const passwordDiv = document.createElement("div");
  const passwordLabelContainer = document.createElement("div");
  passwordLabelContainer.className = "flex items-center justify-between";

  const passwordLabel = document.createElement("label");
  passwordLabel.className = "block text-sm font-medium text-muted-foreground";
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Password.";

  const forgotPassword = document.createElement("a");
  forgotPassword.className =
    "text-sm font-semibold text-accent-light hover:text-black dark:text-accent-dark dark:hover:text-white";
  forgotPassword.setAttribute("href", "#");
  forgotPassword.textContent = "Forgot password?";

  passwordLabelContainer.appendChild(passwordLabel);
  passwordLabelContainer.appendChild(forgotPassword);

  const passwordInputDiv = document.createElement("div");
  passwordInputDiv.className = "mt-2";

  const passwordInput = document.createElement("input");
  passwordInput.className =
    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
  passwordInput.setAttribute("type", "password");
  passwordInput.setAttribute("id", "password");
  passwordInput.setAttribute("name", "password");
  passwordInput.setAttribute("autocomplete", "current-password");
  passwordInput.setAttribute("required", "true");
  passwordInput.minLength = 8;

  passwordInputDiv.appendChild(passwordInput);
  passwordDiv.appendChild(passwordLabelContainer);
  passwordDiv.appendChild(passwordInputDiv);

  const submitDiv = document.createElement("div");
  const submitButton = document.createElement("button");
  submitButton.id = "submit-auth";
  submitButton.className = "btn-auth";
  submitButton.disabled = true;
  submitButton.setAttribute("type", "submit");
  submitButton.textContent = isSignup ? "Sign up." : "Log in.";
  submitDiv.appendChild(submitButton);

  form.appendChild(emailDiv);
  form.appendChild(passwordDiv);
  form.appendChild(submitDiv);

  if (isSignup) {
    const usernameDiv = document.createElement("div");
    const usernameLabel = document.createElement("label");
    usernameLabel.className = "block text-sm font-medium text-muted-foreground";
    usernameLabel.setAttribute("for", "username");
    usernameLabel.textContent = "Username.";

    const usernameInputDiv = document.createElement("div");
    usernameInputDiv.className = "mt-2";

    const usernameInput = document.createElement("input");
    usernameInput.className = `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
      placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-50`;
    usernameInput.setAttribute("type", "text");
    usernameInput.setAttribute("id", "username");
    usernameInput.setAttribute("name", "username");
    usernameInput.setAttribute("autocomplete", "name");
    usernameInput.setAttribute("required", "false");

    usernameInputDiv.appendChild(usernameInput);
    usernameDiv.appendChild(usernameLabel);
    usernameDiv.appendChild(usernameInputDiv);
    form.insertBefore(usernameDiv, emailDiv);

    const confirmPasswordDiv = document.createElement("div");
    const confirmPasswordLabel = document.createElement("label");
    confirmPasswordLabel.className =
      "block text-sm font-medium text-muted-foreground";
    confirmPasswordLabel.setAttribute("for", "confirm-password");
    confirmPasswordLabel.textContent = "Confirm password";

    const confirmPasswordInputDiv = document.createElement("div");
    confirmPasswordInputDiv.className = "mt-2";

    const confirmPasswordInput = document.createElement("input");
    confirmPasswordInput.className = `flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
    placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:cursor-not-allowed disabled:opacity-50`;
    confirmPasswordInput.setAttribute("type", "password");
    confirmPasswordInput.setAttribute("id", "confirm-password");
    confirmPasswordInput.setAttribute("name", "confirm-password");
    confirmPasswordInput.setAttribute("required", "true");
    confirmPasswordInput.minLength = 8;

    confirmPasswordInputDiv.appendChild(confirmPasswordInput);
    confirmPasswordDiv.appendChild(confirmPasswordLabel);
    confirmPasswordDiv.appendChild(confirmPasswordInputDiv);
    form.insertBefore(confirmPasswordDiv, submitDiv);

    forgotPassword.style.display = "none";
  } else {
    forgotPassword.style.display = "block";
  }

  formContainer.appendChild(form);
  wrapper.appendChild(titleWrapper);
  wrapper.appendChild(formContainer);
  authContainer.appendChild(wrapper);

  // Live email input validation
  if (emailInput) emailValidation(emailInput);

  // Update submit button disabled state when form is filled
  emailInput.addEventListener("input", () => updateDisabledState(isSignup));
  passwordInput.addEventListener("input", () => updateDisabledState(isSignup));
  if (isSignup) {
    const confirmPasswordInput = form.querySelector(
      'input[name="confirm-password"]',
    ) as HTMLInputElement;
    confirmPasswordInput.addEventListener("input", () =>
      updateDisabledState(isSignup),
    );
  }

  forgotPassword.addEventListener("click", forgotPasswordRoute(authContainer));

  return authContainer;
};
