import { expect, test } from "@playwright/test";

import { projects } from "@/content/projects";

test.describe("projects catalog", () => {
  test("renders the full catalog before any filter is applied", async ({ page }) => {
    await page.goto("/projects");
    await expect(page.getByRole("article")).toHaveCount(projects.length);
  });

  test("filtering narrows the grid and announces the new count", async ({ page }) => {
    await page.goto("/projects");

    const paymentsCount = projects.filter((project) =>
      project.categories.includes("Payments"),
    ).length;

    await page.getByRole("button", { name: "Payments", exact: true }).click();

    await expect(page.getByRole("article")).toHaveCount(paymentsCount);
    await expect(page.getByRole("button", { name: "Payments", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.getByRole("status")).toContainText(String(paymentsCount));
  });

  test("returning to All restores the full catalog without losing filter focus", async ({ page }) => {
    await page.goto("/projects");

    const realTime = page.getByRole("button", { name: "Real-Time", exact: true });
    await realTime.click();
    await expect(realTime).toBeFocused();

    await page.getByRole("button", { name: "All", exact: true }).click();
    await expect(page.getByRole("article")).toHaveCount(projects.length);
  });

  for (const project of projects) {
    test(`case study page builds for ${project.slug}`, async ({ page }) => {
      const response = await page.goto(`/projects/${project.slug}`);
      expect(response?.status()).toBe(200);
      await expect(
        page.getByRole("heading", { level: 1, name: project.title }),
      ).toBeVisible();
    });
  }

  test("a missing project slug renders the not-found page", async ({ page }) => {
    // A root loading.tsx makes every route stream, so Next.js has already
    // flushed a 200 status by the time notFound() runs and can't rewrite it
    // (Next docs: "Streaming"). It compensates with a noindex meta tag on
    // the streamed 404 body, which is what actually matters for crawlers.
    await page.goto("/projects/does-not-exist");
    await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
  });

  test("reduced motion skips the entrance animation entirely", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/projects");

    const firstCard = page.getByRole("article").first();
    await expect(firstCard).toBeVisible();
    await expect(firstCard).toHaveCSS("opacity", "1");
  });
});
