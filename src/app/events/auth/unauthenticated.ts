import { isAuthenticated } from "@/utils/config/constants";

export const unAuthenticatedEvents = () => {
  const loginMessage = document.createElement("p");

  if (!isAuthenticated) {
    loginMessage.textContent = `Create an account or log in to access the ${window.location.pathname.slice(1)} page.`;
    loginMessage.className = `mt-6 flex justify-self-center text-center w-full max-w-sm flex-col items-center gap-4
    rounded-lg border border-input bg-secondary p-6 shadow-md cursor-pointer hover:shadow-lg transition-shadow`;
  }

  loginMessage.addEventListener("click", () => {
    window.location.pathname = "/bits-auctions/login";
  });

  return loginMessage;
};
