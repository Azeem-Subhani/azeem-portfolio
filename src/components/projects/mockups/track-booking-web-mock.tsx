"use client";

import { TrackBookingWebCapture } from "@/components/capture/track-booking/web-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/track-booking/track-booking-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live track booking operator console — scaled from 1600×900 for BrowserFrame. */
export function TrackBookingWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="track-booking"
      className="relative aspect-[16/9] w-full overflow-hidden bg-[#07080A]"
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
        <TrackBookingWebCapture />
      </div>
    </div>
  );
}
