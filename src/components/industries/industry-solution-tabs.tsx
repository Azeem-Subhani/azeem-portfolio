"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { Check } from "lucide-react";

import { IconMark } from "@/components/industries/industry-icons";
import { SolutionLink } from "@/components/industries/solution-link";
import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { CardGlow, cardClassName } from "@/components/why/why-sections";
import { cn } from "@/lib/utils";
import type { IndustrySolution } from "@/types/content";

/**
 * Solutions as tabs: titles on the left, one panel on the right. Follows the WAI-ARIA tabs
 * pattern (roving tabindex, arrow keys, Home/End). The panel re-mounts on change so its
 * checklist replays the entrance stagger in CSS.
 */
export function IndustrySolutionTabs({
  solutions,
  spotlight,
}: {
  solutions: IndustrySolution[];
  spotlight: `rgba(${number}, ${number}, ${number}, ${number})`;
}) {
  const baseId = useId();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const solution = solutions[active];

  const focusTab = (index: number) => {
    const next = (index + solutions.length) % solutions.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      focusTab(active + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      focusTab(active - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTab(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTab(solutions.length - 1);
    }
  };

  return (
    <div data-im-card className="grid gap-4 lg:grid-cols-[20rem_minmax(0,1fr)]">
      <div role="tablist" aria-orientation="vertical" aria-label="Solutions" className="grid content-start gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {solutions.map((item, index) => {
          const selected = index === active;
          return (
            <button
              key={item.title}
              ref={(node) => {
                tabRefs.current[index] = node;
              }}
              id={`${baseId}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={onKeyDown}
              className={cn(
                "group relative flex items-center gap-3 overflow-hidden rounded-[var(--shape-radius-lg)] border px-4 py-3 text-left transition-[border-color,background-color] duration-300",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
                selected
                  ? "border-accent/50 bg-surface"
                  : "border-border bg-transparent hover:border-foreground/25 hover:bg-surface/50",
              )}
            >
              {/* Accent bar slides in on the active tab. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-2 left-0 w-0.5 origin-center rounded-full bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none",
                  selected ? "scale-y-100" : "scale-y-0",
                )}
              />
              <IconMark icon={item.icon} className="size-9" />
              <span className="min-w-0">
                <span className="block font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                  {item.link ? null : " · Approach"}
                </span>
                <span className={cn("block text-sm font-medium", selected ? "text-foreground" : "text-foreground/75")}>
                  {item.title}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <SpotlightCard spotlightColor={spotlight} className={cn(cardClassName, "lg:p-8")}>
        <CardGlow />
        <div
          key={active}
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${active}`}
          tabIndex={0}
          className="industry-tab-panel focus-visible:outline-none"
        >
          <h3 className="font-display text-[1.9rem] font-normal leading-tight">{solution.title}</h3>
          <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">{solution.copy}</p>
          <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2" aria-label={`${solution.title} features`}>
            {solution.features.map((feature, index) => (
              <li
                key={feature}
                className="industry-tab-item flex items-start gap-2.5 text-sm text-foreground/85"
                style={{ animationDelay: `${120 + index * 45}ms` }}
              >
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[var(--accent-readable)]" strokeWidth={2} />
                {feature}
              </li>
            ))}
          </ul>
          <SolutionLink link={solution.link} className="mt-7" />
        </div>
      </SpotlightCard>
    </div>
  );
}
