import { notFound } from "next/navigation";

import { TrackBookingCaseStudy } from "@/components/projects/case-studies/track-booking-case-study";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("track-booking");

export default function TrackBookingPage() {
  const project = getProjectBySlug("track-booking");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <TrackBookingCaseStudy project={project} />
    </ProjectStudy>
  );
}
