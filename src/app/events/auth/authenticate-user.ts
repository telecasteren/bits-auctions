import { isAuthenticated } from "@/utils/config/constants";
import { handleAuth } from "@/app/events/auth/handle-auth";

export const AuthenticateUser = async (isSignup = false) => {
  if (isAuthenticated) {
    window.location.pathname = "/";
    return;
  }

  const form = document.getElementById("auth-form");
  if (!form) {
    console.warn(
      "AuthenticateUser: auth-form not found in DOM when attaching handler."
    );
    return;
  }

  console.log("AuthenticateUser: attaching submit handler to form", form);
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    console.log("AuthenticateUser: submit event triggered");
    await handleAuth(isSignup);
  });
};
