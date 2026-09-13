"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { projectCard } from "@/components/motion/variants";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectMockup } from "@/components/projects/project-mockup";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type ProjectCardProps = {
  project: Project;
  /**
   * Only set true for cards mounted after a filter change, which can only
   * happen once JavaScript has already run. Left false (the default) for
   * the initial catalog render so the server-rendered HTML never carries a
   * hidden starting style.
   */
  animateEntrance?: boolean;
  reverse?: boolean;
  priority?: boolean;
};

export function ProjectCard({
  project,
  animateEntrance = false,
  reverse = false,
  priority = false,
}: ProjectCardProps) {
  const reduce = useReducedMotion();
  const hasLinks = Boolean(project.liveUrl || project.repositoryUrl);
  const cardCategories = project.categories.slice(0, 2);

  return (
    <motion.article
      layout
      variants={projectCard}
      initial={animateEntrance && !reduce ? "hidden" : false}
      animate="visible"
      exit="hidden"
      className="relative overflow-hidden rounded-[26px]"
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "group relative grid cursor-pointer gap-0 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch",
          reverse && "lg:grid-cols-[0.95fr_1.05fr]",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 rounded-[26px] opacity-0 shadow-[inset_0_0_0_1.5px_color-mix(in_srgb,var(--accent)_72%,transparent)] transition-opacity duration-200 motion-safe:group-hover:opacity-100 motion-safe:group-focus-visible:opacity-100"
        />

        <ProjectMockup
          project={project}
          density="card"
          reverse={reverse}
          priority={priority}
          hoverable
          sizes="(min-width: 1024px) 52vw, 100vw"
          className={cn(reverse && "lg:order-2")}
        />

        <div
          className={cn(
            "relative flex flex-col justify-center bg-surface px-8 py-8 sm:px-10 lg:px-11 lg:py-10",
            hasLinks && "pb-16",
            reverse && "lg:order-1",
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            {cardCategories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border px-3 py-1 text-[0.7rem] font-medium text-muted-foreground"
              >
                {category}
              </span>
            ))}
          </div>

          {project.productPath ? (
            <p className="mt-3 font-mono text-[0.7rem] text-muted-foreground">
              {project.productPath}
            </p>
          ) : null}

          <h2 className="mt-3 text-balance font-display text-[1.625rem] font-normal leading-[1.12] tracking-tight sm:text-[1.875rem]">
            {project.title}
          </h2>
          <p className="mt-3.5 max-w-xl text-[0.9375rem] leading-[1.7] text-muted-foreground">
            {project.summary}
          </p>

          <dl className="mt-6 flex gap-8">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-display text-[1.625rem] font-normal tracking-tight text-accent">
                  {metric.value}
                </dt>
                <dd className="mt-0.5 text-[0.78rem] text-muted-foreground">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>

          <span className="mt-7 inline-flex w-fit items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-transform duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:translate-x-0.5">
            Read case study
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </Link>

      {hasLinks ? (
        <ProjectLinks
          project={project}
          className={cn(
            "absolute z-20 flex gap-4",
            "bottom-6 left-8 sm:left-10",
            reverse ? "lg:left-11" : "lg:left-auto lg:right-11",
          )}
        />
      ) : null}
    </motion.article>
  );
}
