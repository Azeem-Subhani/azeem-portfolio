"use client";

import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/content";

export type FilterValue = "All" | ProjectCategory;

export const filterValues: FilterValue[] = [
  "All",
  "AI & RAG",
  "Full-Stack",
  "Payments",
  "Real-Time",
  "Mobile",
  "Cloud",
];

type ProjectFiltersProps = {
  active: FilterValue;
  onChange: (value: FilterValue) => void;
};

export function ProjectFilters({ active, onChange }: ProjectFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="catalog-filters flex min-w-0 gap-1 overflow-x-auto"
    >
      {filterValues.map((value) => {
        const isActive = value === active;

        return (
          <button
            key={value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(value)}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-2 text-[0.78rem] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              isActive
                ? "border-accent bg-accent text-accent-foreground"
                : "border-border bg-background/40 text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
