import { describe, it, expect } from "vitest";

describe("Overview Page", () => {
  it("should have the correct h1 text", () => {
    document.body.innerHTML = "<h1>Bits Auctions</h1>";
    const h1 = document.querySelector("h1");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toContain("Bits Auctions");
  });
});
