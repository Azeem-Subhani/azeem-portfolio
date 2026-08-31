import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CertificateCard } from "@/components/certificates/certificate-card";
import type { Certificate } from "@/types/content";

const baseCertificate: Certificate = {
  title: "Building with Claude API",
  issuer: "Anthropic",
  verificationUrl: "https://verify.skilljar.com/c/gumneftwwph6",
};

describe("CertificateCard", () => {
  it("renders the title and issuer", () => {
    render(<CertificateCard certificate={baseCertificate} />);

    expect(
      screen.getByRole("heading", { name: "Building with Claude API" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Anthropic")).toBeInTheDocument();
  });

  it("links to the verification URL with an accessible name and opens in a new tab", () => {
    render(<CertificateCard certificate={baseCertificate} />);

    const link = screen.getByRole("link", {
      name: "Verify credential for Building with Claude API, opens in a new tab",
    });

    expect(link).toHaveAttribute("href", baseCertificate.verificationUrl);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noreferrer");
  });

  it("shows the issued date only when provided", () => {
    render(
      <CertificateCard
        certificate={{ ...baseCertificate, issued: "September 2023" }}
      />,
    );
    expect(screen.getByText("Issued September 2023")).toBeInTheDocument();
  });

  it("omits the issued line when no date is given", () => {
    render(<CertificateCard certificate={baseCertificate} />);
    expect(screen.queryByText(/Issued/)).not.toBeInTheDocument();
  });
});
