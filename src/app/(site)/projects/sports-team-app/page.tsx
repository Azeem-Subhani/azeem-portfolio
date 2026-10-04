import { notFound } from "next/navigation";

import { SportsTeamCaseStudy } from "@/components/projects/case-studies/sports-team-case-study";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("sports-team-app");

export default function SportsTeamPage() {
  const project = getProjectBySlug("sports-team-app");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <SportsTeamCaseStudy
        project={project}
        closer={<ProjectCloser slug={project.slug} />}
      />
    </ProjectStudy>
  );
}
