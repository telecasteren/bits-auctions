export const handleClicks = ({
  trigger,
  cancelBtn,
  overlay,
  content,
}: {
  trigger: HTMLButtonElement;
  cancelBtn: HTMLButtonElement;
  overlay: HTMLDivElement;
  content: HTMLDivElement;
}) => {
  let lastActive: HTMLElement | null = null;

  const close = () => {
    document.body.style.overflow = "";
    overlay.removeEventListener("click", onClickOutside);

    overlay.remove();
    content.remove();
    lastActive?.focus();
  };

  const open = () => {
    lastActive = document.activeElement as HTMLElement | null;
    document.body.appendChild(overlay);
    document.body.appendChild(content);
    document.body.style.overflow = "hidden";

    overlay.addEventListener("click", onClickOutside);
    setTimeout(() => {
      (
        content.querySelector(
          "input,button,select,textarea"
        ) as HTMLElement | null
      )?.focus();
    }, 0);
  };

  const onClickOutside = (event: MouseEvent) => {
    if (event.target === overlay) close();
  };

  trigger.addEventListener("click", open);
  cancelBtn.addEventListener("click", close);

  return { open, close };
};
