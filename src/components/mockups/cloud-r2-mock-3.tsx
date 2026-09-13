"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { motion, type Variants } from "motion/react";

import AnimatedContent from "@/components/react-bits/AnimatedContent";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const kioskIn: Variants = {
  hidden: { opacity: 0, y: -24, rotateX: 12 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.75, ease: settle },
  },
};

const railIn: Variants = {
  hidden: { opacity: 0, scaleX: 0.6 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.8, ease: settle, delay: 0.55 },
  },
};

const tallyIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, delay: 1.05 },
  },
};

const nodes = [
  { id: "cognito", label: "Cognito", detail: "session gate", tone: "signal" as const, cy: 168 },
  { id: "lambda", label: "Lambda", detail: "charge handler", tone: "accent" as const, cy: 228 },
  { id: "dynamo", label: "DynamoDB", detail: "ledger write", tone: "accent" as const, cy: 288 },
] as const;

function ConduitPath({ reduced }: { reduced: boolean }) {
  const pathD =
    "M 148 52 C 148 92, 132 118, 108 138 C 84 158, 72 188, 72 228 C 72 268, 84 298, 108 318";

  return (
    <svg
      viewBox="0 0 220 340"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="r2m3-conduit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgb(38 139 210 / 0.15)" />
          <stop offset="45%" stopColor="rgb(42 161 152 / 0.55)" />
          <stop offset="100%" stopColor="rgb(42 161 152 / 0.25)" />
        </linearGradient>
        <radialGradient id="r2m3-packet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2aa198" />
          <stop offset="100%" stopColor="#268bd2" />
        </radialGradient>
      </defs>

      <path
        d={pathD}
        fill="none"
        stroke="url(#r2m3-conduit)"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.35"
      />

      {!reduced ? (
        <motion.path
          d={pathD}
          fill="none"
          stroke="#2aa198"
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0.2 },
            visible: {
              pathLength: 1,
              opacity: 0.95,
              transition: { duration: 1.15, ease: settle, delay: 0.35 },
            },
          }}
        />
      ) : (
        <path
          d={pathD}
          fill="none"
          stroke="#2aa198"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      )}

      {nodes.map((node) => (
        <g key={node.id}>
          <circle cx="72" cy={node.cy} r="16" fill="rgb(4 49 61 / 0.92)" stroke="rgb(42 161 152 / 0.35)" strokeWidth="1.5" />
          <circle cx="72" cy={node.cy} r="5" fill={node.tone === "signal" ? "#268bd2" : "#2aa198"} />
        </g>
      ))}

      {!reduced ? (
        <motion.circle
          r="6"
          fill="url(#r2m3-packet)"
          initial={{ cx: 148, cy: 52, opacity: 0 }}
          animate={{
            cx: [148, 108, 72, 72, 108],
            cy: [52, 138, 168, 228, 318],
            opacity: [0, 1, 1, 1, 0.9],
          }}
          transition={{
            duration: 1.75,
            delay: 1.05,
            ease: settle,
            times: [0, 0.28, 0.52, 0.76, 1],
          }}
        />
      ) : (
        <circle cx="108" cy="318" r="6" fill="url(#r2m3-packet)" />
      )}
    </svg>
  );
}

function ChapelKiosk() {
  return (
    <div className="relative z-20 mx-auto w-[11.5rem] rounded-2xl border border-border/70 bg-surface-elevated p-[7px] shadow-[0_0_0_1px_rgb(42_161_152/0.14),0_20px_48px_-24px_rgb(0_43_54/0.7)] sm:w-[12.5rem]">
      <div className="overflow-hidden rounded-[0.85rem] bg-surface">
        <div className="border-b border-border/60 px-3 py-2">
          <p className="text-[10px] leading-tight text-muted-foreground">Oak Hill Chapel</p>
          <p className="mt-0.5 text-[11px] font-medium text-foreground">Whitmore family</p>
        </div>

        <div className="px-3 py-4">
          <p className="text-[9px] text-muted-foreground">Memorial planning payment</p>
          <p className="mt-1 font-display text-[2rem] leading-none tabular-nums text-foreground">
            $1,280
          </p>

          <div className="mt-4 flex items-center gap-2 rounded-lg border border-success/30 bg-success/10 px-2.5 py-2">
            <span className="flex size-5 items-center justify-center rounded-full bg-success/20 text-success">
              <Check className="size-3" strokeWidth={2.5} aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] font-medium text-success">Cleared</p>
              <p className="text-[9px] tabular-nums text-muted-foreground">84ms write</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 bg-background/40 px-3 py-2">
          <p className="text-[9px] text-muted-foreground">Signed in via Cognito</p>
        </div>
      </div>
    </div>
  );
}

function ConduitVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[20rem] md:max-w-[24rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative flex min-h-[34rem] flex-col items-stretch justify-start pt-6 md:min-h-[36rem] md:pt-8"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div
            className="relative z-20 flex justify-center"
            style={{ transformStyle: "preserve-3d" }}
            variants={kioskIn}
          >
            <ChapelKiosk />
          </motion.div>

          <div className="relative mt-2 flex-1">
            <ConduitPath reduced={reduced} />

            <div className="relative z-10 ml-[4.75rem] space-y-[2.35rem] pt-[7.5rem] sm:ml-[5.25rem] sm:pt-[8rem]">
              {nodes.map((node) => (
                <div key={node.id} className="flex items-baseline gap-2.5">
                  <span className={`text-[11px] font-medium ${node.tone === "signal" ? "text-signal" : "text-accent"}`}>
                    {node.label}
                  </span>
                  <span className="text-[10px] text-muted-foreground">{node.detail}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            className="relative z-10 mt-auto origin-left border-t border-border/50 pt-5"
            variants={railIn}
          >
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {["SAM", "Amplify", "us-east-1"].map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border/60 bg-surface px-2 py-1 text-[9px] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <motion.div className="text-right" variants={tallyIn}>
                <p className="font-display text-2xl leading-none tabular-nums text-foreground">
                  500+
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">auth payments today</p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ChapterMotion({
  reverse,
  children,
}: {
  reverse: boolean;
  children: ReactNode;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return children;

  return (
    <AnimatedContent
      direction="horizontal"
      reverse={reverse}
      distance={40}
      duration={0.75}
      ease="power2.out"
      threshold={0.2}
    >
      {children}
    </AnimatedContent>
  );
}

export function CloudR2Mock3() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud"
      aria-labelledby="cloud-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <ChapterMotion reverse>
            <h2
              id="cloud-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Serverless checkout for the memorial portal
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              I built the planning portal on Lambda, Cognito, SAM, Amplify, and DynamoDB.
              More than five hundred authenticated payments clear through it every day. Oak
              Hill Chapel&apos;s Whitmore family paid $1,280; the write finished in 84
              milliseconds.
            </p>
          </ChapterMotion>
        </div>

        <div aria-hidden="true">
          <ConduitVisual reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
