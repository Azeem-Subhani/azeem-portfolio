/*
 * FRAME PLAN
 * Hero DeviceStage (layout hero, syncPhone):
 *   Web 1: Search — BookingAgentWebChatCapture @ meridian.app
 *   Web 2: Confirm — BookingAgentWebConfirmCapture @ meridian.app/confirm
 *   Web 3: Bookings — BookingAgentWebBookingsCapture @ meridian.app/bookings
 *   Phone 1: Chat — BookingAgentPhoneChatCapture
 *   Phone 2: Review — BookingAgentPhoneConfirmCapture
 *   Phone 3: Voice — BookingAgentPhoneVoiceCapture
 * Secondary DeviceStage (layout browser):
 *   Web: Operations — BookingAgentWebAdminCapture @ meridian.app/ops
 * Guest captures: CaptureFrame paper #F6F5F1; browser tone paper.
 * Phone shell #10281F. Chat and review use a light status bar; voice is dark.
 */

"use client";

import type { ReactNode } from "react";

import { BookingAgentPhoneChatCapture } from "@/components/capture/booking-agent/phone-chat-capture";
import { BookingAgentPhoneConfirmCapture } from "@/components/capture/booking-agent/phone-confirm-capture";
import { BookingAgentPhoneVoiceCapture } from "@/components/capture/booking-agent/phone-voice-capture";
import { BookingAgentWebAdminCapture } from "@/components/capture/booking-agent/web-admin-capture";
import { BookingAgentWebBookingsCapture } from "@/components/capture/booking-agent/web-bookings-capture";
import { BookingAgentWebChatCapture } from "@/components/capture/booking-agent/web-chat-capture";
import { BookingAgentWebConfirmCapture } from "@/components/capture/booking-agent/web-confirm-capture";
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

import "@/components/capture/booking-agent/booking-agent-capture.css";
import "@/components/projects/mockups/booking-agent-phone-mock.css";

const PAPER = "#F6F5F1";
const PHONE_SHELL = "bg-[#10281F]";

function WebStage({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="web" background={PAPER}>
      {children}
    </CaptureFrame>
  );
}

function PhoneStage({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="phone" background={PAPER} className="ba-phone-mock-host">
      {children}
    </CaptureFrame>
  );
}

const phoneFrame = {
  shellClassName: PHONE_SHELL,
  screenClassName: "bg-[#F6F5F1]",
  statusTone: "light" as const,
};

type BookingAgentCaseStudyProps = {
  project: Project;
};

export function BookingAgentCaseStudy({ project }: BookingAgentCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-12">
        <DeviceStage
          layout="hero"
          syncPhone
          web={[
            {
              id: "search",
              label: "Search",
              url: "meridian.app",
              tone: "paper",
              children: (
                <WebStage>
                  <BookingAgentWebChatCapture />
                </WebStage>
              ),
            },
            {
              id: "confirm",
              label: "Confirm",
              url: "meridian.app/confirm",
              tone: "paper",
              children: (
                <WebStage>
                  <BookingAgentWebConfirmCapture />
                </WebStage>
              ),
            },
            {
              id: "bookings",
              label: "Bookings",
              url: "meridian.app/bookings",
              tone: "paper",
              children: (
                <WebStage>
                  <BookingAgentWebBookingsCapture />
                </WebStage>
              ),
            },
          ]}
          phones={[
            {
              id: "phone-chat",
              label: "Chat",
              ...phoneFrame,
              children: (
                <PhoneStage>
                  <BookingAgentPhoneChatCapture />
                </PhoneStage>
              ),
            },
            {
              id: "phone-review",
              label: "Review",
              ...phoneFrame,
              children: (
                <PhoneStage>
                  <BookingAgentPhoneConfirmCapture />
                </PhoneStage>
              ),
            },
            {
              id: "phone-voice",
              label: "Voice",
              shellClassName: PHONE_SHELL,
              screenClassName: "bg-[#0A1410]",
              statusTone: "dark",
              children: (
                <PhoneStage>
                  <BookingAgentPhoneVoiceCapture />
                </PhoneStage>
              ),
            },
          ]}
        />
      </div>

      <CaseStudyBrief
        problem={[
          "A dinner for six, a hotel with a price ceiling, a haircut next Friday: each one starts as a sentence and then gets retyped into a form. If the guest changes the time or the party size, the search usually starts over, and the charge can land before the cancellation terms are obvious.",
        ]}
        solution={[
          "Meridian keeps the request in the thread. It shows the fields it understood, updates them when the guest corrects it, and holds the table while a countdown runs. The deposit is a separate step, with the policy and the card on file in view, and the pay button waits for a checked consent line.",
        ]}
        points={project.approach}
      />

      <CaseStudySection
        title="When a person takes over"
        intro="The operations console lists live conversations, the assistant's tool trace, and the point where a teammate stepped in."
      >
        <DeviceStage
          layout="browser"
          web={[
            {
              id: "ops",
              label: "Operations",
              url: "meridian.app/ops",
              tone: "paper",
              children: (
                <WebStage>
                  <BookingAgentWebAdminCapture />
                </WebStage>
              ),
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudyStack items={project.stack} intro={project.role} />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
