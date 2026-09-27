"use client";

import { Fragment, useLayoutEffect, useRef, type CSSProperties, type RefObject } from "react";
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

/** Same word split as ServiceIntro, so the shared CSS entrance can stagger via --i. */
function HeroWords({
  text,
  offset = 0,
  accent = false,
}: {
  text: string;
  offset?: number;
  accent?: boolean;
}) {
  const words = text.split(" ");
  return words.map((word, index) => (
    <Fragment key={`${word}-${index}`}>
      <span className="service-hero-word" style={{ "--i": offset + index } as CSSProperties}>
        {accent ? <span className="cloud-hero-accent-ink">{word}</span> : word}
      </span>
      {index < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

// Keeps the last title line one continuous gradient after it is split into words.
function useAccentLine(lineRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    const line = lineRef.current;
    if (!line) return;

    let cancelled = false;
    const fit = () => {
      if (cancelled) return;
      line.style.setProperty("--line-w", `${line.getBoundingClientRect().width}px`);
      for (const word of line.querySelectorAll<HTMLElement>(".service-hero-word")) {
        word.style.setProperty("--word-x", `${word.offsetLeft}px`);
      }
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(line);
    void document.fonts?.ready.then(fit);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [lineRef]);
}

// Attribute names are prefixed with "cloud-intro" on purpose: globals.css hides
// any [data-hero-*] element until the homepage hero clears a flag.
// The headline, lede, and actions use the service-hero CSS entrance instead.
function useCloudIntro<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The stage runs its own sequence. This only draws the rule and the numbers.
    const context = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
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
  const accentRef = useRef<HTMLSpanElement>(null);
  useAccentLine(accentRef);

  return (
    <div ref={rootRef}>
      <header className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-10">
        <div className="cloud-hero-copy lg:col-span-6">
          <p data-service-kicker className="text-sm font-medium text-muted-foreground">
            {service.metaTitle}
          </p>

          <h1
            className="cloud-hero-title mt-5 font-display text-[clamp(3.25rem,6.4vw,6rem)] leading-[0.9] font-normal tracking-[-0.03em] text-foreground"
            aria-label={service.titleLines.join(" ")}
          >
            {service.titleLines.map((line, lineIndex) => {
              const accent = lineIndex === service.titleLines.length - 1;
              const offset = service.titleLines
                .slice(0, lineIndex)
                .reduce((count, prev) => count + prev.split(" ").length, 0);
              return (
                // Descender guard so "p" and "y" survive the mask at 0.9 leading.
                <span key={line} aria-hidden className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
                  <span
                    ref={accent ? accentRef : undefined}
                    className={cn(
                      "block",
                      // The last line fades from paper into teal. Padding lets the
                      // clipped background reach the descenders.
                      accent && "cloud-hero-accent -mb-[0.12em] pb-[0.12em] text-transparent",
                    )}
                  >
                    <HeroWords text={line} offset={offset} accent={accent} />
                  </span>
                </span>
              );
            })}
          </h1>

          <p className="cloud-hero-lede mt-7 max-w-[32rem] text-lg leading-8 text-muted-foreground">
            <HeroWords text={service.lede} />
          </p>

          <div
            data-service-actions
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
