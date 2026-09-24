import type { Metadata } from "next";
import { createElement } from "react";
import { notFound } from "next/navigation";

import { getCaseStudy } from "@/components/projects/case-studies/registry";
import { ProjectTextMotion } from "@/components/projects/project-text-motion";
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

  // Registry lookup returns a module-level component, so render it by reference.
  return (
    <ProjectTextMotion>{createElement(getCaseStudy(slug), { project })}</ProjectTextMotion>
  );
}
