import { placeBid } from "@/services/api/listings/actions/place-bid";
import { userMessage } from "@/app/ui/utils/user-messages";
import { renderApp } from "@/services/helpers/render-app";
import { loadKey, saveKey } from "@/utils/storage/storage";

export const submitUserBid = async (bidAmount: number, listingId: string) => {
  const userCredits = loadKey("credits");
  const creditsNumber = Number(userCredits);
  const bidAmountNumber = Number(bidAmount);
  const creditsLeft = creditsNumber - bidAmountNumber;

  if (isNaN(bidAmount) || bidAmount <= 0) {
    userMessage("error", "Please enter a valid bid amount.", {
      duration: 5000,
    });
    return;
  }

  if (bidAmount > creditsNumber) {
    userMessage("error", "You do not have enough credits for this bid.", {
      duration: 8000,
    });
    return;
  }

  await placeBid(bidAmount, listingId);
  userMessage("success", `You placed a bid of ${bidAmount} credits!`, {
    duration: 3000,
  });
  saveKey("credits", creditsLeft);
  window.dispatchEvent(new Event("creditsUpdated"));
  renderApp();
};
