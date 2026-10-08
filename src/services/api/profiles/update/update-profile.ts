import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { USERS } from "@/services/api/shared/endpoints";
import type { Profile } from "@/services/types/profile";

export const updateProfile = async (
  user: string,
  newData: Partial<{
    bio: string;
    avatar: { url: string; alt: string };
  }>,
) => {
  try {
    return await withApiHelper<Profile>({
      endpoint: `${USERS}/${user}`,
      method: "PUT",
      body: JSON.stringify(newData),
    });
  } catch (error) {
    throw new Error("Updating profile failed.", { cause: error });
  }
};
