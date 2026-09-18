/*
 * FRAME PLAN
 * | kind  | id              | label              | source   | stage        |
 * | web   | ops-overview    | Group overview     | existing | hero         |
 * | web   | event-schedule  | Event schedule     | invented | hero         |
 * | web   | fleet           | Fleet              | invented | hero         |
 * | phone | book-session    | Book a session     | existing | hero         |
 * | phone | session-detail  | Session detail     | invented | hero (sync)  |
 * | phone | checkout        | Checkout           | invented | row (later)  |
 * | phone | book-session-2  | Book a session     | existing | row (later)  |
 */

import Link from "next/link";

import { TrackHeroPhoneCapture } from "@/components/capture/track-hero/phone-capture";
import { TrackHeroPhoneCheckoutCapture } from "@/components/capture/track-hero/phone-checkout";
import { TrackHeroPhoneSessionDetailCapture } from "@/components/capture/track-hero/phone-session-detail";
import { TrackHeroWebCapture } from "@/components/capture/track-hero/web-capture";
import { TrackHeroWebFleetCapture } from "@/components/capture/track-hero/web-fleet";
import { TrackHeroWebScheduleCapture } from "@/components/capture/track-hero/web-schedule";
import "@/components/capture/track-hero/track-hero-capture.css";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import "@/components/projects/mockups/track-hero-phone-mock.css";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import type { Project } from "@/types/content";

const phoneShell = {
  shellClassName: "bg-[#07080A]",
  screenClassName: "bg-[#07080A]",
  statusTone: "dark" as const,
};

type TrackHeroCaseStudyProps = {
  project: Project;
};

export function TrackHeroCaseStudy({ project }: TrackHeroCaseStudyProps) {
  const stackGroups = [
    { title: "Customer and ops UI", items: ["React", "Next.js", "TypeScript"] },
    { title: "API and validation", items: ["Django"] },
    { title: "Payments", items: ["Stripe"] },
  ];

  return (
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      {project.visibility === "anonymized" ? (
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted-foreground">
          Work shown under NDA. Screens use representative layouts, not live venue data.
        </p>
      ) : null}

      <div className="mt-14">
        <DeviceStage
          layout="hero"
          syncPhone
          web={[
            {
              id: "ops-overview",
              label: "Group overview",
              url: "www.trackhero.com",
              tone: "dark",
              children: (
                <CaptureFrame kind="web" background="#07080A">
                  <TrackHeroWebCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "event-schedule",
              label: "Event schedule",
              url: "www.trackhero.com",
              tone: "dark",
              children: (
                <CaptureFrame kind="web" background="#07080A">
                  <TrackHeroWebScheduleCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "fleet",
              label: "Fleet",
              url: "www.trackhero.com",
              tone: "dark",
              children: (
                <CaptureFrame kind="web" background="#07080A">
                  <TrackHeroWebFleetCapture />
                </CaptureFrame>
              ),
            },
          ]}
          phones={[
            {
              id: "book-session",
              label: "Book a session",
              ...phoneShell,
              children: (
                <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                  <TrackHeroPhoneCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "session-detail",
              label: "Session detail",
              ...phoneShell,
              children: (
                <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                  <TrackHeroPhoneSessionDetailCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "checkout-hero",
              label: "Checkout",
              ...phoneShell,
              children: (
                <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                  <TrackHeroPhoneCheckoutCapture />
                </CaptureFrame>
              ),
            },
          ]}
        />
      </div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-12 lg:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-normal">Problem</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            Motorsports venues sell track time, driving experiences, and events. Each one wanted a
            booking site that felt like their brand, not a generic portal. They still had to share
            reservations, fleet assignments, CRM, and payments without five separate backends.
          </p>
        </section>
        <section>
          <h2 className="font-display text-2xl font-normal">What I built</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            I worked full stack on the customer booking flows and the operator back office. That
            meant reservations and scheduling, fleet and events, reporting, and the Stripe paths for
            cards, gift certificates, credits, and promo codes. White-label fronts went to Sonoma
            Raceway, Monticello Motor Club, The Motor Enclave, Skip Barber, and Spring Mountain,
            all on one Django API with typed clients, token refresh, and route guards.
          </p>
        </section>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-normal">From session pick to payment</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          The same reservation engine powers branded mobile booking, session detail, and checkout
          with stored cards and account credits.
        </p>
        <div className="mt-10">
          <DeviceStage
            layout="row"
            phones={[
              {
                id: "book-session-row",
                label: "Choose a session",
                ...phoneShell,
                children: (
                  <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                    <TrackHeroPhoneCapture />
                  </CaptureFrame>
                ),
              },
              {
                id: "session-detail-row",
                label: "Review details",
                ...phoneShell,
                children: (
                  <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                    <TrackHeroPhoneSessionDetailCapture />
                  </CaptureFrame>
                ),
              },
              {
                id: "checkout-row",
                label: "Checkout",
                ...phoneShell,
                children: (
                  <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                    <TrackHeroPhoneCheckoutCapture />
                  </CaptureFrame>
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Stack</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3">
          {stackGroups.map((group) => (
            <li
              key={group.title}
              className="rounded-2xl border border-border bg-card/40 p-6"
            >
              <h3 className="font-display text-lg font-normal">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((tech) => (
                  <li
                    key={tech}
                    className="font-mono text-sm text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-20 max-w-5xl">
        <h2 className="font-display text-2xl font-normal">Outcome</h2>
        <dl className="mt-8 grid gap-8 sm:grid-cols-2">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <dt className="font-display text-[clamp(2.5rem,6vw,3.75rem)] font-normal leading-none text-accent">
                {metric.value}
              </dt>
              <dd className="mt-2 text-muted-foreground">{metric.label}</dd>
            </div>
          ))}
        </dl>
        <ul className="mt-10 space-y-4">
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

      <div className="mx-auto mt-16 max-w-3xl border-t border-border pt-10">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 font-display text-xl text-foreground hover:text-accent"
        >
          Start a conversation
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
