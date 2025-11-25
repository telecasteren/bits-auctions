import { BASE_URL, USERS } from "@/services/api/auth/config/constants";
import { authFetch } from "@/services/api/auth/config/auth-fetch";

export const updateProfile = async (
  user: string,
  newData: Partial<{
    name: string;
    email: string;
    bio: string;
    avatar: string;
  }>,
) => {
  try {
    const response = await authFetch(`${BASE_URL}${USERS}/${user}`, {
      method: "PUT",
      body: JSON.stringify(newData),
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
    throw new Error("Updating profile failed.", { cause: error });
  }
};
