import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import {
  ProjectFilters,
  filterValues,
  type FilterValue,
} from "@/components/projects/project-filters";
import { projects } from "@/content/projects";

describe("ProjectFilters", () => {
  it("renders every filter value as a toggle button", () => {
    render(<ProjectFilters active="All" onChange={() => {}} />);

    for (const value of filterValues) {
      expect(screen.getByRole("button", { name: value })).toBeInTheDocument();
    }
  });

  it("marks only the active filter as pressed", () => {
    render(<ProjectFilters active="Payments" onChange={() => {}} />);

    expect(screen.getByRole("button", { name: "Payments" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: "All" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
  });

  it("calls onChange with the clicked filter value", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn<(value: FilterValue) => void>();
    render(<ProjectFilters active="All" onChange={onChange} />);

    await user.click(screen.getByRole("button", { name: "Real-Time" }));

    expect(onChange).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith("Real-Time");
  });
});

describe("project category filtering", () => {
  it("returns every project for the All filter", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("returns only projects whose categories include the selected filter", () => {
    const aiProjects = projects.filter((project) =>
      project.categories.includes("AI & RAG"),
    );

    expect(aiProjects.map((project) => project.slug)).toEqual(["sports-team-app"]);
  });

  it("gives every project at least one category and a unique slug", () => {
    const slugs = new Set(projects.map((project) => project.slug));
    expect(slugs.size).toBe(projects.length);

    for (const project of projects) {
      expect(project.categories.length).toBeGreaterThan(0);
    }
  });
});
