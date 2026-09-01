"use client";

import { useMemo, useState } from "react";
import { AnimatePresence } from "motion/react";

import {
  ProjectFilters,
  type FilterValue,
} from "@/components/projects/project-filters";
import { ProjectCard } from "@/components/projects/project-card";
import type { Project } from "@/types/content";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  // Flips true on the first filter click. Kept false for the initial render
  // (server-rendered and the first client paint) so cards mount visible
  // instead of relying on a hidden starting style. See ProjectCard.
  const [hasFiltered, setHasFiltered] = useState(false);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) =>
      project.categories.includes(activeFilter),
    );
  }, [projects, activeFilter]);

  const handleFilterChange = (value: FilterValue) => {
    setHasFiltered(true);
    setActiveFilter(value);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <ProjectFilters active={activeFilter} onChange={handleFilterChange} />
        <p className="text-sm text-muted-foreground" aria-hidden="true">
          {filtered.length} project{filtered.length === 1 ? "" : "s"}
        </p>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        Showing {filtered.length} project{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              animateEntrance={hasFiltered}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
