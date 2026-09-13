"use client";

import { SmartLivingPhoneCapture } from "@/components/capture/smart-living/phone-capture";
import { IPHONE_15_PRO } from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/smart-living/smart-living-capture.css";
import "@/components/projects/mockups/smart-living-phone-mock.css";

const DESIGN_W = 900;
const DESIGN_H = Math.round(
  DESIGN_W * (IPHONE_15_PRO.screenHeight / IPHONE_15_PRO.screenWidth),
);

/** Live Smart Living overview — scaled to fill iPhone 15 Pro frame. */
export function SmartLivingPhoneMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H, "width");

  return (
    <div
      ref={hostRef}
      data-live-phone-mockup="smart-living"
      className="sl-phone-mock-host relative h-full w-full overflow-hidden bg-white"
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
        <SmartLivingPhoneCapture />
      </div>
    </div>
  );
}
