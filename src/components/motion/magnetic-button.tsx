"use client";

import Magnet from "@/components/react-bits/Magnet";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export function MagneticButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
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
