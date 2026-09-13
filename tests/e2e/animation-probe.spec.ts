import { expect, test } from "@playwright/test";

test.describe("homepage motion surfaces", () => {
  test("hydrates the current hero and scroll-driven sections without runtime errors", async ({
    page,
  }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page.locator("#hero-title")).toBeVisible();
    await expect(page.locator("#hero-title [data-hero-line]")).toHaveCount(4);
    await expect(page.locator("[data-hero-map-panel]")).toBeVisible();
    await expect(page.locator('[data-hero-actions] a[href="/contact"]')).toBeVisible();

    // Let the intro and hero entrance settle before probing the animated sections.
    await page.waitForTimeout(1_200);

    const heroLineStyles = await page.locator("#hero-title [data-hero-line]").evaluateAll(
      (lines) => lines.map((line) => getComputedStyle(line).opacity),
    );
    expect(heroLineStyles.every((opacity) => Number(opacity) > 0.9)).toBe(true);

    const featureHeading = page.getByRole("heading", { name: "Ship an MVP" });
    await featureHeading.scrollIntoViewIfNeeded();
    await expect(featureHeading).toBeVisible();

    const stackLoop = page.getByRole("region", { name: "Technology stack", exact: true });
    await stackLoop.scrollIntoViewIfNeeded();
    await expect(stackLoop).toBeVisible();

    const cloudSection = page.locator("#cloud").first();
    await cloudSection.scrollIntoViewIfNeeded();
    await expect(cloudSection).toBeVisible();

    const ctaTitle = page.locator("#cta-title");
    await ctaTitle.scrollIntoViewIfNeeded();
    await expect(ctaTitle).toBeVisible();
    await expect(page.getByRole("link", { name: "Start a conversation" })).toBeVisible();

    expect(pageErrors).toEqual([]);
  });

  test("reduced motion keeps the hero immediately readable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const hero = page.locator("#hero-title");
    await expect(hero).toBeVisible();
    await expect(hero.locator("[data-hero-line]").last()).toContainText("customers");

    const opacities = await hero.locator("[data-hero-line]").evaluateAll((lines) =>
      lines.map((line) => getComputedStyle(line).opacity),
    );
    expect(opacities.every((opacity) => Number(opacity) > 0.9)).toBe(true);
  });
});
