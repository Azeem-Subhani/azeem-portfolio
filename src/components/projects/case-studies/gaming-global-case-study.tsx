/*
 * FRAME PLAN
 * Hero intro: ProjectDetailIntro (public, no NDA line).
 * Primary DeviceStage (layout hero, syncPhone true, BrowserFrame tone ink):
 *   Web 01 Player stats dashboard (existing web-capture)
 *   Web 02 Sensitivity converter (web-converter-capture)
 *   Web 03 Realtime chat (web-chat-capture)
 *   Phone 01 Admin panel (existing phone-capture)
 *   Phone 02 Sensitivity converter (phone-converter-capture)
 *   Phone 03 Realtime chat (phone-chat-capture)
 * Hero phone: admin panel only. Secondary DeviceStage (layout row): converter and chat phones.
 * All captures: CaptureFrame background #12110F; phone shell/screen #12110F, statusTone dark.
 */

"use client";

import { GamingGlobalPhoneCapture } from "@/components/capture/gaming-global/phone-capture";
import { GamingGlobalPhoneChatCapture } from "@/components/capture/gaming-global/phone-chat-capture";
import { GamingGlobalPhoneConverterCapture } from "@/components/capture/gaming-global/phone-converter-capture";
import { GamingGlobalWebCapture } from "@/components/capture/gaming-global/web-capture";
import { GamingGlobalWebChatCapture } from "@/components/capture/gaming-global/web-chat-capture";
import { GamingGlobalWebConverterCapture } from "@/components/capture/gaming-global/web-converter-capture";
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

import "@/components/capture/gaming-global/gaming-global-capture.css";
import "@/components/capture/gaming-global/gaming-global-extended.css";
import "@/components/projects/mockups/gaming-global-phone-mock.css";

const GG_BG = "#12110F";
const PRODUCT_URL = "https://app.gamingglobal.com";

const phoneShell = {
  shellClassName: "bg-[#12110F]",
  screenClassName: "bg-[#12110F]",
  statusTone: "dark" as const,
};

type GamingGlobalCaseStudyProps = {
  project: Project;
};

export function GamingGlobalCaseStudy({ project }: GamingGlobalCaseStudyProps) {
  const primaryWeb = [
    {
      id: "stats",
      label: "Player stats",
      url: PRODUCT_URL,
      tone: "ink" as const,
      children: (
        <CaptureFrame kind="web" background={GG_BG}>
          <GamingGlobalWebCapture />
        </CaptureFrame>
      ),
    },
    {
      id: "converter",
      label: "Sensitivity converter",
      url: PRODUCT_URL,
      tone: "ink" as const,
      children: (
        <CaptureFrame kind="web" background={GG_BG}>
          <GamingGlobalWebConverterCapture />
        </CaptureFrame>
      ),
    },
    {
      id: "chat",
      label: "Live chat",
      url: PRODUCT_URL,
      tone: "ink" as const,
      children: (
        <CaptureFrame kind="web" background={GG_BG}>
          <GamingGlobalWebChatCapture />
        </CaptureFrame>
      ),
    },
  ];

  const primaryPhones = [
    {
      id: "admin",
      label: "Admin panel",
      ...phoneShell,
      children: (
        <CaptureFrame kind="phone" background={GG_BG} className="gg-phone-mock-host">
          <GamingGlobalPhoneCapture />
        </CaptureFrame>
      ),
    },
    {
      id: "phone-converter",
      label: "Converter",
      ...phoneShell,
      children: (
        <CaptureFrame kind="phone" background={GG_BG} className="gg-phone-mock-host">
          <GamingGlobalPhoneConverterCapture />
        </CaptureFrame>
      ),
    },
    {
      id: "phone-chat",
      label: "Live chat",
      ...phoneShell,
      children: (
        <CaptureFrame kind="phone" background={GG_BG} className="gg-phone-mock-host">
          <GamingGlobalPhoneChatCapture />
        </CaptureFrame>
      ),
    },
  ];

  // The hero carries the admin panel; the row shows the other phone screens, so none repeat.
  const heroPhones = primaryPhones.slice(0, 1);
  const rowPhones = primaryPhones.slice(1);

  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-12">
        <DeviceStage layout="hero" syncPhone web={primaryWeb} phones={heroPhones} />
      </div>

      <CaseStudyBrief
        problem={[project.context]}
        solution={[project.summary]}
        points={project.approach}
      />

      <CaseStudySection
        title="Mobile surfaces"
        intro="The same orange ink chrome carries into phone layouts: Socket.IO chat in channel view, and the converter for quick sens checks between scrims."
      >
        <DeviceStage layout="row" phones={rowPhones} />
      </CaseStudySection>

      <CaseStudyStack
        items={project.stack}
        intro={`${project.role} React on the client, Express and Socket.IO on the server, MongoDB for player records and chat history.`}
      />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
