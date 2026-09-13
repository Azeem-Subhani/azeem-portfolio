"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 380, damping: 18 },
  },
};

const grow: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.7, ease: settle },
  },
};

const slide: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: settle },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const logs = [
  "Cognito pool ready",
  "Lambda p95 84ms",
  "Dynamo writes ok",
  "Trust Commerce live",
];

export function CloudVisual() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      className="mx-auto w-full max-w-lg"
      variants={stage}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      <motion.p className="text-sm text-muted-foreground" variants={fade}>
        Oak Hill Chapel, Whitmore family
      </motion.p>
      <motion.p
        className="mt-2 font-display text-[clamp(3.5rem,8vw,5.5rem)] leading-[0.9] tracking-tight"
        variants={pop}
      >
        $1,280
      </motion.p>
      <motion.p className="mt-2 text-sm text-accent" variants={fade}>
        settled in 84ms
      </motion.p>

      <motion.div className="mt-10 flex items-end justify-between gap-6" variants={fade}>
        <div>
          <p className="font-display text-4xl leading-none tabular-nums">512</p>
          <p className="mt-1 text-sm text-muted-foreground">payments today</p>
        </div>
        <p className="max-w-[10rem] text-right text-xs leading-5 text-muted-foreground">
          Cognito, Lambda, DynamoDB, Trust Commerce. us-east-1.
        </p>
      </motion.div>

      <motion.div className="mt-8 origin-left" variants={grow}>
        <div className="h-1.5 rounded-full bg-accent/80" />
      </motion.div>

      <motion.ul className="mt-8 space-y-1.5 font-mono text-xs text-muted-foreground" variants={pass}>
        {logs.map((line) => (
          <motion.li key={line} variants={slide}>
            {line}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
