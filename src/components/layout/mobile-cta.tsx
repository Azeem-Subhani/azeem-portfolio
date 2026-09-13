"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

export function MobileCta() {
  const pathname = usePathname();
  const isUtilityPage =
    pathname.startsWith("/contact") ||
    pathname === "/privacy" ||
    pathname === "/terms";

  if (isUtilityPage) return null;

  return (
    <aside
      aria-label="Contact shortcut"
      className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 md:hidden"
    >
      <Button asChild size="lg" className="w-full shadow-xl shadow-black/15">
        <Link href="/contact">Start a conversation</Link>
      </Button>
    </aside>
  );
}
