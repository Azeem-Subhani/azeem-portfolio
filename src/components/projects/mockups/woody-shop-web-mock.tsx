"use client";

import { WoodyShopWebCapture } from "@/components/capture/woody-shop/web-capture";
import { useCaptureScale } from "@/components/projects/mockups/use-capture-scale";

import "@/components/capture/woody-shop/woody-shop-capture.css";

const DESIGN_W = 1600;
const DESIGN_H = 900;

/** Live Woody Shop product page — scaled from 1600×900 for BrowserFrame. */
export function WoodyShopWebMock() {
  const { hostRef, scale } = useCaptureScale(DESIGN_W, DESIGN_H);

  return (
    <div
      ref={hostRef}
      data-live-web-mockup="woody-shop"
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
        <WoodyShopWebCapture />
      </div>
    </div>
  );
}
