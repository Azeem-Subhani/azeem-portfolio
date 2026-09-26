/*
 * FRAME PLAN
 * | kind  | id              | label              | source   | stage        |
 * | web   | ops-overview    | Group overview     | existing | hero         |
 * | web   | event-schedule  | Event schedule     | invented | hero         |
 * | web   | fleet           | Fleet              | invented | hero         |
 * | phone | book-session    | Book a session     | existing | hero         |
 * | phone | session-detail  | Review details     | invented | row (later)  |
 * | phone | checkout        | Checkout           | invented | row (later)  |
 */

import { TrackBookingPhoneCapture } from "@/components/capture/track-booking/phone-capture";
import { TrackBookingPhoneCheckoutCapture } from "@/components/capture/track-booking/phone-checkout";
import { TrackBookingPhoneSessionDetailCapture } from "@/components/capture/track-booking/phone-session-detail";
import { TrackBookingWebCapture } from "@/components/capture/track-booking/web-capture";
import { TrackBookingWebFleetCapture } from "@/components/capture/track-booking/web-fleet";
import { TrackBookingWebScheduleCapture } from "@/components/capture/track-booking/web-schedule";
import "@/components/capture/track-booking/track-booking-capture.css";
import {
  CaseStudyBrief,
  CaseStudyNote,
  CaseStudyOutcomes,
  CaseStudySection,
  CaseStudyStack,
} from "@/components/projects/case-studies/case-study-sections";
import { DeviceStage } from "@/components/projects/device-stage";
import { CaptureFrame } from "@/components/projects/mockups/capture-frame";
import "@/components/projects/mockups/track-booking-phone-mock.css";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import type { Project } from "@/types/content";

const phoneShell = {
  shellClassName: "bg-[#07080A]",
  screenClassName: "bg-[#07080A]",
  statusTone: "dark" as const,
};

type TrackBookingCaseStudyProps = {
  project: Project;
};

export function TrackBookingCaseStudy({ project }: TrackBookingCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      {project.visibility === "anonymized" ? (
        <CaseStudyNote>
          Work shown under NDA. Screens use representative layouts, not live venue data.
        </CaseStudyNote>
      ) : null}

      <div className="mt-12">
        <DeviceStage
          layout="hero"
          syncPhone
          web={[
            {
              id: "ops-overview",
              label: "Group overview",
              url: "booking.example.com",
              tone: "dark",
              children: (
                <CaptureFrame kind="web" background="#07080A">
                  <TrackBookingWebCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "event-schedule",
              label: "Event schedule",
              url: "booking.example.com",
              tone: "dark",
              children: (
                <CaptureFrame kind="web" background="#07080A">
                  <TrackBookingWebScheduleCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "fleet",
              label: "Fleet",
              url: "booking.example.com",
              tone: "dark",
              children: (
                <CaptureFrame kind="web" background="#07080A">
                  <TrackBookingWebFleetCapture />
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
                  <TrackBookingPhoneCapture />
                </CaptureFrame>
              ),
            },
          ]}
        />
      </div>

      <CaseStudyBrief
        problem={[
          "Motorsports venues sell track time, driving experiences, and events. Each one wanted a booking site that felt like their brand, not a generic portal. They still had to share reservations, fleet assignments, CRM, and payments without five separate backends.",
        ]}
        solution={[
          "I worked full stack on the customer booking flows and the operator back office. That meant reservations and scheduling, fleet and events, reporting, and the Stripe paths for cards, gift certificates, credits, and promo codes. White-label fronts went to Coastal Raceway, Ridgeline Motor Club, Harbor Motor Park, Summit Racing School, and High Desert Motorsports, all on one Django API with typed clients, token refresh, and route guards.",
        ]}
      />

      {/* The hero phone shows session pick; this row carries the flow on to payment. */}
      <CaseStudySection
        title="From session detail to payment"
        intro="The same reservation engine powers branded mobile booking, session detail, and checkout with stored cards and account credits."
      >
        <DeviceStage
          layout="row"
          phones={[
            {
              id: "session-detail-row",
              label: "Review details",
              ...phoneShell,
              children: (
                <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                  <TrackBookingPhoneSessionDetailCapture />
                </CaptureFrame>
              ),
            },
            {
              id: "checkout-row",
              label: "Checkout",
              ...phoneShell,
              children: (
                <CaptureFrame kind="phone" background="#07080A" className="th-phone-mock-host">
                  <TrackBookingPhoneCheckoutCapture />
                </CaptureFrame>
              ),
            },
          ]}
        />
      </CaseStudySection>

      <CaseStudyStack items={project.stack} />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
