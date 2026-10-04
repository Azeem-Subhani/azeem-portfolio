import { notFound } from "next/navigation";

import { TaskManagerCaseStudy } from "@/components/projects/case-studies/task-manager-case-study";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("task-manager");

export default function TaskManagerPage() {
  const project = getProjectBySlug("task-manager");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <TaskManagerCaseStudy
        project={project}
        closer={<ProjectCloser slug={project.slug} />}
      />
    </ProjectStudy>
  );
}
