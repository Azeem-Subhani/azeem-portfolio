import { notFound } from "next/navigation";

import { RealTimeChatCaseStudy } from "@/components/projects/case-studies/real-time-chat-case-study";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("real-time-chat");

export default function RealTimeChatPage() {
  const project = getProjectBySlug("real-time-chat");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <RealTimeChatCaseStudy project={project} />
    </ProjectStudy>
  );
}
