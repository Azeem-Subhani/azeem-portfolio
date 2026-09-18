"use client";

import type { ReactNode } from "react";

import { SmartLivingPhoneAlertsCapture } from "@/components/capture/smart-living/phone-alerts-capture";
import { SmartLivingPhoneCallCapture } from "@/components/capture/smart-living/phone-call-capture";
import { SmartLivingPhoneCapture } from "@/components/capture/smart-living/phone-capture";
import { SmartLivingWebAlertsCapture } from "@/components/capture/smart-living/web-alerts-capture";
import { SmartLivingWebCapture } from "@/components/capture/smart-living/web-capture";
import { SmartLivingWebSchedulingCapture } from "@/components/capture/smart-living/web-scheduling-capture";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import { ContactCta } from "@/components/sections/contact-cta";
import type { Project } from "@/types/content";

import "@/components/capture/smart-living/smart-living-capture.css";
import "@/components/projects/mockups/smart-living-phone-mock.css";

/*
 * FRAME PLAN
 * Hero DeviceStage (layout hero, syncPhone): 3 web + 3 phone, index-aligned.
 *   Web: overview (web-capture), alert console (web-alerts-capture), event scheduling (web-scheduling-capture).
 *   Phone: shift overview (phone-capture), alerts queue (phone-alerts-capture), resident call (phone-call-capture).
 * Secondary DeviceStage (layout row): 3 labeled phones for floor workflow (alerts, call, overview).
 * All web frames use CaptureFrame kind web #F7F9FC inside BrowserFrame tone white.
 * All phone frames use CaptureFrame kind phone + sl-phone-mock-host; shell #0F141B, statusTone light.
 */

const WEB_BG = "#F7F9FC";
const PHONE_SHELL = "bg-[#0F141B]";
const PHONE_SCREEN = "bg-[#F7F9FC]";

function WebStage({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="web" background={WEB_BG}>
      {children}
    </CaptureFrame>
  );
}

function PhoneStage({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame
      kind="phone"
      background={WEB_BG}
      className="sl-phone-mock-host"
    >
      {children}
    </CaptureFrame>
  );
}

const phoneFrame = {
  shellClassName: PHONE_SHELL,
  screenClassName: PHONE_SCREEN,
  statusTone: "light" as const,
};

type SmartLivingCaseStudyProps = {
  project: Project;
};

export function SmartLivingCaseStudy({ project }: SmartLivingCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-12">
        <DeviceStage
          layout="hero"
          syncPhone
          web={[
            {
              id: "overview",
              label: "Operations overview",
              url: project.productPath,
              tone: "white",
              children: (
                <WebStage>
                  <SmartLivingWebCapture />
                </WebStage>
              ),
            },
            {
              id: "alerts",
              label: "Alert console",
              url: project.productPath,
              tone: "white",
              children: (
                <WebStage>
                  <SmartLivingWebAlertsCapture />
                </WebStage>
              ),
            },
            {
              id: "scheduling",
              label: "Event scheduling",
              url: project.productPath,
              tone: "white",
              children: (
                <WebStage>
                  <SmartLivingWebSchedulingCapture />
                </WebStage>
              ),
            },
          ]}
          phones={[
            {
              id: "phone-overview",
              label: "Shift overview",
              ...phoneFrame,
              children: (
                <PhoneStage>
                  <SmartLivingPhoneCapture />
                </PhoneStage>
              ),
            },
            {
              id: "phone-alerts",
              label: "Alerts queue",
              ...phoneFrame,
              children: (
                <PhoneStage>
                  <SmartLivingPhoneAlertsCapture />
                </PhoneStage>
              ),
            },
            {
              id: "phone-call",
              label: "Resident call",
              ...phoneFrame,
              children: (
                <PhoneStage>
                  <SmartLivingPhoneCallCapture />
                </PhoneStage>
              ),
            },
          ]}
        />
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-normal">Problem</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Staff in smart-living communities juggle resident groups, emergency alerts, and day-to-day
            communication across disconnected tools. When a pendant fires or a door stays open, the person on
            shift needs one place to see severity, assign a responder, and reach the resident without switching
            apps.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-normal">Solution</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            I built an Angular operations portal with a serverless backend so supervisors get a live web console
            and a staff phone view on the same data. Firebase handles push, AWS SAM runs the API, and audio/video
            calling sits inside the alert workflow instead of off to the side.
          </p>
          <p className="mt-4 leading-7 text-muted-foreground">{project.role}</p>
        </section>
      </div>

      <section className="mt-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-normal">On the floor</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            The phone surfaces mirror the web queue so a responder can triage alerts, open a resident profile,
            and join a live call from the same shift session.
          </p>
        </div>
        <div className="mt-10">
          <DeviceStage
            layout="row"
            phones={[
              {
                id: "row-alerts",
                label: "Triage critical alerts from the queue",
                ...phoneFrame,
                children: (
                  <PhoneStage>
                    <SmartLivingPhoneAlertsCapture />
                  </PhoneStage>
                ),
              },
              {
                id: "row-call",
                label: "Join audio/video from the resident profile",
                ...phoneFrame,
                children: (
                  <PhoneStage>
                    <SmartLivingPhoneCallCapture />
                  </PhoneStage>
                ),
              },
              {
                id: "row-overview",
                label: "Shift overview with live counts",
                ...phoneFrame,
                children: (
                  <PhoneStage>
                    <SmartLivingPhoneCapture />
                  </PhoneStage>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Stack</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "Portal", items: ["Angular"] },
            { title: "Data & realtime", items: ["PostgreSQL", "Firebase"] },
            { title: "Cloud & payments", items: ["AWS SAM", "Stripe"] },
          ].map((group) => (
            <li
              key={group.title}
              className="flex h-full flex-col rounded-2xl border border-border bg-card/40 p-6"
            >
              <h3 className="font-display text-lg font-normal">{group.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-5xl border-t border-border pt-14">
        <h2 className="font-display text-2xl font-normal">Outcomes</h2>
        <dl className="mt-8 grid gap-10 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-display text-[clamp(2rem,4vw,3rem)] font-normal leading-none tracking-tight text-accent">
                {metric.value}
              </dt>
              <dd className="mt-2 max-w-xs text-muted-foreground">{metric.label}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-10 space-y-3">
          {project.outcomes.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-24">
        <ContactCta />
      </div>
    </article>
  );
}
