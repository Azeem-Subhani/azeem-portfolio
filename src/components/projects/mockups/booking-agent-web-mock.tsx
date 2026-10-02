"use client";

import { BookingAgentWebChatCapture } from "@/components/capture/booking-agent/web-chat-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/booking-agent/booking-agent-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live Meridian search — scaled from 1600×900 for BrowserFrame. */
export function BookingAgentWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="meridian"
      className="relative aspect-[16/9] w-full overflow-hidden bg-[#F6F5F1]"
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
        <BookingAgentWebChatCapture />
      </div>
    </div>
  );
}
