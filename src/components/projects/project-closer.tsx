import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { filterTags } from "@/components/projects/project-tag";
import { Button } from "@/components/ui/button";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/content";

type ProjectCloserProps = {
  /** Current project slug; previous/next wrap around the catalog order. */
  slug: string;
};

function neighbors(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0 || projects.length < 2) return null;
  const at = (offset: number) =>
    projects[(index + offset + projects.length) % projects.length];
  return { previous: at(-1), next: at(1) };
}

/** A short line under the neighbor's title so the card says what kind of build it is. */
function neighborDetail(project: Project) {
  const tags = filterTags(project);
  return tags.length ? tags.slice(0, 2).join(" · ") : project.productPath;
}

function NeighborCard({
  project,
  direction,
}: {
  project: Project;
  direction: "prev" | "next";
}) {
  const isNext = direction === "next";
  const detail = neighborDetail(project);
  const Arrow = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      href={`/projects/${project.slug}`}
      rel={direction}
      prefetch={false}
      className={cn(
        "group flex flex-col rounded-md border border-border p-5 transition-colors hover:border-foreground/30",
        isNext ? "items-end text-right" : "items-start",
      )}
    >
      {/* Same row structure on both cards so the two labels share a baseline. */}
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs leading-none text-muted-foreground",
          isNext && "flex-row-reverse",
        )}
      >
        <Arrow
          aria-hidden="true"
          className={cn(
            "size-3.5 transition-transform",
            isNext ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5",
          )}
        />
        {isNext ? "Next project" : "Previous project"}
      </span>
      <span className="mt-3 block font-display text-xl font-normal">
        {project.title}
      </span>
      {detail ? (
        <span className="mt-1 block text-sm text-muted-foreground">{detail}</span>
      ) : null}
    </Link>
  );
}

export function ProjectCloser({ slug }: ProjectCloserProps) {
  const around = neighbors(slug);

  return (
    <div
      data-project-closer=""
      className="mx-auto mt-20 max-w-case border-t border-border pt-12"
    >
      <h2 className="max-w-xl text-balance font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-[1.02]">
        Want to talk through a similar build?
      </h2>
      {/* Same filled button the other pages close on, directly under the line it answers. */}
      <div data-inline-cta="" className="mt-8 w-fit">
        <MagneticButton>
          <Button asChild size="lg">
            <Link href="/contact">Start a conversation</Link>
          </Button>
        </MagneticButton>
      </div>

      {around ? (
        <nav
          aria-label="More projects"
          className="mt-16 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          <NeighborCard project={around.previous} direction="prev" />
          <NeighborCard project={around.next} direction="next" />
        </nav>
      ) : null}
    </div>
  );
}
