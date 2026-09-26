import { notFound } from "next/navigation";

import { SmartLivingCaseStudy } from "@/components/projects/case-studies/smart-living-case-study";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("smart-living");

export default function SmartLivingPage() {
  const project = getProjectBySlug("smart-living");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <SmartLivingCaseStudy project={project} />
    </ProjectStudy>
  );
}
