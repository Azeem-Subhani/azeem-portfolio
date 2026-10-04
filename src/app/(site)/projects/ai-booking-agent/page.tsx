import { notFound } from "next/navigation";

import { BookingAgentCaseStudy } from "@/components/projects/case-studies/booking-agent-case-study";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("ai-booking-agent");

export default function BookingAgentPage() {
  const project = getProjectBySlug("ai-booking-agent");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <BookingAgentCaseStudy project={project} />
    </ProjectStudy>
  );
}
