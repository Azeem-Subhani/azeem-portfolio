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
      className="flex flex-wrap gap-2 rounded-full border border-border bg-glass p-1.5 backdrop-blur-xl sm:inline-flex"
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
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}
