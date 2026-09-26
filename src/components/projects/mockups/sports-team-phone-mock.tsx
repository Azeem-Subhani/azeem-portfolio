"use client";

import { SportsTeamPhoneCapture } from "@/components/capture/sports-team/phone-capture";

import {
  SPORTS_TEAM_PHONE_CAPTURE_WIDTH,
  SPORTS_TEAM_PHONE_MOCK_HEIGHT,
} from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/sports-team/sports-team-capture.css";
import "@/components/projects/mockups/sports-team-phone-mock.css";

const DESIGN_W = SPORTS_TEAM_PHONE_CAPTURE_WIDTH;
const DESIGN_H = SPORTS_TEAM_PHONE_MOCK_HEIGHT;

/** Live sports team chat — scaled to fill iPhone 15 Pro frame. */
export function SportsTeamPhoneMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H, "width");

  return (
    <div
      ref={hostRef}
      data-live-phone-mockup="sports-team-app"
      className="sports-team-phone-mock-host relative h-full w-full overflow-hidden bg-[#F4F6F2]"
      aria-hidden="true"
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
        }}
      >
        <SportsTeamPhoneCapture />
      </div>
    </div>
  );
}
