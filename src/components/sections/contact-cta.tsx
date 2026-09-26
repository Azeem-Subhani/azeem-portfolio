"use client";

import type { CSSProperties } from "react";
import { useMemo } from "react";
import Link from "next/link";
import { motion, type Variants } from "motion/react";

import { MagneticButton } from "@/components/motion/magnetic-button";
import ClickSpark from "@/components/react-bits/ClickSpark";
import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

/** FiveXLabs section-container curve: long deceleration, no bounce. */
const settle = [0.16, 1, 0.3, 1] as const;
/** FiveXLabs hero-word ease (easeOutQuad). */
const easeOutQuad = [0.25, 0.46, 0.45, 0.94] as const;

const headlineLines = ["let's get it", "in front of", "customers"] as const;

function ctaVariants(reduced: boolean): {
  stage: Variants;
  headline: Variants;
  lineMask: Variants;
  lineIn: Variants;
  fadeUp: Variants;
} {
  const duration = reduced ? 0 : 0.8;

  return {
    stage: {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: reduced ? 0 : 0.26,
          delayChildren: reduced ? 0 : 0.06,
        },
      },
    },
    headline: {
      hidden: {},
      visible: {
        transition: { staggerChildren: reduced ? 0 : 0.1 },
      },
    },
    lineMask: {
      hidden: {},
      visible: {},
    },
    lineIn: {
      // The mask carries a little padding under the baseline (see below) so
      // descenders are not sliced off; the hidden state has to clear that
      // taller box, not just the 0.9 line box.
      hidden: { y: "126%", filter: "blur(6px)" },
      visible: {
        y: "0%",
        filter: "blur(0px)",
        transition: { duration, ease: settle },
        transitionEnd: { filter: "none" },
      },
    },
    fadeUp: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, ease: easeOutQuad },
      },
    },
  };
}

export function ContactCta() {
  const reduced = usePrefersReducedMotion();
  const variants = useMemo(() => ctaVariants(reduced), [reduced]);

  const conversation = (
    <MagneticButton>
      <Button asChild size="lg">
        <Link href="/contact">Start a conversation</Link>
      </Button>
    </MagneticButton>
  );

  return (
    <section
      aria-labelledby="cta-title"
      className="home-band-cta relative isolate overflow-hidden px-4 py-24 sm:px-6 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="graph-paper pointer-events-none absolute inset-x-0 top-1/2 h-[min(28rem,72vw)] -translate-y-1/2 opacity-45 [mask-image:radial-gradient(ellipse_70%_62%_at_50%_50%,#000_20%,transparent_72%)]"
        style={
          {
            "--glow-x": "50%",
            "--glow-y": "50%",
          } as CSSProperties
        }
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] h-40 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl sm:h-48 sm:w-64"
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl text-center"
        variants={variants.stage}
        initial={reduced ? "visible" : "hidden"}
        animate={reduced ? "visible" : undefined}
        whileInView={reduced ? undefined : "visible"}
        // Same rule as the GSAP sections: the block starts moving once it is
        // genuinely on screen, not at 0.4 of a section that owns the whole fold.
        viewport={{ once: true, amount: 0.4, margin: "0px 0px -6% 0px" }}
      >
        <motion.h2
          id="cta-title"
          // -mb cancels the descender-guard padding on the last line so the
          // block below keeps its original gap (the negative margin collapses
          // with the paragraph's mt-7).
          className="-mb-[0.16em] font-display text-[clamp(2.75rem,9vw,6.5rem)] font-normal leading-[0.9] tracking-tight"
          variants={variants.headline}
        >
          {headlineLines.map((line) => {
            const isAccent = line === "customers";

            return (
              <motion.span
                key={line}
                // Tight 0.9 leading puts the "g" descender below the line box,
                // where the clip was cutting it flat. The padding gives the ink
                // room; the negative margin keeps the lines 0.9 apart.
                className={cn(
                  "block overflow-clip pb-[0.16em] -mb-[0.16em]",
                  isAccent && "text-accent-ink",
                )}
                variants={variants.lineMask}
              >
                <motion.span className="block" variants={variants.lineIn}>
                  {line}{" "}
                </motion.span>
              </motion.span>
            );
          })}
        </motion.h2>

        <motion.p
          className="mx-auto mt-7 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
          variants={variants.fadeUp}
        >
          Booking flows, payment rails, live rosters. Tell me what you&apos;re shipping and
          where it needs to land.
        </motion.p>

        <motion.div
          data-inline-cta
          className="mx-auto mt-10 flex w-fit max-w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center"
          variants={variants.fadeUp}
        >
          {reduced ? (
            conversation
          ) : (
            <ClickSpark
              sparkColor="#2aa198"
              sparkRadius={28}
              sparkCount={10}
              className="relative inline-flex"
            >
              {conversation}
            </ClickSpark>
          )}
          <Button asChild size="lg" variant="outline" className="shrink-0">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
