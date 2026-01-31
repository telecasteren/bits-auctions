export const checkMandatoryInputs = () => {
  const titleInput = document.getElementById("title") as HTMLInputElement;
  const endsAtInput = document.getElementById("ends-at") as HTMLInputElement;
  const mediaInput = document.getElementById(
    "media-1",
  ) as HTMLInputElement | null;
  const saveBtn = document.getElementById(
    "dialogue-save-btn",
  ) as HTMLButtonElement;

  const mandatoryInputs = [titleInput, endsAtInput, mediaInput].filter(
    (input) => input !== null,
  );

  const updateSaveBtnState = () => {
    const requiredFilled = mandatoryInputs.every(
      (input) => input.value.trim().length > 0,
    );
    saveBtn.disabled = !requiredFilled;
  };

  titleInput.addEventListener("input", updateSaveBtnState);
  endsAtInput.addEventListener("change", updateSaveBtnState);
  mediaInput?.addEventListener("input", updateSaveBtnState);
};
