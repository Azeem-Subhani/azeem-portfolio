import { notFound } from "next/navigation";

import { MemorialPlanningCaseStudy } from "@/components/projects/case-studies/memorial-planning-case-study";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("memorial-planning");

export default function MemorialPlanningPage() {
  const project = getProjectBySlug("memorial-planning");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <MemorialPlanningCaseStudy
        project={project}
        closer={<ProjectCloser slug={project.slug} />}
      />
    </ProjectStudy>
  );
}
