import { notFound } from "next/navigation";

import { BookingMcpCaseStudy } from "@/components/projects/case-studies/booking-mcp-case-study";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("booking-mcp");

export default function BookingMcpPage() {
  const project = getProjectBySlug("booking-mcp");
  if (!project) notFound();

  // Read-only and rate limited, so it is published on purpose. It lives in an env var
  // rather than the source because this repository is public.
  const demoKey = process.env.BOOKING_MCP_DEMO_KEY?.trim() || undefined;

  return (
    <ProjectStudy>
      <BookingMcpCaseStudy
        project={project}
        demoKey={demoKey}
        closer={<ProjectCloser slug={project.slug} />}
      />
    </ProjectStudy>
  );
}
