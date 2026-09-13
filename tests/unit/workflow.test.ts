import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";
import { getWorkflow, workflows } from "@/content/workflows";
import { STACK_ICON_IDS } from "@/types/content";

const iconIds = new Set<string>(STACK_ICON_IDS);

describe("project workflows", () => {
  it("defines a graph for every project slug", () => {
    for (const project of projects) {
      expect(getWorkflow(project.slug), project.slug).toBeDefined();
    }
  });

  it("keeps hub and orbit ids unique on each graph", () => {
    for (const [slug, workflow] of Object.entries(workflows)) {
      const ids = [workflow.hub.id, ...workflow.orbit.map((tile) => tile.id)];

      expect(new Set(ids).size, slug).toBe(ids.length);
      expect(workflow.orbit.length, slug).toBeGreaterThanOrEqual(5);
      expect(workflow.orbit.length, slug).toBeLessThanOrEqual(8);
    }
  });

  it("uses a known stack icon id on every tile", () => {
    for (const [slug, workflow] of Object.entries(workflows)) {
      const tiles = [workflow.hub, ...workflow.orbit];

      for (const tile of tiles) {
        expect(iconIds.has(tile.icon), `${slug} ${tile.id} icon:${tile.icon}`).toBe(true);
        expect(tile.label.length, `${slug} ${tile.id} label`).toBeGreaterThan(0);
      }
    }
  });
});
