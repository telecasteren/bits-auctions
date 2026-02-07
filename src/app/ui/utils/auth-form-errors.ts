export const displayFormErrors = (field: HTMLElement, message: string) => {
  const isExistingError = field.nextElementSibling;
  if (!field.parentNode) return;

  if (isExistingError && isExistingError.classList.contains("formError")) {
    isExistingError.innerHTML = message;
  } else {
    const errorDiv = document.createElement("div");
    errorDiv.id = `${field.id}-error`;
    errorDiv.className = "formError text-red-600 mt-2";
    errorDiv.innerText = message;

    field.parentNode.insertBefore(errorDiv, field.nextSibling);
  }
};

export const clearFormErrors = (field: HTMLElement) => {
  const existingError = field.nextElementSibling;

  if (existingError && existingError.classList.contains("formError")) {
    existingError.remove();
  }
};
