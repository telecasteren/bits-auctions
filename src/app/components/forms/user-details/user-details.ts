import type { Profile } from "@/services/types/profile";
import { createText } from "@/app/components/forms/user-details/create-text";
import { createInput } from "@/app/components/forms/user-details/create-input";
import { createTextarea } from "@/app/components/forms/user-details/create-textarea";

const UserDetails = (user: Profile) => {
  const container = document.createElement("div");
  container.className = "grid mt-20 w-full max-w-sm gap-6";

  // USER CREDITS
  {
    const group = document.createElement("div");
    group.className = "flex w-full";
    const inputWrapper = document.createElement("div");
    inputWrapper.className = "relative w-full";

    const input = createInput(user.credits.toString() || "0");
    input.className +=
      " pl-12 pr-24 text-right placeholder:text-black font-medium";
    input.disabled = true;

    const walletIcon = document.createElement("span");
    walletIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;
    walletIcon.className =
      "absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none";

    const creditsText = document.createElement("span");
    creditsText.textContent = "CREDITS";
    creditsText.className =
      "absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none";

    inputWrapper.appendChild(input);
    inputWrapper.appendChild(walletIcon);
    inputWrapper.appendChild(creditsText);
    group.appendChild(inputWrapper);
    container.appendChild(group);
  }

  // USERNAME
  {
    const group = document.createElement("div");
    group.className = "flex w-full";
    group.appendChild(createInput(user.name || "Enter your username"));
    container.appendChild(group);
  }

  // USER EMAIL
  {
    const group = document.createElement("div");
    group.className = "flex w-full";
    group.appendChild(createInput(user.email || "Enter your email"));
    container.appendChild(group);
  }

  // USER BIO
  {
    const group = document.createElement("div");
    group.className = "flex flex-col w-full";
    group.appendChild(createTextarea(user.bio || "Enter your bio"));
    const addon = document.createElement("span");
    addon.className =
      "flex mt-6 px-4 py-2 justify-center items-center bg-[hsl(var(--chart-1))] text-white hover:brightness-90 rounded-lg shadow-sm hover:shadow-lg transition-shadow transition-colors cursor-pointer";
    addon.appendChild(
      createText("Save details", "text-muted-foreground text-center text-md")
    );
    group.appendChild(addon);
    container.appendChild(group);
  }

  return container;
};

export default UserDetails;
