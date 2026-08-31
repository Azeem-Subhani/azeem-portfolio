import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ProjectLinks } from "@/components/projects/project-links";
import { getProjectBySlug, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Azeem Subhani`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-4xl px-6 py-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        All projects
      </Link>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.categories.map((category) => (
          <span
            key={category}
            className="rounded-full border border-border px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-muted-foreground"
          >
            {category}
          </span>
        ))}
      </div>

      <h1 className="mt-4 text-balance font-display text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-none">
        {project.title}
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">{project.summary}</p>

      <div className="relative mt-10 aspect-16/10 overflow-hidden rounded-lg border border-border bg-surface-elevated">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(min-width: 1024px) 800px, 100vw"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-[1fr_1fr]">
        <section>
          <h2 className="font-display text-2xl font-semibold">Context</h2>
          <p className="mt-3 text-muted-foreground">{project.context}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold">My role</h2>
          <p className="mt-3 text-muted-foreground">{project.role}</p>
        </section>
      </div>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          Technical approach
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {project.approach.map((item) => (
            <li
              key={item}
              className="rounded-md border border-border bg-surface p-4 text-sm text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">Outcome</h2>
        <ul className="mt-4 grid gap-3">
          {project.outcomes.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">
          Technology stack
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <ProjectLinks project={project} className="mt-10 flex gap-6 border-t border-border pt-8" />
    </article>
  );
}
