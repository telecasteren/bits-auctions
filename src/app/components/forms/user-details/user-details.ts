import type { Profile } from "@/services/types/profile";

const UserDetails = (user: Profile) => {
  const container = document.createElement("div");
  container.className = "grid mt-20 w-full max-w-sm gap-6";

  function createAddon(content: HTMLElement, align?: string): HTMLElement {
    const addon = document.createElement("span");
    addon.className =
      "flex items-center px-3 text-sm text-muted-foreground bg-muted border border-input rounded-l-md";
    if (align === "inline-end") {
      addon.className += " rounded-r-md rounded-l-none";
    }
    if (align === "block-end") {
      addon.className =
        "flex items-end px-3 text-sm text-muted-foreground bg-muted border border-input rounded-b-md";
    }
    addon.appendChild(content);
    return addon;
  }

  function createText(text: string, extraClass?: string): HTMLElement {
    const span = document.createElement("span");
    span.className = "whitespace-nowrap";
    if (extraClass) span.className += " " + extraClass;
    span.textContent = text;
    return span;
  }

  function createInput(
    placeholder: string,
    extraClass?: string
  ): HTMLInputElement {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    input.className =
      "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    if (extraClass) input.className += " " + extraClass;
    return input;
  }

  function createTextarea(placeholder: string): HTMLTextAreaElement {
    const textarea = document.createElement("textarea");
    textarea.placeholder = placeholder;
    textarea.className =
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    return textarea;
  }

  // USER CREDITS
  {
    const group = document.createElement("div");
    group.className = "flex w-full";
    const walletIcon = document.createElement("span");
    walletIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`;
    group.appendChild(createAddon(walletIcon));
    group.appendChild(createInput(user.credits.toString() || "0"));
    group.appendChild(createAddon(createText("CREDITS"), "inline-end"));
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
