import { describe, expect, it } from "vitest";

import { SERVICE_SLUGS, getService, servicePath, services } from "@/content/services";

describe("services content", () => {
  it("covers every slug exactly once", () => {
    expect(services.map((service) => service.slug).sort()).toEqual([...SERVICE_SLUGS].sort());
  });

  it("gives each page a title, lede, proof, and CTA", () => {
    for (const service of services) {
      expect(service.titleLines.length).toBeGreaterThan(0);
      expect(service.lede.length).toBeGreaterThan(40);
      expect(service.proof.length).toBeGreaterThan(0);
      expect(service.sections.length).toBeGreaterThan(2);
      expect(service.ctaTitle.length).toBeGreaterThan(0);
      expect(getService(service.slug)?.slug).toBe(service.slug);
      expect(servicePath(service.slug)).toBe(`/services/${service.slug}`);
    }
  });

  it("does not invent a service for an unknown slug", () => {
    expect(getService("design")).toBeUndefined();
  });
});
