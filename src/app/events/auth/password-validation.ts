export const passwordValidation = (
  password: string,
  confirmPassInput?: string,
) => {
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

  if (confirmPassInput !== undefined && confirmPassInput !== password) {
    errors.push("Passwords must match.");
  }

  return {
    valid: errors.length === 0,
    message: errors.length
      ? "Password not valid. It must:\n- " + errors.join("\n- ")
      : "",
  };
};
