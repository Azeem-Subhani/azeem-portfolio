import { expect, test } from "@playwright/test";

const routes = ["/", "/projects", "/why-me", "/process", "/contact"];

test.describe("navigation", () => {
  test("desktop nav links reach every primary route", async ({ page }) => {
    await page.goto("/");

    for (const label of ["Portfolio", "Why me", "Process"]) {
      await page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: label })
        .click();
      await page.waitForLoadState("networkidle");
    }

    await page.getByRole("banner").getByRole("link", { name: "Contact" }).click();
    await page.waitForLoadState("networkidle");

    await page.goto("/services/mobile-development");
    await page.getByRole("link", { name: "Azeem Subhani, home" }).click();
    await expect(page).toHaveURL("/");
  });

  test("marks the current page with aria-current", async ({ page }) => {
    await page.goto("/projects");

    await expect(
      page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: "Portfolio" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("mobile nav sheet opens and links to every route", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation" }).click();
    const sheet = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(sheet).toBeVisible();

    const expected = [
      { href: "/projects", name: "Portfolio" },
      { href: "/why-me", name: "Why me" },
      { href: "/process", name: "Process" },
      { href: "/contact", name: "Contact" },
      { href: "/services/cloud", name: "Cloud" },
      { href: "/services/web-development", name: "Web" },
      { href: "/services/mobile-development", name: "Mobile" },
      { href: "/services/data-management", name: "Data" },
    ];
    for (const { href, name } of expected) {
      await expect(
        sheet.locator(`a[href="${href}"]`).filter({ hasText: name }),
      ).toBeVisible();
    }
    await expect(sheet.getByRole("link", { name: "Home" })).toHaveCount(0);
  });

  test("every primary route responds with 200 and a real title", async ({ page }) => {
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page).not.toHaveTitle("");
    }
  });

  test("resume route is gone", async ({ page }) => {
    await page.goto("/resume");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
        name: "Resume",
      }),
    ).toHaveCount(0);
  });

  test("header condenses into a pill after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");

    await expect(header).toHaveAttribute("data-scrolled", "false");

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(header).toHaveAttribute("data-scrolled", "true");

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(header).toHaveAttribute("data-scrolled", "false");
  });

  test("skip link moves focus to main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
  });

  test("has no unnamed buttons or empty links on any primary route", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);

      const unnamedButtons = await page.evaluate(() =>
        Array.from(document.querySelectorAll("button")).filter((button) => {
          const accessibleName =
            button.getAttribute("aria-label") ?? button.textContent?.trim();
          return !accessibleName;
        }).length,
      );
      expect(unnamedButtons, `${route} has an unnamed button`).toBe(0);

      const emptyLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a")).filter((link) => {
          const href = link.getAttribute("href");
          const accessibleName =
            link.getAttribute("aria-label") ?? link.textContent?.trim();
          return !href || href === "#" || !accessibleName;
        }).length,
      );
      expect(emptyLinks, `${route} has an empty or unlabeled link`).toBe(0);
    }
  });

  test("sitemap and robots routes return valid output", async ({ request }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.ok()).toBeTruthy();
    const sitemapText = await sitemap.text();
    expect(sitemapText).toContain("<urlset");
    expect(sitemapText).toContain("/services/cloud");
    expect(sitemapText).toContain("/services/web-development");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Sitemap:");
  });

  test("header services menu reaches a service page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("navigation", { name: "Primary navigation" })
      .getByRole("button", { name: "Services" })
      .click();
    await page
      .getByRole("menuitem", { name: /Web development/ })
      .click();
    await expect(page).toHaveURL(/\/services\/web-development$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("service pages respond and footer links reach them", async ({ page }) => {
    await page.goto("/");
    const servicesNav = page.getByRole("navigation", { name: "Services" });

    await servicesNav.getByRole("link", { name: "Web" }).click();
    await expect(page).toHaveURL(/\/services\/web-development$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const routes = [
      "/services/cloud",
      "/services/web-development",
      "/services/mobile-development",
      "/services/data-management",
    ];

    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("link", { name: "Start a conversation" }).first()).toBeVisible();
    }
  });
});
