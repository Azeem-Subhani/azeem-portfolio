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
 * Secondary DeviceStage (layout row): same three phone captures, labeled row for mobile read.
 * All captures: CaptureFrame background #12110F; phone shell/screen #12110F, statusTone dark.
 */

"use client";

import { GamingGlobalPhoneCapture } from "@/components/capture/gaming-global/phone-capture";
import { GamingGlobalPhoneChatCapture } from "@/components/capture/gaming-global/phone-chat-capture";
import { GamingGlobalPhoneConverterCapture } from "@/components/capture/gaming-global/phone-converter-capture";
import { GamingGlobalWebCapture } from "@/components/capture/gaming-global/web-capture";
import { GamingGlobalWebChatCapture } from "@/components/capture/gaming-global/web-chat-capture";
import { GamingGlobalWebConverterCapture } from "@/components/capture/gaming-global/web-converter-capture";
import { ContactCta } from "@/components/sections/contact-cta";
import { DeviceStage } from "@/components/projects/device-stage";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
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

  const rowPhones = primaryPhones.map((slide) => ({
    ...slide,
    children: (
      <CaptureFrame kind="phone" background={GG_BG} className="gg-phone-mock-host">
        {slide.id === "admin" ? (
          <GamingGlobalPhoneCapture />
        ) : slide.id === "phone-chat" ? (
          <GamingGlobalPhoneChatCapture />
        ) : (
          <GamingGlobalPhoneConverterCapture />
        )}
      </CaptureFrame>
    ),
  }));

  return (
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      <DeviceStage
        className="mt-12 lg:mt-16"
        layout="hero"
        syncPhone
        web={primaryWeb}
        phones={primaryPhones}
      />

      <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
        <section>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            Problem
          </p>
          <h2 className="mt-3 font-display text-2xl font-normal text-balance">
            Aim settings do not travel between games
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">{project.context}</p>
        </section>

        <section>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            Solution
          </p>
          <h2 className="mt-3 font-display text-2xl font-normal text-balance">
            One MERN app for conversion, stats, and chat
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">{project.summary}</p>
          <ul className="mt-6 space-y-3">
            {project.approach.map((item) => (
              <li
                key={item}
                className="border-l-2 border-accent/40 pl-4 text-sm leading-6 text-muted-foreground"
              >
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-normal">Mobile surfaces</h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            The same orange ink chrome carries into phone layouts: admin moderation on the go,
            Socket.IO chat in channel view, and the converter for quick sens checks between
            scrims.
          </p>
        </div>
        <DeviceStage className="mt-10" layout="row" phones={rowPhones} />
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Stack</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
          {project.role} React on the client, Express and Socket.IO on the server, MongoDB for
          player records and chat history.
        </p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-2xl border border-border bg-card/40 px-5 py-4"
            >
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Layer
              </p>
              <p className="mt-2 font-display text-xl font-normal">{tech}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-3xl">
        <h2 className="font-display text-2xl font-normal">Outcome</h2>
        <ul className="mt-6 grid gap-3">
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

        <dl className="mt-10 flex flex-wrap gap-8 border-t border-border pt-10">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-display text-[1.625rem] font-normal tracking-tight text-accent">
                {metric.value}
              </dt>
              <dd className="mt-0.5 text-[0.78rem] text-muted-foreground">{metric.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-24">
        <ContactCta />
      </div>
    </article>
  );
}
