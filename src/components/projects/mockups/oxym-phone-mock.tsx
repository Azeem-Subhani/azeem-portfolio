"use client";

import { OxymPhoneCapture } from "@/components/capture/oxym/phone-capture";

import {
  OXYM_PHONE_CAPTURE_WIDTH,
  OXYM_PHONE_MOCK_HEIGHT,
} from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/oxym/oxym-capture.css";
import "@/components/projects/mockups/oxym-phone-mock.css";

const DESIGN_W = OXYM_PHONE_CAPTURE_WIDTH;
const DESIGN_H = OXYM_PHONE_MOCK_HEIGHT;

/** Live Oxym team chat — scaled to fill iPhone 15 Pro frame. */
export function OxymPhoneMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H, "width");

  return (
    <div
      ref={hostRef}
      data-live-phone-mockup="oxym"
      className="oxym-phone-mock-host relative h-full w-full overflow-hidden bg-[#F4F6F2]"
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
        <OxymPhoneCapture />
      </div>
    </div>
  );
}
