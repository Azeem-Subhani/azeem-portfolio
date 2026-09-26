"use client";

import type { ReactNode } from "react";

import { SportsTeamPhoneCapture } from "@/components/capture/sports-team/phone-capture";
import { SportsTeamPhoneInvoiceCapture } from "@/components/capture/sports-team/phone-invoice-capture";
import { SportsTeamPhoneScheduleCapture } from "@/components/capture/sports-team/phone-schedule-capture";
import { SportsTeamWebCapture } from "@/components/capture/sports-team/web-capture";
import { SportsTeamWebEmailsCapture } from "@/components/capture/sports-team/web-emails-capture";
import { SportsTeamWebInvoicesCapture } from "@/components/capture/sports-team/web-invoices-capture";
import { SportsTeamWebScheduleCapture } from "@/components/capture/sports-team/web-schedule-capture";
import {
  CaseStudyBrief,
  CaseStudyNote,
  CaseStudyOutcomes,
  CaseStudySection,
  CaseStudyStack,
} from "@/components/projects/case-studies/case-study-sections";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import type { Project } from "@/types/content";

import "@/components/capture/sports-team/sports-team-capture.css";
import "@/components/projects/mockups/sports-team-phone-mock.css";

/*
 * FRAME PLAN
 * | kind  | id              | label              | source    | stage              |
 * |-------|-----------------|--------------------|-----------|--------------------|
 * | web   | coach-today     | Coach dashboard    | existing  | hero (primary)     |
 * | phone | team-chat       | Team chat          | existing  | hero (primary)     |
 * | web   | coach-schedule  | Schedule           | invented  | hero (primary)     |
 * | web   | coach-invoices  | Invoices & wallet  | invented  | hero (primary)     |
 * | phone | player-schedule | My schedule        | invented  | hero (primary)     |
 * | phone | player-invoice  | Player invoice     | invented  | hero (primary)     |
 * | web   | coach-emails    | Matchday emails    | invented  | secondary (browser)|
 */

const SPORTS_TEAM_PRODUCT_URL = "https://team.example.com";
const SPORTS_TEAM_SHELL = "bg-[#0C3B2E]";
const SPORTS_TEAM_SCREEN = "bg-[#F4F6F2]";

type SportsTeamCaseStudyProps = {
  project: Project;
};

function SportsTeamWebFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="web" background="#F4F6F2">
      {children}
    </CaptureFrame>
  );
}

function SportsTeamPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="phone" background="#F4F6F2" className="sports-team-phone-mock-host">
      {children}
    </CaptureFrame>
  );
}

export function SportsTeamCaseStudy({ project }: SportsTeamCaseStudyProps) {
  const heroWeb = [
    {
      id: "coach-today",
      label: "Today",
      url: SPORTS_TEAM_PRODUCT_URL,
      tone: "sports-team" as const,
      children: (
        <SportsTeamWebFrame>
          <SportsTeamWebCapture />
        </SportsTeamWebFrame>
      ),
    },
    {
      id: "coach-schedule",
      label: "Schedule",
      url: `${SPORTS_TEAM_PRODUCT_URL}/schedule`,
      tone: "sports-team" as const,
      children: (
        <SportsTeamWebFrame>
          <SportsTeamWebScheduleCapture />
        </SportsTeamWebFrame>
      ),
    },
    {
      id: "coach-invoices",
      label: "Invoices",
      url: `${SPORTS_TEAM_PRODUCT_URL}/invoices`,
      tone: "sports-team" as const,
      children: (
        <SportsTeamWebFrame>
          <SportsTeamWebInvoicesCapture />
        </SportsTeamWebFrame>
      ),
    },
  ];

  const heroPhones = [
    {
      id: "team-chat",
      label: "Team chat",
      shellClassName: SPORTS_TEAM_SHELL,
      screenClassName: SPORTS_TEAM_SCREEN,
      statusTone: "dark" as const,
      children: (
        <SportsTeamPhoneFrame>
          <SportsTeamPhoneCapture />
        </SportsTeamPhoneFrame>
      ),
    },
    {
      id: "player-schedule",
      label: "My schedule",
      shellClassName: SPORTS_TEAM_SHELL,
      screenClassName: SPORTS_TEAM_SCREEN,
      statusTone: "dark" as const,
      children: (
        <SportsTeamPhoneFrame>
          <SportsTeamPhoneScheduleCapture />
        </SportsTeamPhoneFrame>
      ),
    },
    {
      id: "player-invoice",
      label: "Player invoice",
      shellClassName: SPORTS_TEAM_SHELL,
      screenClassName: SPORTS_TEAM_SCREEN,
      statusTone: "dark" as const,
      children: (
        <SportsTeamPhoneFrame>
          <SportsTeamPhoneInvoiceCapture />
        </SportsTeamPhoneFrame>
      ),
    },
  ];

  const secondaryWeb = [
    {
      id: "coach-emails",
      label: "Matchday emails",
      url: `${SPORTS_TEAM_PRODUCT_URL}/emails`,
      tone: "sports-team" as const,
      children: (
        <SportsTeamWebFrame>
          <SportsTeamWebEmailsCapture />
        </SportsTeamWebFrame>
      ),
    },
  ];

  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      {project.visibility === "anonymized" ? (
        <CaseStudyNote>
          Client work under NDA. Names and branding here are stand-ins. The flows, stack, and
          integration patterns match what shipped.
        </CaseStudyNote>
      ) : null}

      <div className="mt-12">
        <DeviceStage layout="hero" web={heroWeb} phones={heroPhones} syncPhone />
      </div>

      <CaseStudyBrief
        problem={[
          project.context,
          "Coaches were juggling spreadsheets, group texts, and separate payment links. Players missed updates because nothing stayed in sync between web and phone.",
        ]}
        solution={[
          "The Sports Team App puts scheduling, Stripe Connect invoicing, Firestore messaging, and Socket.IO live updates in one Angular/Ionic codebase. Coaches work on the web dashboard. Players live in team chat, invoices, and schedule on mobile.",
        ]}
        points={project.approach}
      />

      <CaseStudySection
        title="Matchday email workflow"
        intro="Pre-game and post-game emails pull fixture data, squad availability, venue notes, and recent chat context before a coach reviews the draft. That RAG step replaced copying details by hand every Friday night."
      >
        <DeviceStage layout="browser" web={secondaryWeb} />
      </CaseStudySection>

      <CaseStudyStack items={project.stack} />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
