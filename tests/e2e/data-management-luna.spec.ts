import { expect, test } from "@playwright/test";

const lunaPath = "/services/data-management/luna";

test.describe("data management Luna hero", () => {
  test("renders the semantic hero and a live Three.js scene", async ({ page }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text());
    });

    const response = await page.goto(lunaPath);
    expect(response?.status()).toBe(200);

    await expect(
      page.getByRole("heading", { name: "one record, every system" }),
    ).toBeVisible();
    await expect(page.locator(".data-luna-eyebrow")).toContainText("DATA MANAGEMENT");
    await expect(
      page.getByText("Postgres owns the row. Every system stays in sync.", {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.locator(".data-luna-cta"),
    ).toHaveAttribute("href", "/contact");
    await expect(page.locator(".data-luna-label-postgres")).toBeVisible();
    await expect(page.locator(".data-luna-label-writes")).toBeVisible();
    await expect(page.locator(".data-luna-label-warehouse")).toBeVisible();
    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-webgl-status", /ready|fallback/);
    await expect(page.locator("[data-scene-variant='luna']")).toHaveCount(1);

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("keeps the hero static when reduced motion is requested", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(lunaPath);

    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-webgl-status", /ready|fallback/);
    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-motion", "reduced");
    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-luna-static", "true");
  });

  test("keeps the local navigation and CTA keyboard reachable", async ({ page }) => {
    await page.goto(lunaPath);

    const services = page.getByRole("button", { name: "Services" });
    const servicesMenu = page.locator(".data-luna-services-menu");
    await services.focus();
    await page.keyboard.press("Enter");
    await expect(servicesMenu).toHaveAttribute(
      "aria-hidden",
      "false",
    );

    await page.keyboard.press("Escape");
    await expect(servicesMenu).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    const cta = page.locator(".data-luna-cta");
    await cta.focus();
    await expect(cta).toBeFocused();
  });

  test("does not introduce horizontal overflow across supported widths", async ({ page }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1280, height: 800 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(lunaPath);
      await expect(page.locator(".data-luna-hero")).toBeVisible();

      const overflow = await page.evaluate(
        () => Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth,
      );
      expect(overflow, `${viewport.width}px layout overflows`).toBeLessThanOrEqual(0);
    }
  });

  test("keeps the HTML fallback visible when WebGL is unavailable", async ({ page }) => {
    await page.addInitScript(() => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        ...args
      ) {
        const contextId = String(args[0]);
        if (contextId.startsWith("webgl")) return null;
        return originalGetContext.apply(this, args) as ReturnType<typeof originalGetContext>;
      } as typeof originalGetContext;
    });
    await page.goto(lunaPath);

    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-webgl-status", "fallback");
    await expect(page.locator(".data-luna-visual"))
      .toHaveAttribute("data-luna-fallback", "true");
    await expect(page.locator(".data-luna-fallback")).toBeVisible();
  });
});
