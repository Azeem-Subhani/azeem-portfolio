import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/script", () => ({ default: () => null }));

function clearCookies() {
  document.cookie.split(";").forEach((part) => {
    const name = part.trim().split("=")[0];
    if (name) document.cookie = `${name}=; Max-Age=0; Path=/`;
  });
}

// ANALYTICS_ID is read when the module loads, so import after setting it.
async function loadConsent() {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-TEST123");
  return import("@/components/privacy/privacy-consent");
}

describe("PrivacyConsent", () => {
  beforeEach(clearCookies);
  afterEach(() => {
    vi.unstubAllEnvs();
    clearCookies();
  });

  it("rejecting hides the banner and deletes GA cookies", async () => {
    const { PrivacyConsent } = await loadConsent();
    document.cookie = "_ga=GA1.1.123; Path=/";
    document.cookie = "_ga_TEST123=GS1.1.456; Path=/";
    render(<PrivacyConsent />);

    await userEvent.click(screen.getByRole("button", { name: "No thanks" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.cookie).not.toMatch(/_ga/);
    expect(document.cookie).toMatch(/azeem-analytics-consent=rejected/);
  });

  it("cookie settings lets a visitor change a stored choice", async () => {
    const { PrivacyConsent, ConsentSettingsButton } = await loadConsent();
    document.cookie = "azeem-analytics-consent=accepted; Path=/";
    render(
      <>
        <PrivacyConsent />
        <ConsentSettingsButton />
      </>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await act(async () => {
      await userEvent.click(screen.getByRole("button", { name: "Cookie settings" }));
    });

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
