"use client";

import { MemorialPlanningPhoneCapture } from "@/components/capture/memorial-planning/phone-capture";
import { MemorialPlanningPhoneConfirmationCapture } from "@/components/capture/memorial-planning/phone-confirmation-capture";
import { MemorialPlanningPhoneMethodPickerCapture } from "@/components/capture/memorial-planning/phone-method-picker-capture";
import { MemorialPlanningWebCapture } from "@/components/capture/memorial-planning/web-capture";
import { MemorialPlanningWebMakePaymentCapture } from "@/components/capture/memorial-planning/web-make-payment-capture";
import { MemorialPlanningWebPaymentHistoryCapture } from "@/components/capture/memorial-planning/web-payment-history-capture";
import { MemorialPlanningWebReceiptCapture } from "@/components/capture/memorial-planning/web-receipt-capture";
import { ContactCta } from "@/components/sections/contact-cta";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
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
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      {project.visibility === "anonymized" ? (
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
          Client name withheld under NDA. Screens and architecture reflect the production
          payment portal.
        </p>
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
            {
              id: "method",
              label: "Payment method",
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
              id: "confirmed",
              label: "Confirmation",
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

      <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
        <section>
          <h2 className="font-display text-2xl font-normal">The problem</h2>
          <p className="mt-4 leading-7 text-muted-foreground">{project.context}</p>
          <p className="mt-4 leading-7 text-muted-foreground">
            Families expected card checkout without calling the office. Operations needed
            proof that money posted before they updated a plan file.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-normal">What we built</h2>
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
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-normal">Checkout on any screen</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            The same Cognito session powers desktop review and phone payments. Trust Commerce
            tokenizes cards, DynamoDB stores plan state, and Lambda fires staff notifications
            once Trust Commerce settles a charge.
          </p>
        </div>
        <div className="mt-10">
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
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Stack</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-2xl border border-border bg-card/40 px-5 py-4"
            >
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Layer
              </p>
              <p className="mt-2 font-display text-lg font-normal text-foreground">{tech}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Outcomes</h2>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-border px-6 py-8">
              <dt className="font-display text-[clamp(2.5rem,6vw,3.75rem)] font-normal leading-none text-accent">
                {metric.value}
              </dt>
              <dd className="mt-3 text-base text-muted-foreground">{metric.label}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-8 space-y-3">
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

      <div className="mt-24">
        <ContactCta />
      </div>
    </article>
  );
}
