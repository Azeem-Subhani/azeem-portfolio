"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function MobileCta() {
  const pathname = usePathname();
  const isUtilityPage =
    pathname.startsWith("/contact") ||
    pathname === "/privacy" ||
    pathname === "/terms";
  // Hidden until the first check so a page whose own CTA is on screen never flashes this one.
  const [hidden, setHidden] = useState(true);

  // Pages mark their own contact buttons, and heroes it must not cover (project device
  // stages), with [data-inline-cta]. While any of them is on screen it steps aside.
  useEffect(() => {
    if (isUtilityPage) return;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-inline-cta]"));
    if (targets.length === 0 || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setHidden(false));
      return () => cancelAnimationFrame(frame);
    }

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });
      setHidden(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname, isUtilityPage]);

  if (isUtilityPage) return null;

  return (
    <aside
      aria-label="Contact shortcut"
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className={cn(
        "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 transition-[opacity,translate] duration-300 ease-out motion-reduce:transition-none md:hidden",
        hidden && "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <Button asChild size="lg" className="w-full shadow-xl shadow-black/15">
        <Link href="/contact">Start a conversation</Link>
      </Button>
    </aside>
  );
}
