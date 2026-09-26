"use client";

import { SportsTeamWebCapture } from "@/components/capture/sports-team/web-capture";

import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/sports-team/sports-team-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live sports team dashboard — scaled from 1600×900 capture for BrowserFrame. */
export function SportsTeamWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="sports-team-app"
      className="relative aspect-[16/9] w-full overflow-hidden bg-[#F4F6F2]"
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
        <SportsTeamWebCapture />
      </div>
    </div>
  );
}
