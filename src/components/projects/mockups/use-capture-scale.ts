"use client";

import { useLayoutEffect, useRef, useState } from "react";

type CaptureScaleMode = "width" | "contain" | "cover";

function defaultScale(
  designWidth: number,
  designHeight: number,
  mode: CaptureScaleMode,
): number {
  // PhoneFrame inner viewport ~252×547 (iPhone 15 Pro 393×852 ratio).
  const hostWidth = mode === "cover" || mode === "contain" ? 252 : 500;
  const hostHeight =
    mode === "cover" || mode === "contain"
      ? Math.round(252 * (852 / 393))
      : 281;

  if (mode === "contain") {
    return Math.min(hostWidth / designWidth, hostHeight / designHeight);
  }
  if (mode === "cover") {
    return Math.max(hostWidth / designWidth, hostHeight / designHeight);
  }
  return hostWidth / designWidth;
}

function computeScale(
  width: number,
  height: number,
  designWidth: number,
  designHeight: number,
  mode: CaptureScaleMode,
): number {
  if (width <= 0 || height <= 0) return defaultScale(designWidth, designHeight, mode);

  if (mode === "contain") {
    return Math.min(width / designWidth, height / designHeight);
  }
  if (mode === "cover") {
    return Math.max(width / designWidth, height / designHeight);
  }
  return width / designWidth;
}

export function useCaptureScale(
  designWidth: number,
  designHeight: number,
  mode: CaptureScaleMode = "width",
) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(() =>
    defaultScale(designWidth, designHeight, mode),
  );

  useLayoutEffect(() => {
    const el = hostRef.current;
    if (!el) return;

    const update = () => {
      setScale(
        computeScale(
          el.clientWidth,
          el.clientHeight,
          designWidth,
          designHeight,
          mode,
        ),
      );
    };

    update();

    if (typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth, designHeight, mode]);

  return { hostRef, scale };
}
