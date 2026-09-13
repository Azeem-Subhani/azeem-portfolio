"use client";

import { useReveal } from "@/hooks/use-reveal";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: "div" | "section";
};

export function Reveal({ children, className, delayMs = 0, as = "div" }: RevealProps) {
  const ref = useReveal<HTMLDivElement>({ delayMs, onlyIfOutOfView: true });

  if (as === "section") {
    return (
      <section ref={ref} className={className}>
        {children}
      </section>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
