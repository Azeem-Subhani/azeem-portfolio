import { describe, expect, it } from "vitest";

import { INDUSTRY_SLUGS, getIndustry, industries, industryPath } from "@/content/industries";
import { industryNav } from "@/content/nav";
import { projects } from "@/content/projects";
import { services } from "@/content/services";

// Internal routes a solution link is allowed to point at.
const knownRoutes = new Set([
  ...projects.map((project) => `/projects/${project.slug}`),
  ...services.map((service) => `/services/${service.slug}`),
]);

describe("industries content", () => {
  it("covers every slug exactly once", () => {
    expect(industries.map((industry) => industry.slug).sort()).toEqual([...INDUSTRY_SLUGS].sort());
  });

  it("lists every industry in the nav, in the same order", () => {
    expect(industryNav.map((item) => item.href)).toEqual(
      industries.map((industry) => industryPath(industry.slug)),
    );
  });

  it("gives each page a hero, every section, and a CTA", () => {
    for (const industry of industries) {
      expect(industry.lede.length).toBeGreaterThan(40);
      expect(industry.challenges.length).toBeGreaterThan(1);
      expect(industry.solutions.length).toBeGreaterThan(0);
      expect(industry.stack.length).toBeGreaterThan(0);
      expect(industry.practices.length).toBeGreaterThan(0);
      expect(industry.ctaTitle.length).toBeGreaterThan(0);
      expect(getIndustry(industry.slug)?.slug).toBe(industry.slug);
      expect(industryPath(industry.slug)).toBe(`/industries/${industry.slug}`);
    }
  });

  it("points every solution link at a real project or service page", () => {
    for (const industry of industries) {
      for (const solution of industry.solutions) {
        if (solution.link) expect(knownRoutes).toContain(solution.link.href);
      }
    }
  });

  it("shows proof only where work shipped, and labels approach pages", () => {
    for (const industry of industries) {
      if (industry.evidence === "shipped") {
        expect(industry.proof.length).toBeGreaterThan(0);
        expect(industry.solutions.some((solution) => solution.link?.kind === "shipped")).toBe(true);
      } else {
        expect(industry.proof).toEqual([]);
        expect(industry.approachNote?.length ?? 0).toBeGreaterThan(40);
        expect(industry.kicker).toMatch(/Approach/);
        // An approach page never claims something shipped in that industry.
        expect(industry.solutions.every((solution) => solution.link?.kind !== "shipped")).toBe(true);
      }
    }
  });

  it("does not look like one template repeated", () => {
    const layouts = industries.map((industry) => JSON.stringify(industry.layout));
    expect(new Set(layouts).size).toBe(industries.length);
    expect(new Set(industries.map((industry) => industry.heroVisual)).size).toBe(industries.length);
    expect(new Set(industries.map((industry) => industry.tone)).size).toBe(industries.length);
  });

  it("does not invent an industry for an unknown slug", () => {
    expect(getIndustry("aerospace")).toBeUndefined();
  });
});
