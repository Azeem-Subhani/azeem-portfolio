"use client";

import Magnet from "@/components/react-bits/Magnet";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function MagneticButton({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return children;

  return (
    <Magnet padding={28} magnetStrength={4}>
      {children}
    </Magnet>
  );
}
