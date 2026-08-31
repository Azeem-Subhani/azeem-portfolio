import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/motion/reveal";
import { getFeaturedProjects } from "@/content/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section aria-labelledby="featured-projects-title" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
            Featured work
          </p>
          <h2
            id="featured-projects-title"
            className="mt-3 text-balance font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none"
          >
            Selected projects
          </h2>
        </div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-strong"
        >
          View all projects
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
