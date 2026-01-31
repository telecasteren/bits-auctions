// import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";
// import { authFetch } from "@/services/api/auth/config/auth-fetch";
// import type { ApiError, ApiErrorResponse } from "@/services/api/errors/types";

// export const deleteListing = async (listingId: string) => {
//   try {
//     const response = await authFetch(`${BASE_URL}${LISTINGS}/${listingId}`, {
//       method: "DELETE",
//     });

//     if (!response.ok) {
//       let message = `Error: ${response.status} ${response.statusText}`;

//       const data = (await response.json()) as ApiErrorResponse;
//       if (Array.isArray(data?.errors) && data.errors.length > 0) {
//         message = data.errors.map((err: ApiError) => err.message).join("; ");
//       } else if (typeof data?.message === "string") {
//         message = data.message;
//       }
//       throw new Error(message);
//     }

//     if (response.status === 204) {
//       return null;
//     }
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     throw new Error("Deleting listing failed.", { cause: error });
//   }
// };
