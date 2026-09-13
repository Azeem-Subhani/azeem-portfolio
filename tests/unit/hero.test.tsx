import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "@/components/sections/hero";

describe("Hero", () => {
  it("renders the stacked outcome headline and product CTAs", () => {
    render(<Hero />);

    const title = screen.getByRole("heading", { level: 1 });
    expect(title).toHaveTextContent(/take/i);
    expect(title).toHaveTextContent(/the idea/i);
    expect(title).toHaveTextContent(/customers/i);
    expect(screen.getByRole("link", { name: "Contact" })).toHaveAttribute(
      "href",
      "/contact",
    );
    expect(screen.getByRole("link", { name: "View projects" })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.queryByText(/resume/i)).not.toBeInTheDocument();
    expect(screen.getByText(/how the work connects/i)).toBeInTheDocument();
    expect(
      screen.getByRole("list", {
        name: /interface, api, data, cloud, and ai/i,
      }),
    ).toBeInTheDocument();
  });
});
