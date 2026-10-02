/*
 * FRAME PLAN
 * Primary DeviceStage (layout browser, web only; booking-mcp has no UI of its own):
 *   Web 1: Session — BookingMcpWebCapture @ booking-mcp.azeemsubhani.workers.dev/mcp
 *   Web 2: Guardrails — BookingMcpWebGuardrailsCapture @ booking-mcp.azeemsubhani.workers.dev/mcp
 * All captures: CaptureFrame #FFFFFF; browser tone white.
 */

"use client";

import { BookingMcpWebCapture } from "@/components/capture/booking-mcp/web-capture";
import { BookingMcpWebGuardrailsCapture } from "@/components/capture/booking-mcp/web-guardrails-capture";
import {
  CaseStudyBrief,
  CaseStudyOutcomes,
  CaseStudySection,
  CaseStudyStack,
} from "@/components/projects/case-studies/case-study-sections";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import type { Project } from "@/types/content";

import "@/components/capture/booking-mcp/booking-mcp-capture.css";

const SCREEN = "#FFFFFF";
const MCP_URL = "https://booking-mcp.azeemsubhani.workers.dev/mcp";

type BookingMcpCaseStudyProps = {
  project: Project;
  /** Public read-only demo key, injected at build time. Absent until the env var is set. */
  demoKey?: string;
};

export function BookingMcpCaseStudy({ project, demoKey }: BookingMcpCaseStudyProps) {
  const command = `claude mcp add --transport http booking ${MCP_URL} --header "Authorization: Bearer ${demoKey ?? "<demo key>"}"`;

  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-12">
        <DeviceStage
          layout="browser"
          web={[
            {
              id: "session",
              label: "Session",
              url: "booking-mcp.azeemsubhani.workers.dev/mcp",
              tone: "white",
              children: (
                <CaptureFrame kind="web" background={SCREEN}>
                  <BookingMcpWebCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "guardrails",
              label: "Guardrails",
              url: "booking-mcp.azeemsubhani.workers.dev/mcp",
              tone: "white",
              children: (
                <CaptureFrame kind="web" background={SCREEN}>
                  <BookingMcpWebGuardrailsCapture />
                </CaptureFrame>
              ),
            },
          ]}
        />
      </div>

      <CaseStudyBrief
        problem={[project.context]}
        solution={[
          "I built the booking domain once and served it two ways: a REST API and an MCP server, both on one Cloudflare Worker backed by Neon Postgres. The tools carry the rules, so the assistant quotes policies from the server and reads each hold back before confirming.",
        ]}
        points={project.approach}
      />

      {/* The live server is the demo: a read-only key lets visitors try it from their own client. */}
      <CaseStudySection
        title="Try it from Claude Code"
        intro={
          demoKey
            ? "The read-only demo key gets the four read tools: policies, services, availability, and booking lookup. It allows 30 requests a minute and 1,000 a day, shared by everyone, and the sandbox resets nightly."
            : "The live server takes a read-only demo key, limited to the four read tools and shared rate limits. Get in touch for a key, or run it locally from the repository."
        }
      >
        <pre className="overflow-x-auto rounded-2xl border border-border bg-surface p-5 font-mono text-[0.8125rem] leading-6 text-foreground">
          <code>{command}</code>
        </pre>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">
          {project.repositoryUrl ? (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border-b border-accent pb-1 text-foreground transition-colors hover:text-accent"
            >
              Source on GitHub
              <span aria-hidden="true">↗</span>
            </a>
          ) : null}
        </div>
      </CaseStudySection>

      <CaseStudyStack items={project.stack} intro={project.role} />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
