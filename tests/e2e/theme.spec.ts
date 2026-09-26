import { expect, test } from "@playwright/test";

test.describe("theme", () => {
  test("defaults to dark on first visit, even with a light system theme", async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await expect(page.locator("html")).toHaveClass(/dark/);
  });

  test("toggling the theme persists across a reload", async ({ page }) => {
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");

    const toggle = page.getByRole("button", { name: /Use (dark|light) theme/ });
    await toggle.click();
    await expect(page.locator("html")).not.toHaveClass(/dark/);

    await page.reload();
    await expect(page.locator("html")).not.toHaveClass(/dark/);
  });
});
