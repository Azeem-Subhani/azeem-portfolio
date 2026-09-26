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
import { industries, industryPath } from "@/content/industries";

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

  it("links the wordmark home, then Services, Industries, Portfolio, Why me, Process, and a filled Contact, and has no Resume route", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Azeem Subhani, home" })).toHaveAttribute(
      "href",
      "/",
    );

    const nav = screen.getByRole("navigation", { name: "Primary navigation" });
    const topItems = nav.querySelectorAll(":scope > ul > li");
    expect(Array.from(topItems, (item) => item.textContent?.match(/Services|Industries|Portfolio|Why me|Process|Contact/)?.[0])).toEqual([
      "Services",
      "Industries",
      "Portfolio",
      "Why me",
      "Process",
    ]);
    expect(within(nav).queryByRole("link", { name: "Home" })).not.toBeInTheDocument();
    expect(within(nav).queryByRole("link", { name: "Projects" })).not.toBeInTheDocument();
    expect(within(nav).queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
    expect(within(nav).getByRole("link", { name: "Portfolio" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(within(nav).getByRole("link", { name: "Why me" })).toHaveAttribute("href", "/why-me");
    expect(within(nav).getByRole("link", { name: "Process" })).toHaveAttribute("href", "/process");
    expect(within(nav).getByRole("button", { name: "Services" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(within(nav).getByRole("button", { name: "Industries" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    expect(screen.queryByRole("link", { name: "Resume" })).not.toBeInTheDocument();
  });

  it("opens the services menu with the four service pages", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Services" }));

    const menu = screen.getByRole("list", { name: "Services" });
    expect(
      within(menu).getByRole("link", { name: /Cloud services/ }),
    ).toHaveAttribute("href", "/services/cloud");
    expect(
      within(menu).getByRole("link", { name: /Web development/ }),
    ).toHaveAttribute("href", "/services/web-development");
    expect(
      within(menu).getByRole("link", { name: /Mobile development/ }),
    ).toHaveAttribute("href", "/services/mobile-development");
    expect(
      within(menu).getByRole("link", { name: /Data management/ }),
    ).toHaveAttribute("href", "/services/data-management");
  });

  it("opens the services menu on hover", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<Header />);

    await user.hover(screen.getByRole("button", { name: "Services" }));

    expect(screen.getByRole("list", { name: "Services" })).toBeVisible();
    expect(screen.getByRole("link", { name: /Cloud services/ })).toBeVisible();
  });

  it("opens the industries menu with every industry page", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Industries" }));

    const menu = screen.getByRole("list", { name: "Industries" });
    const hrefs = within(menu)
      .getAllByRole("link")
      .map((item) => item.getAttribute("href"));
    expect(hrefs).toEqual(industries.map((industry) => industryPath(industry.slug)));
  });

  it("closes the services menu when the industries menu opens", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<Header />);

    await user.hover(screen.getByRole("button", { name: "Services" }));
    expect(screen.getByRole("button", { name: "Services" })).toHaveAttribute("aria-expanded", "true");

    await user.hover(screen.getByRole("button", { name: "Industries" }));
    expect(screen.getByRole("button", { name: "Industries" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("button", { name: "Services" })).toHaveAttribute("aria-expanded", "false");
  });

  it("lets Tab move from the Services button into its links", async () => {
    const { default: userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();
    render(<Header />);

    const button = screen.getByRole("button", { name: "Services" });
    button.focus();
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.tab();
    expect(screen.getByRole("link", { name: /Cloud services/ })).toHaveFocus();

    // A second Enter on the button (after a keyboard open) closes it again.
    button.focus();
    await user.keyboard("{Enter}");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});
