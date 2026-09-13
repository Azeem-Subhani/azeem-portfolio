"use client";

import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const plateIn: Variants = {
  hidden: { opacity: 0, y: 28, rotateX: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { duration: 0.75, ease: settle },
  },
};

const receiptIn: Variants = {
  hidden: { opacity: 0, x: 32, y: -12, rotate: 4, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 2,
    scale: 1,
    transition: { type: "spring", stiffness: 280, damping: 22, delay: 0.35 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: settle },
  },
};

const pulse: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.4, 1],
    opacity: [0, 1, 0.85],
    transition: { duration: 0.55, ease: settle },
  },
};

const services = [
  {
    label: "Cognito",
    detail: "family session",
    mark: "ID",
    tone: "signal" as const,
  },
  {
    label: "Lambda",
    detail: "SAM · Amplify",
    mark: "λ",
    tone: "accent" as const,
  },
  {
    label: "DynamoDB",
    detail: "payment record",
    mark: "DB",
    tone: "accent" as const,
  },
];

function toneClass(tone: "accent" | "signal") {
  return tone === "signal"
    ? "border-signal/40 bg-signal/12 text-signal"
    : "border-accent/40 bg-accent/12 text-accent";
}

function SettlementStack({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] md:max-w-[26rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[42%] h-64 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] border border-border/60 bg-surface px-5 py-6 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_64px_-28px_rgb(0_43_54/0.65)] md:min-h-[30rem] md:px-6 md:py-7"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <div
            aria-hidden="true"
            className="graph-paper pointer-events-none absolute inset-0 opacity-40"
          />

          <motion.div
            className="relative mb-5 flex items-end justify-between gap-3"
            variants={fade}
          >
            <div>
              <p className="text-[11px] text-muted-foreground">Memorial portal</p>
              <p className="font-display text-[1.65rem] leading-none text-foreground">
                us-east-1
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl leading-none tabular-nums text-foreground">
                512
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                payments today
              </p>
            </div>
          </motion.div>

          <div className="relative" style={{ transformStyle: "preserve-3d" }}>
            <motion.div
              className="relative z-10 ml-auto w-[min(100%,13.5rem)] origin-bottom-right"
              style={{ transformStyle: "preserve-3d" }}
              variants={receiptIn}
            >
              <div className="rounded-2xl border border-accent/35 bg-background p-4 shadow-[0_18px_40px_-22px_rgb(0_0_0/0.55),inset_0_1px_0_rgb(238_232_213/0.08)]">
                <p className="text-[10px] text-muted-foreground">Oak Hill Chapel</p>
                <p className="mt-0.5 text-[11px] font-medium text-foreground">
                  Whitmore family
                </p>
                <p className="mt-3 font-display text-[2.35rem] leading-none tracking-tight text-foreground">
                  $1,280
                </p>
                <div className="mt-2.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] text-accent">
                    {!reduced && (
                      <motion.span
                        className="size-1.5 rounded-full bg-accent"
                        animate={{ opacity: [1, 0.35, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                      />
                    )}
                    settled in 84ms
                  </span>
                  <span className="rounded-md bg-surface-elevated px-1.5 py-0.5 text-[9px] text-muted-foreground">
                    Trust Commerce
                  </span>
                </div>
              </div>
            </motion.div>

            <svg
              viewBox="0 0 280 220"
              className="relative z-0 -mt-2 h-auto w-full text-accent/50"
              aria-hidden="true"
            >
              <motion.path
                d="M 210 28 C 210 68, 140 72, 140 108"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 5"
                variants={fade}
              />
              <motion.path
                d="M 140 108 L 140 148"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                variants={fade}
              />
              <motion.path
                d="M 140 148 C 140 178, 72 182, 72 208"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4 5"
                variants={fade}
              />
              {!reduced && (
                <>
                  <motion.circle
                    r="3.5"
                    className="fill-accent"
                    animate={{
                      cx: [210, 140, 140, 72],
                      cy: [28, 108, 148, 208],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      repeatDelay: 1.2,
                      ease: "easeInOut",
                      times: [0, 0.35, 0.55, 1],
                    }}
                  />
                </>
              )}
            </svg>

            <motion.div className="relative -mt-1 space-y-2.5" variants={pass}>
              {services.map((service, index) => (
                <motion.div
                  key={service.label}
                  className="relative flex items-center gap-3 rounded-xl border border-border/70 bg-surface-elevated/80 px-3.5 py-3 backdrop-blur-sm"
                  style={{
                    marginLeft: `${index * 1.25}rem`,
                    width: `calc(100% - ${index * 1.25}rem)`,
                    transformStyle: "preserve-3d",
                  }}
                  variants={plateIn}
                >
                  <span
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg border text-sm font-medium ${toneClass(service.tone)}`}
                  >
                    {service.mark}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium text-foreground">
                      {service.label}
                    </p>
                    <p className="text-[10px] text-muted-foreground">{service.detail}</p>
                  </div>
                  {!reduced && index === 1 && (
                    <motion.span
                      className="absolute -right-1 -top-1 size-2 rounded-full bg-accent shadow-[0_0_10px_rgb(42_161_152/0.8)]"
                      variants={pulse}
                    />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.p
            className="relative mt-5 text-[11px] leading-5 text-muted-foreground"
            variants={fade}
          >
            Authenticated checkout only — Cognito gates every payment before Lambda
            writes to DynamoDB.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export function CloudSectionMock1() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="cloud"
      aria-labelledby="cloud-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2
            id="cloud-title"
            className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
          >
            Five hundred authenticated payments, daily
          </h2>
          <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
            Lambda, Cognito, SAM, Amplify, and DynamoDB run the memorial planning
            portal I shipped. Families sign in once; checkout clears without a server
            waiting in the background.
          </p>
        </div>
        <div aria-hidden="true">
          <SettlementStack reduced={reduced} />
        </div>
      </div>
    </section>
  );
}
