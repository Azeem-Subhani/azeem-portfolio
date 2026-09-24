"use client";

import type { ReactNode } from "react";

import { SmartLivingPhoneAlertsCapture } from "@/components/capture/smart-living/phone-alerts-capture";
import { SmartLivingPhoneCallCapture } from "@/components/capture/smart-living/phone-call-capture";
import { SmartLivingPhoneCapture } from "@/components/capture/smart-living/phone-capture";
import { SmartLivingWebAlertsCapture } from "@/components/capture/smart-living/web-alerts-capture";
import { SmartLivingWebCapture } from "@/components/capture/smart-living/web-capture";
import { SmartLivingWebSchedulingCapture } from "@/components/capture/smart-living/web-scheduling-capture";
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
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
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
          ]}
        />
      </div>

      <CaseStudyBrief
        problem={[
          "Staff in smart-living communities juggle resident groups, emergency alerts, and day-to-day communication across disconnected tools. When a pendant fires or a door stays open, the person on shift needs one place to see severity, assign a responder, and reach the resident without switching apps.",
        ]}
        solution={[
          "I built an Angular operations portal with a serverless backend so supervisors get a live web console and a staff phone view on the same data. Firebase handles push, AWS SAM runs the API, and audio/video calling sits inside the alert workflow instead of off to the side.",
          project.role,
        ]}
      />

      <CaseStudySection
        title="On the floor"
        intro="The phone surfaces mirror the web queue so a responder can triage alerts, open a resident profile, and join a live call from the same shift session."
      >
        <div>
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
            ]}
          />
        </div>
      </CaseStudySection>

      <CaseStudyStack items={project.stack} />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
