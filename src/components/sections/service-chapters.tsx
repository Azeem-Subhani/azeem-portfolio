"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { CloudTraceWaterfallVisual } from "@/components/sections/cloud-trace-waterfall-visual";
import { DataVisual } from "@/components/sections/data-visual";
import { MobileVisual } from "@/components/sections/mobile-visual";
import { WebGantryStackVisual } from "@/components/sections/web-gantry-stack-visual";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger, SplitText);

type Chapter = {
  id: string;
  href: string;
  linkLabel: string;
  title: string;
  copy: string;
  copySecondary?: string;
  chips?: string[];
  visual: ReactNode;
  visualFirst: boolean;
};

const chapters: Chapter[] = [
  {
    id: "cloud",
    href: "/services/cloud",
    linkLabel: "How I run cloud",
    title: "Serverless backends",
    copy: "I build on Lambda, Cognito, Amplify, and DynamoDB, deployed as one SAM stack. The memorial planning portal runs on that stack and handles 500+ authenticated requests a day.",
    copySecondary:
      "Every request is traced hop by hop, so when checkout slows down, I can see which service caused it.",
    chips: ["Route-level auth", "SAM deploy pipeline", "Write path metrics"],
    visual: <CloudTraceWaterfallVisual />,
    visualFirst: false,
  },
  {
    id: "web",
    href: "/services/web-development",
    linkLabel: "How I build web",
    title: "Web design & development",
    copy: "I build product UI in Next.js and React. The Track Booking Platform's white-label booking sites run five race tracks from one codebase. Each venue gets its own brand, domain, and pages, while calendars and checkout stay shared.",
    chips: ["Product UI", "White-label surfaces", "Shared checkout"],
    visual: <WebGantryStackVisual />,
    visualFirst: true,
  },
  {
    id: "mobile",
    href: "/services/mobile-development",
    linkLabel: "How I ship mobile",
    title: "Cross-platform mobile apps",
    copy: "I ship mobile apps with Ionic, Angular, and React Native. The Sports Team App runs web and mobile from one codebase, so coaches and players see the same live schedule.",
    visual: <MobileVisual />,
    visualFirst: false,
  },
  {
    id: "data",
    href: "/services/data-management",
    linkLabel: "How I keep data in one place",
    title: "Enterprise data management",
    copy: "Postgres holds the relational records. DynamoDB and Firestore take over when a product needs partitioned writes or live sync. Queries run against those same stores, so AI answers come from live data, not a copy.",
    copySecondary:
      "Stripe and Trust Commerce write to the same store that owns the record. I set that up at the schema level, so a payment and its record can't drift apart.",
    visual: <DataVisual />,
    visualFirst: true,
  },
];

