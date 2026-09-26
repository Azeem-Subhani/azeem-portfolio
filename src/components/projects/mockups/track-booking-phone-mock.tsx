"use client";

import { TrackBookingPhoneCapture } from "@/components/capture/track-booking/phone-capture";
import { IPHONE_15_PRO } from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/track-booking/track-booking-capture.css";
import "@/components/projects/mockups/track-booking-phone-mock.css";

const DESIGN_W = 900;
const DESIGN_H = Math.round(
  DESIGN_W * (IPHONE_15_PRO.screenHeight / IPHONE_15_PRO.screenWidth),
);

/** Live track booking customer flow — scaled to fill iPhone 15 Pro frame. */
export function TrackBookingPhoneMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H, "width");

  return (
    <div
      ref={hostRef}
      data-live-phone-mockup="track-booking"
      className="th-phone-mock-host relative h-full w-full overflow-hidden bg-[#07080A]"
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
        <TrackBookingPhoneCapture />
      </div>
    </div>
  );
}
