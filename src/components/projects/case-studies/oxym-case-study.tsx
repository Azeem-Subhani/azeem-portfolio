"use client";

import type { ReactNode } from "react";

import { OxymPhoneCapture } from "@/components/capture/oxym/phone-capture";
import { OxymPhoneInvoiceCapture } from "@/components/capture/oxym/phone-invoice-capture";
import { OxymPhoneScheduleCapture } from "@/components/capture/oxym/phone-schedule-capture";
import { OxymWebCapture } from "@/components/capture/oxym/web-capture";
import { OxymWebEmailsCapture } from "@/components/capture/oxym/web-emails-capture";
import { OxymWebInvoicesCapture } from "@/components/capture/oxym/web-invoices-capture";
import { OxymWebScheduleCapture } from "@/components/capture/oxym/web-schedule-capture";
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

import "@/components/capture/oxym/oxym-capture.css";
import "@/components/projects/mockups/oxym-phone-mock.css";

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

const OXYM_PRODUCT_URL = "https://app.oxym.com";
const OXYM_SHELL = "bg-[#0C3B2E]";
const OXYM_SCREEN = "bg-[#F4F6F2]";

type OxymCaseStudyProps = {
  project: Project;
};

function OxymWebFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="web" background="#F4F6F2">
      {children}
    </CaptureFrame>
  );
}

function OxymPhoneFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="phone" background="#F4F6F2" className="oxym-phone-mock-host">
      {children}
    </CaptureFrame>
  );
}

export function OxymCaseStudy({ project }: OxymCaseStudyProps) {
  const heroWeb = [
    {
      id: "coach-today",
      label: "Today",
      url: OXYM_PRODUCT_URL,
      tone: "oxym" as const,
      children: (
        <OxymWebFrame>
          <OxymWebCapture />
        </OxymWebFrame>
      ),
    },
    {
      id: "coach-schedule",
      label: "Schedule",
      url: `${OXYM_PRODUCT_URL}/schedule`,
      tone: "oxym" as const,
      children: (
        <OxymWebFrame>
          <OxymWebScheduleCapture />
        </OxymWebFrame>
      ),
    },
    {
      id: "coach-invoices",
      label: "Invoices",
      url: `${OXYM_PRODUCT_URL}/invoices`,
      tone: "oxym" as const,
      children: (
        <OxymWebFrame>
          <OxymWebInvoicesCapture />
        </OxymWebFrame>
      ),
    },
  ];

  const heroPhones = [
    {
      id: "team-chat",
      label: "Team chat",
      shellClassName: OXYM_SHELL,
      screenClassName: OXYM_SCREEN,
      statusTone: "dark" as const,
      children: (
        <OxymPhoneFrame>
          <OxymPhoneCapture />
        </OxymPhoneFrame>
      ),
    },
    {
      id: "player-schedule",
      label: "My schedule",
      shellClassName: OXYM_SHELL,
      screenClassName: OXYM_SCREEN,
      statusTone: "dark" as const,
      children: (
        <OxymPhoneFrame>
          <OxymPhoneScheduleCapture />
        </OxymPhoneFrame>
      ),
    },
    {
      id: "player-invoice",
      label: "Player invoice",
      shellClassName: OXYM_SHELL,
      screenClassName: OXYM_SCREEN,
      statusTone: "dark" as const,
      children: (
        <OxymPhoneFrame>
          <OxymPhoneInvoiceCapture />
        </OxymPhoneFrame>
      ),
    },
  ];

  const secondaryWeb = [
    {
      id: "coach-emails",
      label: "Matchday emails",
      url: `${OXYM_PRODUCT_URL}/emails`,
      tone: "oxym" as const,
      children: (
        <OxymWebFrame>
          <OxymWebEmailsCapture />
        </OxymWebFrame>
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
          "Oxym puts scheduling, Stripe Connect invoicing, Firestore messaging, and Socket.IO live updates in one Angular/Ionic codebase. Coaches work on the web dashboard. Players live in team chat, invoices, and schedule on mobile.",
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
