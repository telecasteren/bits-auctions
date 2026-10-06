import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { USERS } from "@/services/api/shared/endpoints";

export const deleteBio = async (username: string) => {
  try {
    return await withApiHelper({
      endpoint: `${USERS}/${username}`,
      method: "PUT",
      body: JSON.stringify({ bio: "" }),
    });
  } catch (error) {
    throw new Error("Deleting bio failed.", { cause: error });
  }
};
