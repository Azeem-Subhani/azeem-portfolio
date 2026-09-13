"use client";

import { RealTimeChatWebCapture } from "@/components/capture/real-time-chat/web-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/real-time-chat/real-time-chat-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live Relay chat — scaled from 1600×900 for BrowserFrame. */
export function RealTimeChatWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="real-time-chat"
      className="relative aspect-[16/9] w-full overflow-hidden bg-[#14110E]"
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
        <RealTimeChatWebCapture />
      </div>
    </div>
  );
}
