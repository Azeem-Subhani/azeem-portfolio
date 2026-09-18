"use client";

import type { ReactNode } from "react";
import Link from "next/link";

import { RealTimeChatPhoneCapture } from "@/components/capture/real-time-chat/phone-capture";
import { RealTimeChatPhoneDmCapture } from "@/components/capture/real-time-chat/phone-dm";
import { RealTimeChatPhoneInboxCapture } from "@/components/capture/real-time-chat/phone-inbox";
import { RealTimeChatWebCapture } from "@/components/capture/real-time-chat/web-capture";
import { RealTimeChatWebSearchCapture } from "@/components/capture/real-time-chat/web-search";
import { RealTimeChatWebShipItCapture } from "@/components/capture/real-time-chat/web-ship-it";
import { ContactCta } from "@/components/sections/contact-cta";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
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
 *   phone · inbox · invented · RealTimeChatPhoneInboxCapture
 *   phone · maya-dm · invented · RealTimeChatPhoneDmCapture
 *
 * Secondary DeviceStage (layout="row", phones only)
 *   phone · inbox · invented · RealTimeChatPhoneInboxCapture
 *   phone · design-crit thread · existing · RealTimeChatPhoneCapture
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

const stackGroups = [
  {
    title: "Realtime server",
    items: ["Node.js", "WebSockets", "JavaScript"],
  },
  {
    title: "Rendered UI",
    items: ["Handlebars", "Moment.js"],
  },
];

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
    {
      id: "inbox-phone",
      label: "Inbox",
      ...phoneShell,
      children: (
        <PhoneFrame>
          <RealTimeChatPhoneInboxCapture />
        </PhoneFrame>
      ),
    },
    {
      id: "maya-dm-phone",
      label: "Direct message",
      ...phoneShell,
      children: (
        <PhoneFrame>
          <RealTimeChatPhoneDmCapture />
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
      id: "thread-row",
      label: "Room threads with live presence and typing",
      ...phoneShell,
      children: (
        <PhoneFrame>
          <RealTimeChatPhoneCapture />
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
    <>
      <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
        <ProjectDetailIntro project={project} />

        <div className="mt-14">
          <DeviceStage layout="hero" web={heroWeb} phones={heroPhones} syncPhone />
        </div>

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <section>
            <h2 className="font-display text-2xl font-normal">Problem</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{project.context}</p>
            <p className="mt-4 leading-7 text-muted-foreground">
              I wanted the full socket lifecycle in view: connect, broadcast, reconnect, and presence. A wrapper library would have hidden the parts I was trying to learn.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-normal">Solution</h2>
            <p className="mt-4 leading-7 text-muted-foreground">{project.role}</p>
            <ul className="mt-4 space-y-3">
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
          <h2 className="font-display text-2xl font-normal">Mobile surfaces</h2>
          <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
            The Handlebars UI scales down to a phone-width layout. Inbox, rooms, and DMs share one WebSocket connection, so unread counts and typing state stay aligned across views.
          </p>
          <div className="mt-10">
            <DeviceStage layout="row" phones={rowPhones} syncPhone={false} />
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-2xl font-normal">Technology stack</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {stackGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-[22px] border border-border bg-card/40 p-6"
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
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="font-display text-2xl font-normal">Outcomes</h2>
          <dl className="mt-8 grid gap-8 sm:grid-cols-2">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="font-display text-[clamp(2rem,4vw,2.75rem)] font-normal tracking-tight text-accent">
                  {metric.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">{metric.label}</dd>
              </div>
            ))}
          </dl>
          <ul className="mt-10 grid gap-3 max-w-3xl">
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

        <div className="mt-16 max-w-3xl">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            Start a conversation about this project
          </Link>
        </div>
      </article>

      <ContactCta />
    </>
  );
}
