"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { gsap } from "gsap";

import { CloudStage } from "@/components/services/cloud-hero/cloud-stage";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ServicePageContent } from "@/types/content";

type CloudServiceHeroProps = {
  service: ServicePageContent;
};

// Attribute names are prefixed with "cloud-intro" on purpose: globals.css hides
// any [data-hero-*] element until the homepage hero clears a flag.
function useCloudIntro<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The copy lands while the cloud is still forming beside it; the stage
    // runs its own sequence, so this only covers the words and the numbers.
    // Title and lede stay put. They are the largest paint, and starting them
    // off-screen waited on this effect. The rule and the numbers can still enter.
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-cloud-intro-fade]", { opacity: 0, y: 12, duration: 0.9, stagger: 0.08 }, 0)
        .from(
          "[data-cloud-intro-rule]",
          { scaleX: 0, transformOrigin: "left center", duration: 1.2, ease: "power3.inOut" },
          0.15,
        )
        .from("[data-cloud-intro-stat]", { opacity: 0, y: 10, duration: 0.8, stagger: 0.08 }, 0.2);
    }, root);

    return () => context.revert();
  }, []);

  return rootRef;
}

export function CloudServiceHero({ service }: CloudServiceHeroProps) {
  const rootRef = useCloudIntro<HTMLDivElement>();

  return (
    <div ref={rootRef}>
      <header className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-6">
          <p data-cloud-intro-fade className="text-sm font-medium text-muted-foreground">
            {service.metaTitle}
          </p>

          <h1
            className="mt-5 font-display text-[clamp(3.25rem,6.4vw,6rem)] leading-[0.9] font-normal tracking-[-0.03em] text-foreground"
            aria-label={service.titleLines.join(" ")}
          >
            {service.titleLines.map((line, index) => (
              // Descender guard so "p" and "y" survive the mask at 0.9 leading.
              <span key={line} aria-hidden className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                <span
                  className={cn(
                    "block will-change-transform",
                    // The last line fades from paper into teal. w-fit ties the
                    // gradient to the words, and the padding lets the clipped
                    // background reach the descenders.
                    index === service.titleLines.length - 1 &&
                      "-mb-[0.12em] w-fit bg-linear-100 from-foreground from-30% to-accent-readable bg-clip-text pb-[0.12em] text-transparent",
                  )}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p className="mt-7 max-w-[32rem] text-lg leading-8 text-muted-foreground">
            {service.lede}
          </p>

          <div
            data-cloud-intro-fade
            data-inline-cta
            className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <Button asChild size="lg">
              <Link href="/contact">Start a conversation</Link>
            </Button>
            <a
              href="#cloud-shipped"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-muted-foreground/50 decoration-1 underline-offset-[6px] transition-colors hover:decoration-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              See shipped stacks
              <ArrowDown aria-hidden className="size-3.5" />
            </a>
          </div>
        </div>

        <CloudStage className="mx-auto max-w-[40rem] lg:col-span-6 lg:max-w-none" />
      </header>

      {service.proof.length ? (
        <section aria-label="Operated results" className="relative mt-10 lg:mt-6">
          <span
            aria-hidden
            data-cloud-intro-rule
            className="absolute inset-x-0 top-0 h-px bg-foreground/15"
          />
          <dl className="grid gap-y-8 py-8 sm:grid-cols-3 sm:gap-x-10">
            {service.proof.map((item) => (
              <div key={item.label} data-cloud-intro-stat className="flex flex-col-reverse gap-2">
                <dt className="text-sm leading-6 text-muted-foreground">{item.label}</dt>
                <dd className="font-display text-[clamp(2.75rem,4.6vw,4rem)] leading-none tracking-[-0.02em] text-foreground tabular-nums">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
          <span aria-hidden className="block h-px bg-foreground/15" />
        </section>
      ) : null}
    </div>
  );
}
