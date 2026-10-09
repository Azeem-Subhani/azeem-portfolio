/*
 * FRAME PLAN
 * Primary DeviceStage (layout hero, syncPhone true):
 *   Web 1: Today studio — TaskManagerWebCapture @ posy.app
 *   Web 2: Task detail — TaskManagerWebTaskDetailCapture @ posy.app/tasks/rotate-keys
 *   Web 3: Upcoming week — TaskManagerWebUpcomingCapture @ posy.app/upcoming
 *   Phone: Today list — TaskManagerPhoneCapture
 * Secondary DeviceStage (layout row, phones only; the hero phone is not repeated):
 *   Phone: Task detail — TaskManagerPhoneDetailCapture
 * All captures: CaptureFrame paper #FBF7EE; browser tone paper; phone shell #1F2033, screen #FBF7EE, statusTone light.
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
import {
  CaseStudyBrief,
  CaseStudyOutcomes,
  CaseStudySection,
  CaseStudyStack,
} from "@/components/projects/case-studies/case-study-sections";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import type { Project } from "@/types/content";

import "@/components/capture/task-manager/task-manager-capture.css";
import "@/components/projects/mockups/task-manager-phone-mock.css";

const PAPER = "#FBF7EE";
const PHONE_SHELL = "bg-[#1F2033]";
const PHONE_SCREEN = "bg-[#FBF7EE]";

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
  closer?: ReactNode;
};

export function TaskManagerCaseStudy({ project, closer }: TaskManagerCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-12">
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
              label: "Today list",
              ...phoneFrame,
              children: (
                <PhoneCaptureFrame>
                  <TaskManagerPhoneCapture />
                </PhoneCaptureFrame>
              ),
            },
          ]}
        />
      </div>

      <CaseStudyBrief
        problem={[project.context]}
        solution={[
          "I built JWT sessions, per-user task CRUD, and SendGrid verification on Express and MongoDB. Posy is the task studio UI that would sit on top once the API pairs with a client.",
        ]}
        points={project.approach}
      />

      {/* The hero phone shows Today; the detail screen is the one left to show. */}
      <CaseStudySection
        title="Task detail on the phone"
        intro="Mira's task detail uses the same paper, cobalt, and tomato system as the studio app."
      >
        <DeviceStage
          layout="row"
          phones={[
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
      </CaseStudySection>

      <CaseStudyStack items={project.stack} intro={project.role} />
      <CaseStudyOutcomes project={project} />
      {closer}
    </article>
  );
}
