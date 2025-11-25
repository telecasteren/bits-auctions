// import { updateAvatar } from "@/services/api/profiles/update/update-avatar";
// import { Profile } from "@/services/types/profile";

// export const editAvatarEvent = (user: Profile) => {
//   const form = document.getElementById("edit-avatar-form");
//   if (!form) return;

//   const username = user.name || "";

//   form.addEventListener("submit", async (e: Event) => {
//     e.preventDefault();
//     const avatarField = document.getElementById(
//       "avatar-url-input"
//     ) as HTMLInputElement;
//     if (!avatarField) return;

//     const newAvatarUrl = avatarField.value || "";
//     await updateAvatar(username, newAvatarUrl);
//   });
// };
