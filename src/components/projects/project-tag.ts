import type { Project, ProjectCategory } from "@/types/content";

/*
 * Kept out of project-filters.tsx (a client module) so server components such as
 * ProjectCloser can call these helpers too.
 */

/** Categories the catalog can filter by. No "Full-Stack": every project carries it, so the filter never narrowed anything. */
export const FILTER_CATEGORIES = [
  "AI & RAG",
  "Payments",
  "Real-Time",
  "Mobile",
  "Cloud",
] as const satisfies readonly ProjectCategory[];

function isFilterCategory(category: ProjectCategory) {
  return (FILTER_CATEGORIES as readonly ProjectCategory[]).includes(category);
}

/** The project's categories that match a catalog filter, in the project's own order. */
export function filterTags(project: Project): ProjectCategory[] {
  return project.categories.filter(isFilterCategory);
}

/**
 * The one tag a project row shows: the active filter when one is applied, otherwise the
 * first tag a visitor could filter by. Undefined when the project has no filterable tag.
 */
export function projectTag(project: Project, activeFilter?: string) {
  if (activeFilter && activeFilter !== "All") {
    const match = project.categories.find((category) => category === activeFilter);
    if (match) return match;
  }
  return filterTags(project)[0];
}
