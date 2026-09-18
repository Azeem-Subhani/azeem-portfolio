/*
 * FRAME PLAN
 * Primary DeviceStage (layout hero, syncPhone true):
 *   Web 1: Today studio — TaskManagerWebCapture @ posy.app
 *   Web 2: Task detail — TaskManagerWebTaskDetailCapture @ posy.app/tasks/rotate-keys
 *   Web 3: Upcoming week — TaskManagerWebUpcomingCapture @ posy.app/upcoming
 *   Phone 1: Today list — TaskManagerPhoneCapture (synced with web 1)
 *   Phone 2: Task detail — TaskManagerPhoneDetailCapture (synced with web 2)
 * Secondary DeviceStage (layout row, phones only):
 *   Phone 1: Today list
 *   Phone 2: Task detail
 * All captures: CaptureFrame paper #FBF5F1; browser tone paper; phone shell #35222F, screen #FBF5F1, statusTone light.
 */

"use client";

import type { ReactNode } from "react";

import {
  TaskManagerPhoneCapture,
  TaskManagerPhoneDetailCapture,
} from "@/components/capture/task-manager/phone-capture";
import { TaskManagerWebCapture } from "@/components/capture/task-manager/web-capture";
import { TaskManagerWebTaskDetailCapture } from "@/components/capture/task-manager/web-task-detail-capture";
import { TaskManagerWebUpcomingCapture } from "@/components/capture/task-manager/web-upcoming-capture";
import { ContactCta } from "@/components/sections/contact-cta";
import { DeviceStage } from "@/components/projects/device-stage";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import type { Project } from "@/types/content";

import "@/components/capture/task-manager/task-manager-capture.css";
import "@/components/projects/mockups/task-manager-phone-mock.css";

const PAPER = "#FBF5F1";
const PHONE_SHELL = "bg-[#35222F]";
const PHONE_SCREEN = "bg-[#FBF5F1]";

const phoneFrame = {
  shellClassName: PHONE_SHELL,
  screenClassName: PHONE_SCREEN,
  statusTone: "light" as const,
};

function PhoneCaptureFrame({ children }: { children: ReactNode }) {
  return (
    <CaptureFrame kind="phone" background={PAPER} className="tm-phone-mock-host">
      {children}
    </CaptureFrame>
  );
}

type TaskManagerCaseStudyProps = {
  project: Project;
};

export function TaskManagerCaseStudy({ project }: TaskManagerCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      <section className="mt-14" aria-labelledby="tm-product-stage">
        <h2 id="tm-product-stage" className="sr-only">
          Product screens
        </h2>
        <DeviceStage
          layout="hero"
          syncPhone
          web={[
            {
              id: "today",
              label: "Today",
              url: "posy.app",
              tone: "paper",
              children: (
                <CaptureFrame kind="web" background={PAPER}>
                  <TaskManagerWebCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "task-detail",
              label: "Task detail",
              url: "posy.app/tasks/rotate-keys",
              tone: "paper",
              children: (
                <CaptureFrame kind="web" background={PAPER}>
                  <TaskManagerWebTaskDetailCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "upcoming",
              label: "Upcoming",
              url: "posy.app/upcoming",
              tone: "paper",
              children: (
                <CaptureFrame kind="web" background={PAPER}>
                  <TaskManagerWebUpcomingCapture />
                </CaptureFrame>
              ),
            },
          ]}
          phones={[
            {
              id: "phone-today",
              label: "Today on phone",
              ...phoneFrame,
              children: (
                <PhoneCaptureFrame>
                  <TaskManagerPhoneCapture />
                </PhoneCaptureFrame>
              ),
            },
            {
              id: "phone-detail",
              label: "Task detail on phone",
              ...phoneFrame,
              children: (
                <PhoneCaptureFrame>
                  <TaskManagerPhoneDetailCapture />
                </PhoneCaptureFrame>
              ),
            },
          ]}
        />
      </section>

      <section className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            Problem
          </p>
          <h2 className="mt-3 font-display text-2xl font-normal text-foreground">
            API practice without a client yet
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">{project.context}</p>
        </div>
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            Solution
          </p>
          <h2 className="mt-3 font-display text-2xl font-normal text-foreground">
            Auth-first backend, Posy as the face
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            I built JWT sessions, per-user task CRUD, and SendGrid verification on Express and MongoDB.
            Posy is the task studio UI that would sit on top once the API pairs with a client.
          </p>
          <ul className="mt-5 space-y-2">
            {project.outcomes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-20" aria-labelledby="tm-mobile-stage">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="tm-mobile-stage" className="font-display text-2xl font-normal">
            Same list on the phone
          </h2>
          <p className="mt-3 text-muted-foreground">
            Mira&apos;s Today view and task detail share the rose and plum chrome from the studio web app.
          </p>
        </div>
        <div className="mt-10">
          <DeviceStage
            layout="row"
            phones={[
              {
                id: "row-today",
                label: "Today list",
                ...phoneFrame,
                children: (
                  <PhoneCaptureFrame>
                    <TaskManagerPhoneCapture />
                  </PhoneCaptureFrame>
                ),
              },
              {
                id: "row-detail",
                label: "Task detail",
                ...phoneFrame,
                children: (
                  <PhoneCaptureFrame>
                    <TaskManagerPhoneDetailCapture />
                  </PhoneCaptureFrame>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl" aria-labelledby="tm-stack">
        <h2 id="tm-stack" className="font-display text-2xl font-normal">
          Stack
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{project.role}</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-2xl border border-border bg-card/40 px-5 py-4 shadow-sm"
            >
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                Layer
              </p>
              <p className="mt-2 font-display text-xl font-normal tracking-tight">{tech}</p>
            </li>
          ))}
        </ul>
        <ul className="mt-10 space-y-3">
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

      <section className="mx-auto mt-20 max-w-5xl border-t border-border pt-14">
        <dl className="grid gap-10 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-display text-[clamp(2.5rem,6vw,4rem)] font-normal leading-none tracking-tight text-accent">
                {metric.value}
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">{metric.label}</dd>
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
