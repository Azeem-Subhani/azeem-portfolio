"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Puzzle, Rocket, Server } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import SpotlightCard from "@/components/react-bits/SpotlightCard";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const cards: {
  title: string;
  copy: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Ship an MVP",
    copy: "Turn a proposal into software the first users can actually book, pay, or log into.",
    icon: Rocket,
  },
  {
    title: "Add the hard parts",
    copy: "Payments, real-time, and AI features dropped into a product that already exists.",
    icon: Puzzle,
  },
  {
    title: "Untangle infrastructure",
    copy: "Serverless AWS, auth, and data so the product holds up past launch.",
    icon: Server,
  },
  {
    title: "Custom product work",
    copy: "White-label booking, Stripe flows, and RAG workflows built for the business, not a template.",
    icon: Layers,
  },
];

const headline = [
  { text: "plan.", className: "block" },
  { text: "build.", className: "block" },
  { text: "ship.", className: "block text-accent" },
] as const;

function FeatureCard({
  title,
  copy,
  icon: Icon,
}: {
  title: string;
  copy: string;
  icon: LucideIcon;
}) {
  return (
    <SpotlightCard
      spotlightColor="rgba(42, 161, 152, 0.18)"
      className="relative h-full overflow-hidden rounded-lg border border-border bg-surface p-5 sm:p-6"
    >
      <Icon
        data-feature-icon
        aria-hidden="true"
        strokeWidth={1.25}
        className="pointer-events-none absolute -right-3 -bottom-3 size-28 text-foreground/10"
      />
      <h3 className="relative text-base font-medium">{title}</h3>
      <p className="relative mt-3 text-sm leading-6 text-muted-foreground">{copy}</p>
    </SpotlightCard>
  );
}

export function FeatureCards() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cardEls = section.querySelectorAll<HTMLElement>("[data-feature-card]");
    const lineEls = section.querySelectorAll<HTMLElement>("[data-feature-line]");
    const iconEls = section.querySelectorAll<HTMLElement>("[data-feature-icon]");
    const subEl = section.querySelector<HTMLElement>("[data-feature-sub]");
    const targets = [...cardEls, ...lineEls, ...iconEls, ...(subEl ? [subEl] : [])];

    const revert = () => {
      gsap.set(targets, { clearProps: "opacity,transform,clipPath" });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revert();
      return;
    }

    gsap.set(cardEls, {
      opacity: 0,
      y: 34,
      clipPath: "inset(10% 0 0 0 round 0.875rem)",
    });
    gsap.set(lineEls, { yPercent: 112, rotate: 1, transformOrigin: "left bottom" });
    gsap.set(iconEls, { opacity: 0, scale: 0.72, rotate: -8 });
    if (subEl) gsap.set(subEl, { opacity: 0, y: 18 });

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
    tl.to(
      lineEls,
      // Heading first, on its own beat, then the cards answer it.
      { yPercent: 0, rotate: 0, duration: 0.8, stagger: 0.12 },
    )
      .to(
        cardEls,
        {
          opacity: 1,
          y: 0,
          clipPath: "inset(0% 0 0 0 round 0.875rem)",
          duration: 0.7,
          stagger: 0.08,
        },
        0.46,
      )
      .to(
        iconEls,
        { opacity: 1, scale: 1, rotate: 0, duration: 0.55, stagger: 0.06 },
        0.74,
      );
    if (subEl) {
      tl.to(subEl, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.82);
    }

    const st = ScrollTrigger.create({
      trigger: section,
      // The cards sit beside the headline, so the pair only starts once the
      // section genuinely has the screen — not when its top edge peeks in.
      start: () => revealStart(section.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => tl.play(),
    });

    const raf = requestAnimationFrame(() => {
      if (st.start <= window.scrollY + 4 && !tl.isActive() && tl.progress() === 0) {
        tl.play();
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    void document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", refresh);
      st.kill();
      tl.kill();
      revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="process-title"
      className="px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2">
          {cards.map((card) => (
            <li key={card.title} data-feature-card>
              <FeatureCard {...card} />
            </li>
          ))}
        </ul>

        <div>
          <h2
            id="process-title"
            // -mb cancels the descender-guard padding on the last line so the
            // paragraph below keeps its original gap.
            className="-mb-[0.16em] font-display text-[clamp(3rem,8vw,6.25rem)] font-normal leading-[0.88] tracking-tight"
          >
            {headline.map((line) => (
              <span
                key={line.text}
                // 0.08em was not enough room for the p/y descenders at this
                // tight 0.88 leading, so the clip was slicing them flat.
                className={cn("overflow-hidden pb-[0.16em] -mb-[0.16em]", line.className)}
              >
                <span data-feature-line className="block will-change-transform">
                  {line.text}
                </span>
              </span>
            ))}
          </h2>
          <p
            data-feature-sub
            className="mt-6 max-w-xs text-base leading-7 text-muted-foreground"
          >
            I own all three, from the first sketch to launch.
          </p>
        </div>
      </div>
    </section>
  );
}
