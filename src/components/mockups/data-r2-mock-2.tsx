"use client";

import type { CSSProperties } from "react";
import { motion, type Variants } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const slabIn: Variants = {
  hidden: { opacity: 0, scaleY: 0.88, originY: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: { duration: 0.55, ease: settle },
  },
};

const fade: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: settle },
  },
};

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.05, ease: settle, delay: 0.18 },
  },
};

type Stratum = {
  id: string;
  store: string;
  record: string;
  detail: string;
  tone: "accent" | "signal" | "success" | "muted";
  tint: string;
};

const strata: Stratum[] = [
  {
    id: "rag",
    store: "RAG retrieval",
    record: "policy excerpt · score 0.94",
    detail: "Contributions post within one business day after card capture.",
    tone: "signal",
    tint: "rgb(38 139 210 / 0.1)",
  },
  {
    id: "pg",
    store: "PostgreSQL",
    record: "memorial_orders · row 8842",
    detail: "Whitmore installment 2 · $847 pending",
    tone: "accent",
    tint: "rgb(42 161 152 / 0.12)",
  },
  {
    id: "ddb",
    store: "DynamoDB",
    record: "session mirror · pk family#whitmore",
    detail: "TTL 3600 · spike traffic buffer",
    tone: "signal",
    tint: "rgb(38 139 210 / 0.08)",
  },
  {
    id: "fs",
    store: "Firestore",
    record: "family_app/receipts/8842",
    detail: "Receipt pushed live to mobile client",
    tone: "success",
    tint: "rgb(133 153 0 / 0.1)",
  },
];

const payments = [
  { id: "stripe", label: "Stripe", amount: "$125", mode: "card capture" },
  { id: "trust", label: "Trust Commerce", amount: "$847", mode: "memorial ACH" },
] as const;

function toneClass(tone: Stratum["tone"]) {
  if (tone === "accent") return "text-accent";
  if (tone === "signal") return "text-signal";
  if (tone === "success") return "text-success";
  return "text-muted-foreground";
}

function StrataVisual({ reduced }: { reduced: boolean }) {
  return (
    <div
      className="relative mx-auto w-full max-w-[20rem] md:max-w-[28rem]"
      style={{ perspective: 1200 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[48%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
      />

      <div className="dark relative" data-theme="dark">
        <motion.div
          className="relative min-h-[34rem] overflow-hidden rounded-[1.75rem] border border-accent/20 bg-surface px-4 pb-5 pt-4 shadow-[0_0_0_1px_rgb(42_161_152/0.12),0_32px_64px_-32px_rgb(0_43_54/0.75)] sm:min-h-[36rem] sm:px-5"
          variants={stage}
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          <motion.div className="relative" variants={pass}>
            <motion.p
              className="text-[11px] leading-5 text-muted-foreground"
              variants={fade}
            >
              One memorial installment crossing every store before settlement
            </motion.p>

            <div className="relative mt-4">
              <svg
                viewBox="0 0 40 420"
                className="pointer-events-none absolute bottom-8 left-1/2 top-2 z-10 h-[calc(100%-2.5rem)] w-10 -translate-x-1/2"
                aria-hidden="true"
              >
                <motion.path
                  d="M 20 0 V 380"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  variants={draw}
                />
                {!reduced && (
                  <motion.circle
                    r="4"
                    fill="var(--accent)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <animateMotion
                      dur="2.6s"
                      repeatCount="indefinite"
                      path="M 20 0 V 380"
                    />
                  </motion.circle>
                )}
              </svg>

              <div className="space-y-0">
                {strata.map((layer) => (
                  <motion.div
                    key={layer.id}
                    className="relative border-y border-border/50 first:border-t-0"
                    style={{ backgroundColor: layer.tint } as CSSProperties}
                    variants={slabIn}
                  >
                    <div className="px-3 py-3.5 sm:px-4 sm:py-4">
                      <p
                        className={`pl-6 text-[12px] font-medium leading-none sm:pl-7 ${toneClass(layer.tone)}`}
                      >
                        {layer.store}
                      </p>
                      <p className="mt-2 pl-6 text-[11px] font-medium leading-snug text-foreground sm:pl-7">
                        {layer.record}
                      </p>
                      <p className="mt-1 max-w-[16rem] pl-6 text-[10px] leading-relaxed text-muted-foreground sm:pl-7">
                        {layer.detail}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="relative mt-3 overflow-hidden rounded-xl border border-border/60 bg-background/70"
              variants={slabIn}
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent"
              />
              <div className="grid grid-cols-2 divide-x divide-border/50">
                {payments.map((payment) => (
                  <div key={payment.id} className="px-3 py-3 sm:px-4 sm:py-3.5">
                    <p className="text-[11px] font-medium text-foreground">{payment.label}</p>
                    <p className="mt-1 font-display text-xl leading-none tracking-tight text-accent">
                      {payment.amount}
                    </p>
                    <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground">
                      {payment.mode}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.p
              className="mt-4 text-center text-[10px] leading-relaxed text-muted-foreground"
              variants={fade}
            >
              500+ authenticated charges daily on the memorial portal
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export function DataR2Mock2() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data"
      aria-labelledby="data-r2-mock-2-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <StrataVisual reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 24 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.75, ease: settle }}
          >
            <h2
              id="data-r2-mock-2-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              PostgreSQL holds memorial orders and ledger rows. DynamoDB mirrors sessions when
              traffic spikes. Firestore pushes receipts to the family app. RAG retrieval pulls
              the policy excerpt before the charge writes. Stripe captures cards; Trust Commerce
              handles ACH on the memorial portal.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
