import { BASE_URL, LISTINGS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const deleteListing = async (listingId: string) => {
  try {
    const response = await authFetch(`${BASE_URL}${LISTINGS}/${listingId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === 204) {
      return null;
    }
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Deleting listing failed.", { cause: error });
  }
};
