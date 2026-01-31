import type { Profile } from "@/services/types/profile";
import { createText } from "@/app/components/forms/user-details/create-text";
import { createInput } from "@/app/components/forms/user-details/create-input";
import { createTextarea } from "@/app/components/forms/user-details/create-textarea";
import { editProfile } from "@/app/events/profile/edit-profile";
import { userMessage } from "@/app/ui/utils/user-messages";
import { renderApp } from "@/services/helpers/render-app";

const UserDetails = (user: Profile) => {
  const container = document.createElement("div");
  container.className = "grid mt-10 w-full max-w-sm gap-6 mx-auto";

  const initialState = {
    bio: user.bio || "",
    avatar: user.avatar?.url || "",
  };

  // USER CREDITS
  {
    const group = document.createElement("div");
    group.className =
      "flex w-full items-center justify-between mb-2 px-4 py-3 rounded-lg border font-medium text-gray-600";

    const walletIcon = document.createElement("span");
    walletIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;
    walletIcon.className = "mr-2";

    const creditsValue = document.createElement("span");
    creditsValue.textContent = user.credits.toString() || "0";
    creditsValue.className = "flex-1 text-right text-gray-600 font-medium";

    const creditsText = createText("CREDITS", "ml-2 text-sm");

    group.appendChild(walletIcon);
    group.appendChild(creditsValue);
    group.appendChild(creditsText);
    container.appendChild(group);
  }

  // USER AVATAR
  let avatarInput: HTMLInputElement;
  {
    const label = createText("Update avatar", "font-medium");
    container.appendChild(label);
    const group = document.createElement("div");
    group.className = "flex w-full";
    avatarInput = createInput(user.avatar?.url || "Enter avatar URL");
    avatarInput.id = "user-avatar-input";
    group.appendChild(avatarInput);
    container.appendChild(group);
  }

  // USER BIO
  let bioTextArea: HTMLTextAreaElement;
  {
    const label = createText("Update bio", "font-medium");
    container.appendChild(label);
    const group = document.createElement("div");
    group.className = "flex flex-col w-full";
    bioTextArea = createTextarea(user.bio || "Enter your bio");
    bioTextArea.id = "user-bio-textarea";
    group.appendChild(bioTextArea);
    container.appendChild(group);
  }

  // SAVE USER DETAILS BUTTON
  {
    const group = document.createElement("div");
    group.className = "flex flex-col w-full";

    const saveBtn = document.createElement("button");
    saveBtn.id = "save-btn";
    saveBtn.className = "btn-auth";
    // saveBtn.disabled = true;
    saveBtn.appendChild(createText("Save details", "text-center text-md"));
    group.appendChild(saveBtn);
    container.appendChild(group);

    saveBtn.addEventListener("click", async () => {
      const username = user.name;

      const update = {
        bio: bioTextArea.value.trim(),
        avatarUrl: avatarInput.value.trim(),
      };

      const initial = {
        bio: initialState.bio,
        avatarUrl: initialState.avatar,
      };

      try {
        await editProfile(username, update, initial);
        userMessage("success", "Profile updated!", { duration: 4000 });
        renderApp();
      } catch (error) {
        if (error instanceof Error) {
          userMessage("warning", error.message, { duration: 5000 });
          return;
        }
      }
    });
  }

  return container;
};

export default UserDetails;
