"use client";

import { useSyncExternalStore } from "react";

import Magnet from "@/components/react-bits/Magnet";

function subscribeReducedMotion(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

export function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Server markup skips the pointer wrapper. The client snapshot attaches it
  // once the media query is known, so reduced-motion visitors never get it.
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  if (reduced) {
    return className ? <div className={className}>{children}</div> : children;
  }

  return (
    <Magnet
      padding={28}
      magnetStrength={4}
      wrapperClassName={className}
      innerClassName={className ? "w-full" : undefined}
    >
      {children}
    </Magnet>
  );
}
