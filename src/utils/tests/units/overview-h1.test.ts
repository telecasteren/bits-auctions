import { describe, it, expect, beforeEach, vi } from "vitest";
import Dashboard from "@/app/ui/features/Dashboard";

vi.mock("@/utils/config/constants", () => ({ isAuthenticated: true }));

vi.mock("@/app/events/auth/unauthenticated", () => ({
  unAuthenticatedEvents: vi.fn(),
}));

vi.mock("@/services/api/profiles/fetch/fetch-single-profile", () => ({
  fetchSingleProfile: vi.fn(async (username: string) => ({ name: username })),
}));

vi.mock("@/utils/storage/storage", () => ({
  loadKey: vi.fn(() => ({ name: "test-user" })),
}));

vi.mock("@/app/components/charts/bar-chart", () => ({
  default: vi.fn(async () => {
    const element = document.createElement("div");
    element.id = "mock-bar-chart";
    return element;
  }),
}));

describe("Dashboard", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="content"></div>';
  });

  it("should have the correct h1 text", async () => {
    await Dashboard();
    const h1 = document.querySelector("#content h1#page-title");
    expect(h1).not.toBeNull();
    expect(h1?.textContent).toBe("Overview");
  });
});
