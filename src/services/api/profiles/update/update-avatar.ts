// import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
// import { authFetch } from "@/services/api/auth/config/auth-fetch";

// export const updateAvatar = async (user: string, newAvatar: string) => {
//   const form = document.querySelector("#avatar-form");
//   if (!form) return;

//   try {
//     const response = await authFetch(`${BASE_URL}${USERS}/${user}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         avatar: { url: newAvatar, alt: `Profile avatar for ${user}` },
//       }),
//     });

//     if (response.ok) {
//       return await response.json();
//     }
//   } catch (error) {
//     throw new Error("Updating profile avatar failed.", { cause: error });
//   }
// };
