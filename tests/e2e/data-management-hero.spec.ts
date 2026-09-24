import { expect, test } from "@playwright/test";

const heroPath = "/services/data-management";

test.describe("data management hero", () => {
  test("keeps the structural graph and WebGL layer healthy", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto(heroPath);
    expect(response?.status()).toBe(200);

    await expect(
      page.getByRole("heading", { name: "one record, every system" }),
    ).toBeVisible();
    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-webgl-status", /ready|fallback/);
    await expect(page.locator(".data-hero-route")).toHaveCount(3);
    await expect(page.locator(".data-hero-pulse")).toHaveCount(3);
    await expect(
      page.getByRole("link", { name: "Start a conversation" }).first(),
    ).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  test("renders a complete static composition with reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(heroPath);

    await expect(page.locator(".data-hero-visual")).toHaveClass(/is-reduced/);
    await expect(page.locator(".data-hero-pulses")).toHaveCount(0);
    await expect(page.locator(".data-hero-route")).toHaveCount(3);
    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-webgl-status", /ready|fallback/);
  });

  test("falls back to the SVG composition when WebGL is unavailable", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        ...args
      ) {
        const contextId = String(args[0]);
        if (contextId.startsWith("webgl")) return null;
        return originalGetContext.apply(this, args);
      } as typeof originalGetContext;
    });
    await page.goto(heroPath);

    await expect(page.locator("[data-data-hero-webgl]"))
      .toHaveAttribute("data-webgl-status", "fallback");
    await expect(page.locator(".data-hero-route")).toHaveCount(3);
    await expect(page.locator(".data-hero-core-surface")).toHaveCSS(
      "opacity",
      "0.94",
    );
  });

  test("does not introduce horizontal overflow at supported layouts", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 390, height: 844 },
      { width: 768, height: 1024 },
      { width: 1024, height: 768 },
      { width: 1440, height: 900 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(heroPath);
      await expect(page.locator(".data-hero-visual")).toBeVisible();
      // The hero uses an entrance transform. Check after it has had time to
      // settle as well as on the first paint so the animation cannot create a
      // transient horizontal scroll area on narrow screens.
      await page.waitForTimeout(900);

      const overflow = await page.evaluate(() =>
        Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) -
        window.innerWidth,
      );
      expect(overflow, `${viewport.width}px layout overflows`).toBeLessThanOrEqual(0);
    }
  });
});
