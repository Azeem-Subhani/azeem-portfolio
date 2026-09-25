import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { IndustrySolution } from "@/types/content";

/**
 * "Shipped in" for production work, "Related work" for the nearest real project, and an
 * explicit "not shipped yet" tag when there is nothing to point at.
 */
export function SolutionLink({ link, className }: { link: IndustrySolution["link"]; className?: string }) {
  if (!link) {
    return (
      <p
        data-im-after
        className={cn(
          "inline-flex items-center gap-2 rounded-full border border-dashed border-border px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground",
          className,
        )}
      >
        Approach · not shipped yet
      </p>
    );
  }

  return (
    <Link
      data-im-after
      href={link.href}
      className={cn(
        "group/proof inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-readable)] underline-offset-4 hover:underline",
        className,
      )}
    >
      {link.kind === "shipped" ? "Shipped in" : "Related work"}: {link.label}
      <ArrowRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover/proof:translate-x-1"
      />
    </Link>
  );
}
