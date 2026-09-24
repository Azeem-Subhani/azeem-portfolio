"use client";

import { CloudTraceWaterfallVisual } from "@/components/sections/cloud-trace-waterfall-visual";
import { DataHeroVisual } from "@/components/sections/data-hero-visual";
import { MobileVisual } from "@/components/sections/mobile-visual";
import { WebGantryStackVisual } from "@/components/sections/web-gantry-stack-visual";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types/content";

export function ServiceVisual({ slug }: { slug: ServiceSlug }) {
  const mobile = slug === "mobile-development";

  return (
    <div
      className={cn(
        "service-visual",
        mobile ? "service-visual-mobile" : undefined,
      )}
      aria-hidden="true"
    >
      {slug === "cloud" ? <CloudTraceWaterfallVisual /> : null}
      {slug === "web-development" ? <WebGantryStackVisual /> : null}
      {slug === "mobile-development" ? <MobileVisual /> : null}
      {slug === "data-management" ? <DataHeroVisual /> : null}
    </div>
  );
}
