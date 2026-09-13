"use client";

import { GamingGlobalWebCapture } from "@/components/capture/gaming-global/web-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/gaming-global/gaming-global-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live Gaming Global player stats — scaled from 1600×900 for BrowserFrame. */
export function GamingGlobalWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="gaming-global"
      className="relative aspect-[16/9] w-full overflow-hidden bg-[#12110F]"
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
        <GamingGlobalWebCapture />
      </div>
    </div>
  );
}
