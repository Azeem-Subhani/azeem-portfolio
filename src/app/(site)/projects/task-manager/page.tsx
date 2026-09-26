import { notFound } from "next/navigation";

import { TaskManagerCaseStudy } from "@/components/projects/case-studies/task-manager-case-study";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("task-manager");

export default function TaskManagerPage() {
  const project = getProjectBySlug("task-manager");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <TaskManagerCaseStudy project={project} />
    </ProjectStudy>
  );
}
