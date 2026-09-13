import { act, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("@/components/layout/theme-toggle", () => ({
  ThemeToggle: () => <button type="button" aria-label="Use dark theme" />,
}));

vi.mock("@/components/layout/mobile-nav", () => ({
  MobileNav: () => <button type="button" aria-label="Open navigation" />,
}));

import { Header } from "@/components/layout/header";

function setScrollY(value: number) {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value,
  });
  window.dispatchEvent(new Event("scroll"));
}

describe("Header", () => {
  afterEach(() => {
    setScrollY(0);
  });

  it("is expanded at the top and compact after scroll", () => {
    setScrollY(0);
    render(<Header />);

    const header = screen.getByRole("banner");
    expect(header).toHaveAttribute("data-scrolled", "false");

    act(() => {
      setScrollY(40);
    });
    expect(header).toHaveAttribute("data-scrolled", "true");
  });

  it("links Home, Projects, and Contact, and has no Resume route", () => {
    render(<Header />);

    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    expect(within(nav).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(nav).getByRole("link", { name: "Projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(within(nav).getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.queryByRole("link", { name: "Resume" })).not.toBeInTheDocument();
  });
});
