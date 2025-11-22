import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const updateBio = async (user: string, newBio: string) => {
  try {
    const response = await authFetch(`${BASE_URL}${USERS}/${user}`, {
      method: "PUT",
      body: JSON.stringify({ bio: newBio }),
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
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error updating user bio:", errorMessage);
    throw new Error("Updating profile bio failed.");
  }
};
