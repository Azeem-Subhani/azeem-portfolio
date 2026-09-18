"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { OxymPhoneCapture } from "@/components/capture/oxym/phone-capture";
import { OxymPhoneInvoiceCapture } from "@/components/capture/oxym/phone-invoice-capture";
import { OxymPhoneScheduleCapture } from "@/components/capture/oxym/phone-schedule-capture";
import { OxymWebCapture } from "@/components/capture/oxym/web-capture";
import { OxymWebEmailsCapture } from "@/components/capture/oxym/web-emails-capture";
import { OxymWebInvoicesCapture } from "@/components/capture/oxym/web-invoices-capture";
import { OxymWebScheduleCapture } from "@/components/capture/oxym/web-schedule-capture";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
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
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      {project.visibility === "anonymized" ? (
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
          Client work under NDA. Names and branding here are stand-ins. The flows, stack, and
          integration patterns match what shipped.
        </p>
      ) : null}

      <section className="mt-12" aria-label="Product hero">
        <DeviceStage layout="hero" web={heroWeb} phones={heroPhones} syncPhone />
      </section>

      <div className="mx-auto mt-20 grid max-w-5xl gap-14 lg:grid-cols-2 lg:gap-16">
        <section>
          <h2 className="font-display text-2xl font-normal">The problem</h2>
          <p className="mt-4 leading-7 text-muted-foreground">{project.context}</p>
          <p className="mt-4 leading-7 text-muted-foreground">
            Coaches were juggling spreadsheets, group texts, and separate payment links. Players
            missed updates because nothing stayed in sync between web and phone.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal">What we built</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Oxym puts scheduling, Stripe Connect invoicing, Firestore messaging, and Socket.IO
            live updates in one Angular/Ionic codebase. Coaches work on the web dashboard. Players
            live in team chat, invoices, and schedule on mobile.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">{project.role}</p>
        </section>
      </div>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Matchday email workflow</h2>
        <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
          Pre-game and post-game emails pull fixture data, squad availability, venue notes, and
          recent chat context before a coach reviews the draft. That RAG step replaced copying
          details by hand every Friday night.
        </p>
        <div className="mt-10">
          <DeviceStage layout="browser" web={secondaryWeb} />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Technical approach</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {project.approach.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-border bg-card/40 p-5 text-sm leading-6 text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Stack</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-2xl border border-border px-4 py-3 font-mono text-xs text-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Outcomes</h2>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="border-l-2 border-accent/40 pl-5">
              <dt className="font-display text-[1.625rem] font-normal tracking-tight text-accent">
                {metric.value}
              </dt>
              <dd className="mt-1 text-sm leading-6 text-muted-foreground">{metric.label}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-10 space-y-3">
          {project.outcomes.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mx-auto mt-20 max-w-5xl border-t border-border pt-10">
        <p className="font-display text-xl font-normal">Want to talk through a similar build?</p>
        <Link
          href="/contact"
          className="mt-4 inline-flex items-center gap-2 border-b border-accent pb-1 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          Get in touch
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </article>
  );
}
