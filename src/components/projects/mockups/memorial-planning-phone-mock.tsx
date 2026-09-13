"use client";

import { MemorialPlanningPhoneCapture } from "@/components/capture/memorial-planning/phone-capture";
import { IPHONE_15_PRO } from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/memorial-planning/memorial-planning-capture.css";
import "@/components/projects/mockups/memorial-planning-phone-mock.css";

const DESIGN_W = 900;
const DESIGN_H = Math.round(
  DESIGN_W * (IPHONE_15_PRO.screenHeight / IPHONE_15_PRO.screenWidth),
);

/** Live Memorial Planning payment — scaled to fill iPhone 15 Pro frame. */
export function MemorialPlanningPhoneMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H, "width");

  return (
    <div
      ref={hostRef}
      data-live-phone-mockup="memorial-planning"
      className="mp-phone-mock-host relative h-full w-full overflow-hidden bg-[#F7F7F4]"
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
        <MemorialPlanningPhoneCapture />
      </div>
    </div>
  );
}
