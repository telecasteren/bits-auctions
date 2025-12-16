import type { Profile } from "@/services/types/profile";
import { createText } from "@/app/components/forms/user-details/create-text";
import { createInput } from "@/app/components/forms/user-details/create-input";
import { createTextarea } from "@/app/components/forms/user-details/create-textarea";
import { editProfile } from "@/app/events/profile/edit-profile";
import { userMessage } from "@/app/ui/utils/user-messages";

const UserDetails = (user: Profile) => {
  const container = document.createElement("div");
  container.className = "grid mt-20 w-full max-w-sm gap-6 mx-auto";

  // USER CREDITS
  {
    const group = document.createElement("div");
    group.className =
      "flex w-full items-center justify-between mb-2 px-4 py-3 rounded-lg border font-medium";

    const walletIcon = document.createElement("span");
    walletIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;
    walletIcon.className = "mr-2";

    const creditsValue = document.createElement("span");
    creditsValue.textContent = user.credits.toString() || "0";
    creditsValue.className =
      "flex-1 text-right text-black dark:text-gray-200 font-medium";

    const creditsText = createText("CREDITS", "ml-2 text-sm");

    group.appendChild(walletIcon);
    group.appendChild(creditsValue);
    group.appendChild(creditsText);
    container.appendChild(group);
  }

  // USER AVATAR
  {
    const group = document.createElement("div");
    group.className = "flex w-full";
    const input = createInput(user.avatar?.url || "");
    input.id = "user-avatar-input";
    group.appendChild(input);
    container.appendChild(group);
  }

  // USER BIO
  {
    const group = document.createElement("div");
    group.className = "flex flex-col w-full";
    const bioTextArea = createTextarea(user.bio || "Enter your bio");
    bioTextArea.id = "user-bio-textarea";
    group.appendChild(bioTextArea);
    container.appendChild(group);
  }

  // SAVE USER DETAILS BUTTON
  {
    const group = document.createElement("div");
    group.className = "flex flex-col w-full";

    const addon = document.createElement("span");
    addon.id = "save-btn";
    addon.className =
      "flex mt-6 px-4 py-2 justify-center items-center bg-[hsl(var(--chart-1))] text-white hover:brightness-90 rounded-lg shadow-sm hover:shadow-lg transition-shadow transition-colors cursor-pointer";
    addon.appendChild(createText("Save details", "text-center text-md"));
    group.appendChild(addon);
    container.appendChild(group);

    addon.addEventListener("click", () => {
      if (!user.bio && !user.avatar.url) {
        userMessage("warning", "User bio and avatar cannot be empty.");
        return;
      } else {
        editProfile(user);
        userMessage("success", "Profile updated!");
      }
    });
  }

  return container;
};

export default UserDetails;
