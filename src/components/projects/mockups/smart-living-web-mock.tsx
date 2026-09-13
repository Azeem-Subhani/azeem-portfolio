"use client";

import { SmartLivingWebCapture } from "@/components/capture/smart-living/web-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/smart-living/smart-living-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live Smart Living operations overview — scaled from 1600×900 for BrowserFrame. */
export function SmartLivingWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="smart-living"
      className="relative aspect-[16/9] w-full overflow-hidden bg-[#F7F9FC]"
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
        <SmartLivingWebCapture />
      </div>
    </div>
  );
}
