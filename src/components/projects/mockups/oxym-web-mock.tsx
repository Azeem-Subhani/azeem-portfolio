"use client";

import { OxymWebCapture } from "@/components/capture/oxym/web-capture";

import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/oxym/oxym-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live Oxym dashboard — scaled from 1600×900 capture for BrowserFrame. */
export function OxymWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="oxym"
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
        <OxymWebCapture />
      </div>
    </div>
  );
}
