"use client";

import { TaskManagerPhoneCapture } from "@/components/capture/task-manager/phone-capture";
import { IPHONE_15_PRO } from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/task-manager/task-manager-capture.css";
import "@/components/projects/mockups/task-manager-phone-mock.css";

const DESIGN_W = 900;
const DESIGN_H = Math.round(
  DESIGN_W * (IPHONE_15_PRO.screenHeight / IPHONE_15_PRO.screenWidth),
);

/** Live Posy Today list — the case study's phone capture, scaled to fill the iPhone 15 Pro frame. */
export function TaskManagerPhoneMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H, "width");

  return (
    <div
      ref={hostRef}
      data-live-phone-mockup="task-manager"
      className="tm-phone-mock-host relative h-full w-full overflow-hidden bg-[#FBF5F1]"
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
        <TaskManagerPhoneCapture />
      </div>
    </div>
  );
}
