import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";

export const deleteListing = async (listingId: string) => {
  try {
    await withApiHelper({
      endpoint: `${LISTINGS}/${listingId}`,
      method: "DELETE",
      noContent: true,
    });
  } catch (error) {
    throw new Error("Deleting listing failed.", { cause: error });
  }
};
