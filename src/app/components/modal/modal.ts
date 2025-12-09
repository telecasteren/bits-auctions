export const popUpModal = (image: string) => {
  const container = document.getElementById("content");
  if (!container) return;

  const createModal = () => {
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.className =
      "fixed inset-0 z-[1000] w-full h-full overflow-auto bg-black/50";
    modal.style.display = "none";
    modal.setAttribute("tabindex", "-1");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");

    const modalContent = document.createElement("div");
    modalContent.id = "modal-content";
    modalContent.className = `relative grid cursor-default border border-[var(--background)]
    bg-[var(--background)]/60 rounded-md z-[1100] p-20 w-[80%] h-auto mx-auto mt-[15%] lg:w-[60%] lg:h-fit`;

    const closeButton = document.createElement("span");
    closeButton.id = "close-modal";
    closeButton.className = `absolute m-[2%] max-w-[50px] text-[38px] font-bold cursor-pointer
    text-black dark:text-white hover:text-[var(--accent-strong)]`;
    closeButton.innerHTML = "&times;";

    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);

    return modal;
  };

  const openModal = () => {
    let modal = document.getElementById("modal");
    if (!modal && container) {
      modal = createModal();
      container.appendChild(modal);
    }

    if (!modal) return;

    const modalContent = document.getElementById("modal-content");
    const closeButton = document.getElementById("close-modal");

    if (!modalContent || !closeButton) return;

    modalContent.innerHTML = "";
    modalContent.appendChild(closeButton);
    const imageElement = document.createElement("img");
    imageElement.className =
      "w-full h-auto justify-self-center self-center rounded-sm opacity-100";
    imageElement.src = image;
    imageElement.alt = "Modal image";
    modalContent.appendChild(imageElement);

    modal.style.display = "block";
    modal.focus();

    const closeModal = () => {
      modal.style.display = "none";
      closeButton.removeEventListener("click", onCloseClick);
      window.removeEventListener("click", onClickOutside);
    };

    const onCloseClick = (event: Event) => {
      if (event.target === closeButton) {
        closeModal();
      }
    };

    const onClickOutside = (event: Event) => {
      if (event.target === modal) {
        closeModal();
      }
    };

    closeButton.addEventListener("click", onCloseClick);
    window.addEventListener("click", onClickOutside);
  };

  openModal();
};
