import { expect, test } from "@playwright/test";

const routes = ["/", "/projects", "/resume", "/contact"];

test.describe("navigation", () => {
  test("desktop nav links reach every primary route", async ({ page }) => {
    await page.goto("/");

    for (const label of ["Projects", "Resume", "Contact", "Home"]) {
      await page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: label })
        .click();
      await page.waitForLoadState("networkidle");
    }
  });

  test("marks the current page with aria-current", async ({ page }) => {
    await page.goto("/projects");

    await expect(
      page
        .getByRole("navigation", { name: "Primary navigation" })
        .getByRole("link", { name: "Projects" }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("mobile nav sheet opens and links to every route", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open navigation" }).click();
    const sheet = page.getByRole("navigation", { name: "Mobile navigation" });
    await expect(sheet).toBeVisible();

    for (const label of ["Home", "Projects", "Resume", "Contact"]) {
      await expect(sheet.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("every primary route responds with 200 and a real title", async ({ page }) => {
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page).not.toHaveTitle("");
    }
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
    expect(await sitemap.text()).toContain("<urlset");

    const robots = await request.get("/robots.txt");
    expect(robots.ok()).toBeTruthy();
    expect(await robots.text()).toContain("Sitemap:");
  });
});
