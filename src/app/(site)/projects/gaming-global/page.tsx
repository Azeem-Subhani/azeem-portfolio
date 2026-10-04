import { notFound } from "next/navigation";

import { GamingGlobalCaseStudy } from "@/components/projects/case-studies/gaming-global-case-study";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("gaming-global");

export default function GamingGlobalPage() {
  const project = getProjectBySlug("gaming-global");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <GamingGlobalCaseStudy
        project={project}
        closer={<ProjectCloser slug={project.slug} />}
      />
    </ProjectStudy>
  );
}
