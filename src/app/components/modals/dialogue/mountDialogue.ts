import { loadKey } from "@/utils/storage/storage";
import type { Profile } from "@/services/types/profile";
import { createDialogue } from "./createDialogue";

export const mountDialogue = async (
  container: HTMLElement | null = document.getElementById("content")
) => {
  if (!container) return null;

  const userObject = loadKey("user") as Profile;
  const dialogue = createDialogue(userObject);
  container.appendChild(dialogue);
  return dialogue;
};
