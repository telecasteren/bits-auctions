import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const deleteBio = async (username: string) => {
  try {
    const response = await authFetch(`${BASE_URL}${USERS}/${username}`, {
      method: "PUT",
      body: JSON.stringify({ bio: "" }),
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
    throw new Error("Deleting bio failed.", { cause: error });
  }
};
