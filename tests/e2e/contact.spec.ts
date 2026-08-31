import { expect, test, type Page } from "@playwright/test";

// Scoped to <main> so field lookups never collide with the footer's own
// "Send an email" / "LinkedIn profile" links, which share substrings with
// the form's accessible names.
function contactForm(page: Page) {
  return page.locator("main");
}

test.describe("contact form", () => {
  test("rejects an empty submission with a message next to every invalid field", async ({ page }) => {
    await page.goto("/contact");

    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Enter your name.")).toBeVisible();
    await expect(page.getByText("Enter your email.")).toBeVisible();
    await expect(page.getByText("Select a service.")).toBeVisible();
    await expect(
      page.getByText("Message should be at least 10 characters."),
    ).toBeVisible();
  });

  test("rejects a malformed email address", async ({ page }) => {
    await page.goto("/contact");

    await contactForm(page).getByLabel("Email", { exact: true }).fill("not-an-email");
    await page.getByRole("button", { name: "Send message" }).click();

    await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  });

  test("submits valid data and shows a clear outcome message", async ({ page }) => {
    await page.goto("/contact");
    const form = contactForm(page);

    await form.getByLabel("Name", { exact: true }).fill("Jordan Rivera");
    await form.getByLabel("Email", { exact: true }).fill("jordan@example.com");
    await form.getByLabel("Message", { exact: true }).fill(
      "Hi, I would like to talk about a project.",
    );

    await form.getByLabel("Service", { exact: true }).click();
    await page.getByRole("option", { name: "Technical Consultation" }).click();

    await page.getByRole("button", { name: "Send message" }).click();

    // Without RESEND_API_KEY configured in this environment, delivery fails
    // and the form should surface the direct-email fallback rather than a
    // silent failure or a stuck loading state.
    await expect(page.getByRole("status")).toContainText(
      /Message sent\.|Something went wrong sending your message/,
    );
  });

  test("keeps the honeypot field hidden from sighted users and out of the tab order", async ({ page }) => {
    await page.goto("/contact");

    const honeypot = page.locator('input[name="company"]');
    await expect(honeypot).toBeHidden();
    await expect(honeypot).toHaveAttribute("tabindex", "-1");
  });

  test("keeps direct email and LinkedIn links visible without relying on the form", async ({ page }) => {
    await page.goto("/contact");
    const main = contactForm(page);

    await expect(
      main.getByRole("link", { name: "azeemsubhani@proton.me" }),
    ).toHaveAttribute("href", "mailto:azeemsubhani@proton.me");
    await expect(main.getByRole("link", { name: "LinkedIn", exact: true })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/azeem-subhani-cs/",
    );
  });
});
