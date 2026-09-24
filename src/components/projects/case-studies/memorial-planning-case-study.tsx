"use client";

import { MemorialPlanningPhoneCapture } from "@/components/capture/memorial-planning/phone-capture";
import { MemorialPlanningPhoneConfirmationCapture } from "@/components/capture/memorial-planning/phone-confirmation-capture";
import { MemorialPlanningPhoneMethodPickerCapture } from "@/components/capture/memorial-planning/phone-method-picker-capture";
import { MemorialPlanningWebCapture } from "@/components/capture/memorial-planning/web-capture";
import { MemorialPlanningWebMakePaymentCapture } from "@/components/capture/memorial-planning/web-make-payment-capture";
import { MemorialPlanningWebPaymentHistoryCapture } from "@/components/capture/memorial-planning/web-payment-history-capture";
import { MemorialPlanningWebReceiptCapture } from "@/components/capture/memorial-planning/web-receipt-capture";
import {
  CaseStudyBrief,
  CaseStudyNote,
  CaseStudyOutcomes,
  CaseStudySection,
  CaseStudyStack,
} from "@/components/projects/case-studies/case-study-sections";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import type { Project } from "@/types/content";

import "@/components/capture/memorial-planning/memorial-planning-capture.css";
import "@/components/projects/mockups/memorial-planning-phone-mock.css";

/*
 * FRAME PLAN
 * Primary DeviceStage (layout hero, syncPhone):
 *   Web 1: Account overview — MemorialPlanningWebCapture (catalog default)
 *   Web 2: Payment history — MemorialPlanningWebPaymentHistoryCapture
 *   Web 3: Receipt detail — MemorialPlanningWebReceiptCapture
 *   Phone 1: Make a payment — MemorialPlanningPhoneCapture (catalog default)
 *   Phone 2: Payment method — MemorialPlanningPhoneMethodPickerCapture
 *   Phone 3: Confirmation — MemorialPlanningPhoneConfirmationCapture
 *
 * Secondary DeviceStage (layout browser):
 *   Web: Desktop make a payment — MemorialPlanningWebMakePaymentCapture
 *
 * Secondary DeviceStage (layout row):
 *   Phone A: Payment method — MemorialPlanningPhoneMethodPickerCapture
 *   Phone B: Confirmation — MemorialPlanningPhoneConfirmationCapture
 */

const CAPTURE_BG = "#F7F7F4";
const PHONE_SHELL = "bg-[#21483E]";
const PHONE_SCREEN = "bg-[#F7F7F4]";

const phoneFrameProps = {
  shellClassName: PHONE_SHELL,
  screenClassName: PHONE_SCREEN,
  statusTone: "light" as const,
};

type MemorialPlanningCaseStudyProps = {
  project: Project;
};

export function MemorialPlanningCaseStudy({ project }: MemorialPlanningCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      {project.visibility === "anonymized" ? (
        <CaseStudyNote>
          Client name withheld under NDA. Screens and architecture reflect the production
          payment portal.
        </CaseStudyNote>
      ) : null}

      <div className="mt-12">
        <DeviceStage
          layout="hero"
          syncPhone
          web={[
            {
              id: "overview",
              label: "Overview",
              url: "memorialplan.com/account",
              tone: "cream",
              children: (
                <CaptureFrame kind="web" background={CAPTURE_BG}>
                  <MemorialPlanningWebCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "history",
              label: "Payment history",
              url: "memorialplan.com/account/history",
              tone: "cream",
              children: (
                <CaptureFrame kind="web" background={CAPTURE_BG}>
                  <MemorialPlanningWebPaymentHistoryCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "receipt",
              label: "Receipt",
              url: "memorialplan.com/account/receipts",
              tone: "cream",
              children: (
                <CaptureFrame kind="web" background={CAPTURE_BG}>
                  <MemorialPlanningWebReceiptCapture />
                </CaptureFrame>
              ),
            },
          ]}
          phones={[
            {
              id: "pay",
              label: "Make a payment",
              ...phoneFrameProps,
              children: (
                <CaptureFrame
                  kind="phone"
                  background={CAPTURE_BG}
                  className="mp-phone-mock-host"
                >
                  <MemorialPlanningPhoneCapture />
                </CaptureFrame>
              ),
            },
          ]}
        />
      </div>

      <CaseStudyBrief
        problem={[
          project.context,
          "Families expected card checkout without calling the office. Operations needed proof that money posted before they updated a plan file.",
        ]}
        solution={[project.role]}
        points={project.approach}
      />

      <CaseStudySection
        title="Checkout on any screen"
        intro="The same Cognito session powers desktop review and phone payments. Trust Commerce tokenizes cards, DynamoDB stores plan state, and Lambda fires staff notifications once Trust Commerce settles a charge."
      >
        <div>
          <DeviceStage
            layout="browser"
            web={[
              {
                id: "desktop-pay",
                label: "Desktop checkout",
                url: "memorialplan.com/account/pay",
                tone: "cream",
                children: (
                  <CaptureFrame kind="web" background={CAPTURE_BG}>
                    <MemorialPlanningWebMakePaymentCapture />
                  </CaptureFrame>
                ),
              },
            ]}
          />
        </div>
        <div className="mt-12">
          <DeviceStage
            layout="row"
            phones={[
              {
                id: "row-method",
                label: "Saved payment methods",
                ...phoneFrameProps,
                children: (
                  <CaptureFrame
                  kind="phone"
                  background={CAPTURE_BG}
                  className="mp-phone-mock-host"
                >
                    <MemorialPlanningPhoneMethodPickerCapture />
                  </CaptureFrame>
                ),
              },
              {
                id: "row-confirmed",
                label: "Instant confirmation",
                ...phoneFrameProps,
                children: (
                  <CaptureFrame
                  kind="phone"
                  background={CAPTURE_BG}
                  className="mp-phone-mock-host"
                >
                    <MemorialPlanningPhoneConfirmationCapture />
                  </CaptureFrame>
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
