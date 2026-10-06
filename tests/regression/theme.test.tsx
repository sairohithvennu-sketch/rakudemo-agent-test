import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Header from "@/components/Header";
import { THEME_KEY } from "@/lib/hooks";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));

function mockSystemDarkPreference() {
  window.matchMedia = vi.fn().mockReturnValue({
    matches: true,
    media: "(prefers-color-scheme: dark)",
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });
}

describe("theme toggle", () => {
  it("switches light and dark and persists the choice (DM-1, DM-2)", async () => {
    const user = userEvent.setup();
    render(<Header />);

    const toggle = screen.getByTestId("theme-toggle");
    expect(toggle).toHaveAttribute("aria-label", "Switch to dark mode");
    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-label", "Switch to light mode");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem(THEME_KEY)).toBe(JSON.stringify("dark"));

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem(THEME_KEY)).toBe(JSON.stringify("light"));
  });

  it("restores a saved dark theme (DM-2)", () => {
    localStorage.setItem(THEME_KEY, JSON.stringify("dark"));
    render(<Header />);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute("aria-pressed", "true");
  });

  it("defaults to light when storage is missing, empty, or invalid (DM-4)", () => {
    mockSystemDarkPreference();
    const { unmount } = render(<Header />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem(THEME_KEY)).toBeNull();
    unmount();

    localStorage.setItem(THEME_KEY, "");
    const empty = render(<Header />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    empty.unmount();

    localStorage.setItem(THEME_KEY, "not-json");
    render(<Header />);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute("aria-label", "Switch to dark mode");
  });
});
