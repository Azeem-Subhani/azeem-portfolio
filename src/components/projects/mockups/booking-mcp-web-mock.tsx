"use client";

import { BookingMcpWebCapture } from "@/components/capture/booking-mcp/web-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/booking-mcp/booking-mcp-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live booking-mcp session, scaled from 1600×900 for BrowserFrame. */
export function BookingMcpWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="booking-mcp"
      className="relative aspect-[16/9] w-full overflow-hidden bg-white"
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
        <BookingMcpWebCapture />
      </div>
    </div>
  );
}
