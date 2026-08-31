"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import { projectCard } from "@/components/motion/variants";
import { ProjectLinks } from "@/components/projects/project-links";
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
};

export function ProjectCard({ project, animateEntrance = false }: ProjectCardProps) {
  return (
    <motion.article
      layout
      variants={projectCard}
      initial={animateEntrance ? "hidden" : false}
      animate="visible"
      exit="hidden"
      whileHover="hover"
      className="group overflow-hidden rounded-lg border border-border bg-surface"
    >
      <Link href={`/projects/${project.slug}`} className="block">
        <div className="relative aspect-16/10 overflow-hidden bg-surface-elevated">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground"
              >
                {category}
              </span>
            ))}
          </div>

          <h2 className="mt-6 font-display text-3xl font-semibold">
            {project.title}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {project.summary}
          </p>

          <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
            Read case study
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </div>
      </Link>

      <ProjectLinks
        project={project}
        className="flex gap-4 border-t border-border px-6 py-4 sm:px-8"
      />
    </motion.article>
  );
}
