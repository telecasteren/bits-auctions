import { userMessage } from "@/app/ui/utils/user-messages";
import { withApiHelper } from "@/services/api/shared/withApiHelper";
import { LISTINGS } from "@/services/api/shared/endpoints";
import { ApiError } from "@/services/api/shared/apiError";

export const placeBid = async (bidAmount: number, listingId: string) => {
  try {
    return await withApiHelper({
      endpoint: `${LISTINGS}/${listingId}/bids`,
      method: "POST",
      body: JSON.stringify({ amount: bidAmount }),
    });
  } catch (error) {
    if (error instanceof ApiError && error.status === 400) {
      userMessage(
        "warning",
        "Bid must be higher than the current highest bid",
        {
          duration: 8000,
        },
      );
      throw new Error("Bid must be higher than current highest bid");
    }
    throw error;
  }
};
