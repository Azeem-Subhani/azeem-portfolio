"use client";

import type { ReactNode } from "react";

import { OXYM_PHONE_MOCK_HEIGHT } from "@/components/projects/device-frames/iphone-15-pro";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";
import { cn } from "@/lib/utils";

import "@/components/projects/mockups/capture-frame.css";

export const WEB_CAPTURE_SIZE = { width: 1600, height: 900 } as const;
export const PHONE_CAPTURE_SIZE = {
  width: 900,
  height: OXYM_PHONE_MOCK_HEIGHT,
} as const;

type CaptureFrameProps = {
  kind: "web" | "phone";
  background: string;
  className?: string;
  children: ReactNode;
};

/**
 * Scales a 1600×900 web capture or 900-wide phone capture into a device frame.
 * Phone frames pin to the iPhone screen (`absolute inset-0`) so a wrapping
 * div cannot collapse the host height to zero.
 */
export function CaptureFrame({
  kind,
  background,
  className,
  children,
}: CaptureFrameProps) {
  const size = kind === "web" ? WEB_CAPTURE_SIZE : PHONE_CAPTURE_SIZE;
  const { hostRef, scale } = useCaptureScale(size.width, size.height, "width");

  return (
    <div
      ref={hostRef}
      data-capture-frame={kind}
      className={cn(
        "overflow-hidden",
        kind === "web"
          ? "relative aspect-[16/9] w-full"
          : "absolute inset-0 h-full w-full",
        className,
      )}
      style={{ backgroundColor: background }}
      aria-hidden="true"
    >
      <div
        className="absolute left-0 top-0 origin-top-left"
        style={{
          width: size.width,
          height: size.height,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