export function ServiceChapters() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const sections = root.querySelectorAll<HTMLElement>("[data-service-chapter]");
    const allTargets = root.querySelectorAll<HTMLElement>(
      "[data-chapter-title], [data-chapter-copy], [data-chapter-chip], [data-chapter-visual]",
    );
    const triggers: Array<() => void> = [];
    const clear = () => gsap.set(allTargets, { clearProps: "all" });

    if (reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clear();
      return;
    }

    const context = gsap.context(() => {
      sections.forEach((section) => {
        const title = section.querySelector<HTMLElement>("[data-chapter-title]");
        const copy = section.querySelectorAll<HTMLElement>("[data-chapter-copy]");
        const chips = section.querySelectorAll<HTMLElement>("[data-chapter-chip]");
        const visual = section.querySelector<HTMLElement>("[data-chapter-visual]");
        const visualFirst = section.dataset.visualFirst === "true";
        const direction = visualFirst ? -1 : 1;
        const clipVisual = section.id !== "mobile";
        const copyBlock = section.querySelector<HTMLElement>("[data-chapter-copy-block]");

        gsap.set(copy, { opacity: 0, x: direction * 20, y: 14 });
        if (chips.length) {
          gsap.set(chips, { opacity: 0, y: 12, scale: 0.97 });
        }
        gsap.set(visual, {
          opacity: 0,
          x: direction * -24,
          scale: 0.975,
          ...(clipVisual
            ? { clipPath: "inset(5% 0 5% 0 round 1.25rem)" }
            : { clipPath: "none" }),
        });

        // The heading leads, line by line, then the body follows once it has
        // landed — the same reading order the reference site uses.
        let titleTimeline: gsap.core.Timeline | null = null;
        let titleStarted = false;

        const titleSplit = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          linesClass: "chapter-title-line",
          autoSplit: true,
          onSplit: (self) => {
            titleTimeline = gsap.timeline({
              paused: true,
              defaults: { ease: "power3.out" },
            }).fromTo(
              self.lines,
              {
                yPercent: 112,
                rotate: direction * 0.7,
                transformOrigin: visualFirst ? "right bottom" : "left bottom",
              },
              { yPercent: 0, rotate: 0, duration: 0.72, stagger: 0.085 },
            );

            // A resize re-splits the heading into brand-new line elements, so
            // restore the revealed state explicitly instead of letting the
            // fresh lines sit at the masked start position.
            if (titleStarted) titleTimeline.progress(1);
          },
        });

        const copyTimeline = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } }).to(
          copy,
          { opacity: 1, x: 0, y: 0, duration: 0.62, stagger: 0.12 },
          0.45,
        );

        if (chips.length) {
          copyTimeline.to(
            chips,
            { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.07 },
            1.0,
          );
        }

        const visualTimeline = gsap
          // The visual answers the copy rather than racing it.
          .timeline({ paused: true, defaults: { ease: "power3.out" }, delay: 0.24 })
          .to(visual, {
            opacity: 1,
            x: 0,
            scale: 1,
            ...(clipVisual
              ? { clipPath: "inset(0% 0 0% 0 round 1.25rem)" }
              : { clipPath: "none" }),
            duration: 0.95,
          });

        const copyTrigger = copyBlock ?? title ?? section;
        const visualTrigger = visual ?? section;

        const copySt = ScrollTrigger.create({
          trigger: copyTrigger,
          start: () => revealStart(copyTrigger.offsetHeight, window.innerHeight),
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => {
            if (!titleStarted) {
              titleStarted = true;
              titleTimeline?.play(0);
            }
            copyTimeline.play();
          },
        });

        const visualSt = ScrollTrigger.create({
          trigger: visualTrigger,
          start: () =>
            revealStart(
              visualTrigger === section
                ? window.innerHeight * 0.5
                : visualTrigger.offsetHeight,
              window.innerHeight,
            ),
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => visualTimeline.play(),
        });

        // A deep link can land past the trigger before ScrollTrigger sees the
        // crossing; play those instead of leaving the chapter hidden.
        const playIfAlreadyPast = () => {
          if (copySt.start <= window.scrollY + 4 && !copyTimeline.isActive() && copyTimeline.progress() === 0) {
            if (!titleStarted) {
              titleStarted = true;
              titleTimeline?.play(0);
            }
            copyTimeline.play();
          }
          if (
            visualSt.start <= window.scrollY + 4 &&
            !visualTimeline.isActive() &&
            visualTimeline.progress() === 0
          ) {
            visualTimeline.play();
          }
        };
        const raf = requestAnimationFrame(playIfAlreadyPast);
        triggers.push(() => cancelAnimationFrame(raf));

        triggers.push(
          () => copySt.kill(),
          () => visualSt.kill(),
          () => titleTimeline?.kill(),
          () => titleSplit.revert(),
          () => copyTimeline.kill(),
          () => visualTimeline.kill(),
        );
      });
    }, root);

    return () => {
      context.revert();
      clear();
      triggers.forEach((kill) => kill());
    };
  }, [reduced]);

  return (
    <div ref={rootRef} className="overflow-x-clip">
      {chapters.map((chapter) => (
        <section
          key={chapter.id}
          id={chapter.id}
          data-service-chapter
          data-visual-first={chapter.visualFirst ? "true" : "false"}
          aria-labelledby={`${chapter.id}-title`}
          // Tighter than the other home bands: each chapter carries a tall visual of its own.
          className={`scroll-mt-28 px-4 py-14 sm:px-6 sm:py-20${
            chapter.id === "mobile" ? " overflow-visible" : ""
          }`}
        >
          <div
            className={`mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20${
              chapter.id === "mobile" ? " overflow-visible" : ""
            }`}
          >
            <div
              data-chapter-copy-block
              className={chapter.visualFirst ? "lg:order-2" : undefined}
            >
              <h2
                id={`${chapter.id}-title`}
                className="overflow-hidden pb-[0.08em] -mb-[0.08em] font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-normal leading-[1.05] tracking-tight"
              >
                <span data-chapter-title className="block will-change-transform">
                  {chapter.title}
                </span>
              </h2>
              <p
                data-chapter-copy
                className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg"
              >
                {chapter.copy}
              </p>
              {chapter.copySecondary ? (
                <p
                  data-chapter-copy
                  className="mt-4 max-w-md text-sm leading-6 text-muted-foreground"
                >
                  {chapter.copySecondary}
                </p>
              ) : null}
              {chapter.chips ? (
                <ul
                  className="mt-6 flex flex-wrap gap-2"
                  aria-label={`${chapter.title} capabilities`}
                >
                  {chapter.chips.map((chip) => (
                    <li
                      key={chip}
                      data-chapter-chip
                      className="rounded-full border border-border/80 bg-surface/60 px-3 py-1.5 text-sm text-foreground"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : null}
              <p data-chapter-copy className="mt-8">
                <Link
                  href={chapter.href}
                  className="inline-flex w-fit items-center gap-2 border-b border-accent pb-1 text-sm font-medium text-foreground transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {chapter.linkLabel}
                  <span aria-hidden="true">↗</span>
                </Link>
              </p>
            </div>
            <div
              data-chapter-visual
              className={
                chapter.visualFirst
                  ? "lg:order-1"
                  : chapter.id === "mobile"
                    ? "overflow-visible"
                    : undefined
              }
              aria-hidden="true"
            >
              {chapter.visual}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
