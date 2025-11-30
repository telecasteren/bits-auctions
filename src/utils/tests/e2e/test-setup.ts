/** Removing/bypassing the fade-out class and
trigger transitionend manually before each test */
export async function bypassFadeOut(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    const content = document.querySelector("#content");
    if (content) {
      content.classList.remove("fade-out");

      const event = new Event("transitionend");
      content.dispatchEvent(event);
    }
  });
}
