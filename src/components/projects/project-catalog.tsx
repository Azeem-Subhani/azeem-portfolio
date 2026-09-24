"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import {
  ProjectFilters,
  type FilterValue,
} from "@/components/projects/project-filters";
import { ProjectMockup } from "@/components/projects/project-mockup";
import { preloadLiveMockups } from "@/components/projects/mockups/registry";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type ProjectCatalogProps = {
  projects: Project[];
};

const STAGE_EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 5000;

/** Every project is full-stack, so the index shows the tag that actually sets it apart. */
function distinctTag(project: Project) {
  return project.categories.find((category) => category !== "Full-Stack") ?? project.categories[0];
}

function CatalogStage({
  project,
  projectIndex,
  projectCount,
  reduce,
  autoplay,
  onToggleAutoplay,
  onPrevious,
  onNext,
}: {
  project: Project;
  projectIndex: number;
  projectCount: number;
  reduce: boolean;
  autoplay: boolean;
  onToggleAutoplay: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const canAutoplay = !reduce && projectCount > 1;
  return (
    <div className="catalog-stage">
      <div className="catalog-stage-top">
        <span>Currently viewing</span>
        <span className="catalog-stage-count">
          {projectIndex + 1} of {projectCount}
          {canAutoplay ? (
            // Auto-moving content needs a visible pause (WCAG 2.2.2); hover alone never reaches touch.
            <button
              type="button"
              onClick={onToggleAutoplay}
              aria-pressed={!autoplay}
              className="catalog-autoplay"
            >
              {autoplay ? "Pause" : "Play"}
            </button>
          ) : null}
        </span>
      </div>

      <div className="catalog-stage-visual" aria-hidden="true">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={project.slug}
            initial={
              reduce
                ? false
                : { opacity: 0, scale: 0.96, y: 18, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduce
                ? undefined
                : { opacity: 0, scale: 1.02, y: -12, filter: "blur(6px)" }
            }
            transition={{ duration: reduce ? 0 : 0.5, ease: STAGE_EASE }}
            className="absolute inset-0"
          >
            <ProjectMockup
              project={project}
              density="catalog"
              glow={false}
              className="h-full min-h-0 aspect-auto"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="catalog-stage-caption">
        <div className="min-w-0">
          {project.productPath ? (
            <p className="catalog-path">{project.productPath}</p>
          ) : null}
          <h2 className="catalog-stage-title text-balance">{project.title}</h2>
          <p className="catalog-stage-summary">{project.summary}</p>
          <Link
            href={`/projects/${project.slug}`}
            className="catalog-case-link"
          >
            View case study
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        <div className="catalog-stage-side">
          <dl className="catalog-metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.value}</dt>
                <dd>{metric.label}</dd>
              </div>
            ))}
          </dl>
          <div className="catalog-controls" aria-label="Browse featured project">
            <button
              type="button"
              onClick={onPrevious}
              aria-label="Show previous project"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Show next project"
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogListItem({
  project,
  active,
  onSelect,
}: {
  project: Project;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <li
      data-project-slug={project.slug}
      data-catalog-active={active ? "true" : undefined}
      onMouseEnter={() => onSelect(project.slug)}
      onFocusCapture={() => onSelect(project.slug)}
    >
      <Link
        href={`/projects/${project.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-current={active ? "true" : undefined}
        className={cn("catalog-project-link", active && "is-active")}
      >
        <span className="catalog-project-title">{project.title}</span>
        <span className="catalog-project-meta">
          {distinctTag(project)}
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </span>
      </Link>
    </li>
  );
}

export function ProjectCatalog({ projects }: ProjectCatalogProps) {
  const reduce = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [activeSlug, setActiveSlug] = useState(projects[0]?.slug ?? "");
  const [paused, setPaused] = useState(false);
  // Rotation is a teaser: once someone picks, filters, or presses pause, it stays put.
  const [autoplay, setAutoplay] = useState(true);

  const filtered = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) =>
      project.categories.includes(activeFilter),
    );
  }, [projects, activeFilter]);

  const active =
    filtered.find((project) => project.slug === activeSlug) ?? filtered[0];

  // Warm the other slides' live captures once the page is idle, so rotating or picking a
  // project never waits on a chunk download. First paint only pays for the visible one.
  useEffect(() => {
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(preloadLiveMockups, { timeout: 2500 })
      : window.setTimeout(preloadLiveMockups, 1200);
    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  const selectProject = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  useEffect(() => {
    if (reduce || paused || !autoplay || filtered.length <= 1) return;

    const timer = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;

      setActiveSlug((currentSlug) => {
        const currentIndex = filtered.findIndex(
          (project) => project.slug === currentSlug,
        );
        const next = filtered[(currentIndex + 1) % filtered.length];
        return next?.slug ?? currentSlug;
      });
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [filtered, paused, autoplay, reduce]);

  const moveProject = (direction: -1 | 1) => {
    setAutoplay(false);
    const index = filtered.findIndex(
      (project) => project.slug === (active?.slug ?? activeSlug),
    );
    const next = filtered[(index + direction + filtered.length) % filtered.length];
    if (next) selectProject(next.slug);
  };

  const handleFilterChange = (value: FilterValue) => {
    setAutoplay(false);
    setActiveFilter(value);
    const next =
      value === "All"
        ? projects
        : projects.filter((project) => project.categories.includes(value));

    if (!next.some((project) => project.slug === activeSlug)) {
      setActiveSlug(next[0]?.slug ?? "");
    }
  };

  if (!active) return null;

  const activeIndex = filtered.findIndex((project) => project.slug === active.slug);

  return (
    <div
      data-project-catalog
      data-catalog-paused={paused ? "true" : "false"}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="catalog-toolbar">
        <div>
          <p className="catalog-toolbar-title">Browse the work</p>
          <p className="catalog-toolbar-copy">
            Filter by problem space. The preview rotates until you pick one or press
            pause.
          </p>
        </div>
        <div className="catalog-toolbar-filter">
          <ProjectFilters active={activeFilter} onChange={handleFilterChange} />
          <p className="catalog-count" aria-hidden="true">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </p>
        </div>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        Showing {filtered.length} {filtered.length === 1 ? "project" : "projects"}.
        {/* Only announce the project once the visitor is driving; rotation every 5s was noise. */}
        {filtered.length > 1 && !autoplay ? ` Currently viewing ${active.title}.` : ""}
      </p>

      <div className="catalog-layout">
        <div className="catalog-stage-column">
          <CatalogStage
            project={active}
            projectIndex={activeIndex}
            projectCount={filtered.length}
            reduce={reduce}
            autoplay={autoplay}
            onToggleAutoplay={() => setAutoplay((value) => !value)}
            onPrevious={() => moveProject(-1)}
            onNext={() => moveProject(1)}
          />
        </div>

        <div className="catalog-index">
          <div className="catalog-index-heading">
            <span>Project index</span>
            <span>Hover or focus to preview</span>
          </div>
          <ol>
            {filtered.map((project) => (
              <CatalogListItem
                key={project.slug}
                project={project}
                active={project.slug === active.slug}
                onSelect={selectProject}
              />
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
