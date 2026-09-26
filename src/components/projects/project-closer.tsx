import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { projects } from "@/content/projects";

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

export function ProjectCloser({ slug }: ProjectCloserProps) {
  const around = neighbors(slug);

  return (
    <div
      data-project-closer=""
      className="mx-auto mt-20 max-w-case border-t border-border pt-10"
    >
      <p className="font-display text-xl font-normal">
        Want to talk through a similar build?
      </p>
      <Link
        href="/contact"
        data-inline-cta=""
        className="mt-4 inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-medium text-foreground transition-colors hover:text-accent-ink"
      >
        Get in touch
        <span aria-hidden="true">↗</span>
      </Link>

      {around ? (
        <nav
          aria-label="More projects"
          className="mt-14 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${around.previous.slug}`}
            rel="prev"
            className="group rounded-2xl border border-border p-5 transition-colors hover:border-foreground/30"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              <ArrowLeft
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:-translate-x-0.5"
              />
              Previous project
            </span>
            <span className="mt-2 block font-display text-xl font-normal">
              {around.previous.title}
            </span>
          </Link>
          <Link
            href={`/projects/${around.next.slug}`}
            rel="next"
            className="group rounded-2xl border border-border p-5 text-right transition-colors hover:border-foreground/30"
          >
            <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
              Next project
              <ArrowRight
                aria-hidden="true"
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
              />
            </span>
            <span className="mt-2 block font-display text-xl font-normal">
              {around.next.title}
            </span>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
