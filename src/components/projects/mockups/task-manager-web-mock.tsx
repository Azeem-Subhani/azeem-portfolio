"use client";

import { TaskManagerWebCapture } from "@/components/capture/task-manager/web-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/task-manager/task-manager-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live Posy task studio — scaled from 1600×900 for BrowserFrame. */
export function TaskManagerWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="task-manager"
      className="relative aspect-[16/9] w-full overflow-hidden bg-[#FBF5F1]"
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
        <TaskManagerWebCapture />
      </div>
    </div>
  );
}
