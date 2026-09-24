"use client";

import type { ReactNode } from "react";

import { RealTimeChatPhoneCapture } from "@/components/capture/real-time-chat/phone-capture";
import { RealTimeChatPhoneDmCapture } from "@/components/capture/real-time-chat/phone-dm";
import { RealTimeChatPhoneInboxCapture } from "@/components/capture/real-time-chat/phone-inbox";
import { RealTimeChatWebCapture } from "@/components/capture/real-time-chat/web-capture";
import { RealTimeChatWebSearchCapture } from "@/components/capture/real-time-chat/web-search";
import { RealTimeChatWebShipItCapture } from "@/components/capture/real-time-chat/web-ship-it";
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

import "@/components/capture/real-time-chat/real-time-chat-capture.css";
import "@/components/projects/mockups/real-time-chat-phone-mock.css";

/*
 * FRAME PLAN
 * ─────────────────────────────────────────────────────────────────────────────
 * Hero DeviceStage (layout="hero", syncPhone=true, tone walnut, relay.local)
 *   web · design-crit · existing · RealTimeChatWebCapture
 *   web · ship-it · invented · RealTimeChatWebShipItCapture
 *   web · search · invented · RealTimeChatWebSearchCapture
 *   phone · design-crit thread · existing · RealTimeChatPhoneCapture
 *
 * Secondary DeviceStage (layout="row", phones only; the hero thread is not repeated)
 *   phone · inbox · invented · RealTimeChatPhoneInboxCapture
 *   phone · maya-dm · invented · RealTimeChatPhoneDmCapture
 */

const RELAY_BG = "#14110E";

const phoneShell = {
  shellClassName: "bg-[#14110E]",
  screenClassName: "bg-[#201B17]",
  statusTone: "dark" as const,
};

function WebFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="web" background={RELAY_BG}>
      {children}
    </CaptureFrame>
  );
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame
      kind="phone"
      background={RELAY_BG}
      className="rtc-phone-mock-host"
    >
      {children}
    </CaptureFrame>
  );
}

type RealTimeChatCaseStudyProps = {
  project: Project;
};

export function RealTimeChatCaseStudy({ project }: RealTimeChatCaseStudyProps) {
  const heroWeb = [
    {
      id: "design-crit",
      label: "Design crit",
      url: project.productPath,
      tone: "walnut" as const,
      children: (
        <WebFrame>
          <RealTimeChatWebCapture />
        </WebFrame>
      ),
    },
    {
      id: "ship-it",
      label: "Ship it",
      url: project.productPath,
      tone: "walnut" as const,
      children: (
        <WebFrame>
          <RealTimeChatWebShipItCapture />
        </WebFrame>
      ),
    },
    {
      id: "search",
      label: "Search",
      url: project.productPath,
      tone: "walnut" as const,
      children: (
        <WebFrame>
          <RealTimeChatWebSearchCapture />
        </WebFrame>
      ),
    },
  ];

  const heroPhones = [
    {
      id: "design-crit-phone",
      label: "Open thread",
      ...phoneShell,
      children: (
        <PhoneFrame>
          <RealTimeChatPhoneCapture />
        </PhoneFrame>
      ),
    },
  ];

  const rowPhones = [
    {
      id: "inbox-row",
      label: "Conversation list stays in sync with the socket feed",
      ...phoneShell,
      children: (
        <PhoneFrame>
          <RealTimeChatPhoneInboxCapture />
        </PhoneFrame>
      ),
    },
    {
      id: "dm-row",
      label: "Direct messages on the same WebSocket session",
      ...phoneShell,
      children: (
        <PhoneFrame>
          <RealTimeChatPhoneDmCapture />
        </PhoneFrame>
      ),
    },
  ];

  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
        <ProjectDetailIntro project={project} />

        <div className="mt-12">
          <DeviceStage layout="hero" web={heroWeb} phones={heroPhones} syncPhone />
        </div>

        <CaseStudyBrief
          problem={[
            project.context,
            "I wanted the full socket lifecycle in view: connect, broadcast, reconnect, and presence. A wrapper library would have hidden the parts I was trying to learn.",
          ]}
          solution={[project.role]}
          points={project.approach}
        />

        <CaseStudySection
          title="Mobile surfaces"
          intro="The Handlebars UI scales down to a phone-width layout. Inbox, rooms, and DMs share one WebSocket connection, so unread counts and typing state stay aligned across views."
        >
          <DeviceStage layout="row" phones={rowPhones} syncPhone={false} />
        </CaseStudySection>

        <CaseStudyStack items={project.stack} />
        <CaseStudyOutcomes project={project} />
        <ProjectCloser slug={project.slug} />
      </article>
    );
}
