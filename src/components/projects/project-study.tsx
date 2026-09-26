import type { Metadata } from "next";
import type { ReactNode } from "react";

import { ProjectTextMotion } from "@/components/projects/project-text-motion";
import { getProjectBySlug } from "@/content/projects";

export function projectMetadata(slug: string): Metadata {
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Azeem Subhani`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export function ProjectStudy({ children }: { children: ReactNode }) {
  return <ProjectTextMotion>{children}</ProjectTextMotion>;
}
