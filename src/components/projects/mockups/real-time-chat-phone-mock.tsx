"use client";

import { RealTimeChatPhoneCapture } from "@/components/capture/real-time-chat/phone-capture";
import { IPHONE_15_PRO } from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/real-time-chat/real-time-chat-capture.css";
import "@/components/projects/mockups/real-time-chat-phone-mock.css";

const DESIGN_W = 900;
const DESIGN_H = Math.round(
  DESIGN_W * (IPHONE_15_PRO.screenHeight / IPHONE_15_PRO.screenWidth),
);

/** Live Relay chat — scaled to fill iPhone 15 Pro frame. */
export function RealTimeChatPhoneMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H, "width");

  return (
    <div
      ref={hostRef}
      data-live-phone-mockup="real-time-chat"
      className="rtc-phone-mock-host relative h-full w-full overflow-hidden bg-[#14110E]"
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
        <RealTimeChatPhoneCapture />
      </div>
    </div>
  );
}
