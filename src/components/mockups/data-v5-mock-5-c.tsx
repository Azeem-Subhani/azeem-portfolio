"use client";

import { motion, type Variants } from "motion/react";

import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const STEP_START = 0.22;
const STEP_STAGGER = 0.11;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const panelIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: settle },
  },
};

function fieldIn(index: number): Variants {
  return {
    hidden: { opacity: 0, x: 8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: settle,
        delay: STEP_START + index * STEP_STAGGER,
      },
    },
  };
}

const spineDraw: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.45, ease: settle, delay: 0.08 },
  },
};

function segmentDraw(index: number): Variants {
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.42,
        ease: settle,
        delay: STEP_START + index * STEP_STAGGER + 0.05,
      },
    },
  };
}

function nodeDraw(index: number): Variants {
  return {
    hidden: { opacity: 0, scale: 0.55 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 420,
        damping: 24,
        delay: STEP_START + index * STEP_STAGGER,
      },
    },
  };
}

const stampIn: Variants = {
  hidden: { opacity: 0, scale: 1.3, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 22,
      delay: STEP_START + 4 * STEP_STAGGER + 0.18,
    },
  },
};

type ManifestRow = {
  id: string;
  workload: string;
  store: string;
  storeNote: string;
  query: string;
  retrieval: string;
  rail: string;
  amount: string;
  settled: boolean;
};

const manifests: ManifestRow[] = [
  {
    id: "relational",
    workload: "Booking hold",
    store: "PostgreSQL",
    storeNote: "row locked until checkout",
    query: "slot availability",
    retrieval: "2 policy docs · 0.91",
    rail: "Stripe",
    amount: "$890.00",
    settled: true,
  },
  {
    id: "session",
    workload: "Checkout session",
    store: "DynamoDB",
    storeNote: "partition key on cart id",
    query: "installment schedule",
    retrieval: "1 excerpt · 38ms",
    rail: "Trust Commerce",
    amount: "$1,280.00",
    settled: true,
  },
  {
    id: "sync",
    workload: "Roster update",
    store: "Firestore",
    storeNote: "live sync to clients",
    query: "dues batch lookup",
    retrieval: "4 receipts matched",
    rail: "Stripe Connect",
    amount: "$340.00",
    settled: true,
  },
];

type SpineStep = {
  key: string;
  label: string;
  value: string;
  note?: string;
  tint: "accent" | "accent-secondary" | "success";
};

function spineSteps(row: ManifestRow): SpineStep[] {
  return [
    { key: "store", label: "Store", value: row.store, note: row.storeNote, tint: "accent" },
    { key: "query", label: "Query", value: row.query, tint: "accent-secondary" },
    { key: "retrieval", label: "Retrieval", value: row.retrieval, tint: "accent" },
    { key: "rail", label: "Rail", value: row.rail, tint: "accent-secondary" },
    { key: "amount", label: "Amount", value: row.amount, tint: "success" },
  ];
}

function tintClass(tint: SpineStep["tint"]) {
  if (tint === "accent-secondary") return "text-accent-secondary";
  if (tint === "success") return "text-success";
  return "text-accent";
}

function tintStroke(tint: SpineStep["tint"]) {
  if (tint === "accent-secondary") return "var(--accent-secondary)";
  if (tint === "success") return "var(--success)";
  return "var(--accent)";
}

function SpineJoint({
  step,
  next,
  index,
  isLast,
}: {
  step: SpineStep;
  next?: SpineStep;
  index: number;
  isLast: boolean;
}) {
  return (
    <div className="relative h-full min-h-[2.75rem] self-stretch overflow-visible [--node-top:1.125rem] sm:[--node-top:1.25rem]">
      {!isLast && next ? (
        <svg
          aria-hidden="true"
          className="absolute left-1/2 z-0 w-10 -translate-x-1/2 overflow-visible"
          style={{
            top: "calc(var(--node-top) + 22px)",
            height: "calc(100% - 22px)",
          }}
          viewBox="0 0 40 100"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 20 0 L 20 100"
            fill="none"
            stroke="var(--border)"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            variants={spineDraw}
          />
          <motion.path
            d="M 20 0 L 20 92"
            fill="none"
            stroke={tintStroke(next.tint)}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            variants={segmentDraw(index)}
          />
        </svg>
      ) : null}

      <div
        className="absolute left-1/2 z-10 -translate-x-1/2"
        style={{ top: "var(--node-top)" }}
      >
        <motion.svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          className="overflow-visible"
          variants={nodeDraw(index)}
        >
          <circle
            cx="11"
            cy="11"
            r="7"
            fill="var(--background)"
            stroke={tintStroke(step.tint)}
            strokeWidth="2"
          />
          <circle cx="11" cy="11" r="2.5" fill={tintStroke(step.tint)} />
        </motion.svg>
      </div>
    </div>
  );
}

function SpineField({
  step,
  index,
  stamped,
}: {
  step: SpineStep;
  index: number;
  stamped?: boolean;
}) {
  return (
    <motion.div
      className={`relative py-2 ${stamped ? "pr-14 sm:pr-16" : ""}`}
      variants={fieldIn(index)}
    >
      <p className="text-[9px] leading-tight text-muted-foreground sm:text-[10px]">
        {step.label}
      </p>
      <p
        className={`mt-0.5 truncate text-[11px] font-medium leading-snug sm:text-xs ${tintClass(step.tint)}`}
      >
        {step.value}
      </p>
      {step.note ? (
        <p className="mt-0.5 truncate text-[9px] leading-4 text-muted-foreground sm:text-[10px]">
          {step.note}
        </p>
      ) : null}
      {stamped ? (
        <motion.span
          className="pointer-events-none absolute -right-0.5 bottom-2 rounded-sm border-2 border-success px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-success opacity-90 sm:bottom-2.5 sm:text-[10px]"
          variants={stampIn}
        >
          Settled
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function ExpandedManifest({ row }: { row: ManifestRow }) {
  const steps = spineSteps(row);
  const last = steps.length - 1;

  return (
    <motion.article
      className="relative rounded-md border border-accent/35 bg-background px-3 py-3 shadow-[0_12px_32px_-18px_rgb(var(--shadow-color)/0.35)] sm:px-3.5 sm:py-3.5"
      variants={panelIn}
    >
      <div className="mb-1 border-b border-border/70 pb-2">
        <p className="font-display text-[13px] leading-tight text-foreground sm:text-sm">
          {row.workload}
        </p>
      </div>

      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[1.125rem] top-3 bottom-3 w-8 -translate-x-1/2 rounded-full bg-accent/20 blur-xl sm:left-[1.25rem]"
        />

        {steps.map((step, index) => (
          <div
            key={step.key}
            className="grid grid-cols-[2.25rem_minmax(0,1fr)] items-stretch gap-x-2.5 overflow-visible sm:grid-cols-[2.5rem_minmax(0,1fr)] sm:gap-x-3"
          >
            <SpineJoint
              step={step}
              next={steps[index + 1]}
              index={index}
              isLast={index === last}
            />
            <SpineField
              step={step}
              index={index}
              stamped={step.key === "amount" && row.settled}
            />
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function CollapsedManifest({
  row,
  index,
  total,
}: {
  row: ManifestRow;
  index: number;
  total: number;
}) {
  const depth = total - index;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative rounded-md border border-border/75 bg-background/95 px-3 py-2 shadow-[0_3px_10px_-8px_rgb(var(--shadow-color)/0.45)]"
      style={{
        marginInline: depth * 4,
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[10px] leading-4 text-foreground/80 sm:text-[11px]">
            {row.workload}
          </p>
          <p className="truncate text-[9px] leading-3 text-muted-foreground sm:text-[10px]">
            {row.store} → {row.rail}
          </p>
        </div>
        <p className="shrink-0 tabular-nums text-[10px] text-foreground/75 sm:text-[11px]">
          {row.amount}
        </p>
      </div>
    </div>
  );
}

function TriplicateStack({
  primary,
  secondary,
}: {
  primary: ManifestRow;
  secondary: ManifestRow[];
}) {
  return (
    <div className="relative isolate space-y-1.5">
      {secondary.map((row, index) => (
        <CollapsedManifest
          key={row.id}
          row={row}
          index={index}
          total={secondary.length}
        />
      ))}
      <div className="relative">
        <ExpandedManifest row={primary} />
      </div>
    </div>
  );
}

export function RoutingSpinePanel({
  reduced,
  playOnMount = false,
}: {
  /** Overrides the in-view gate, for previews that own their own timing. */
  reduced: boolean;
  playOnMount?: boolean;
}) {
  const [primary, ...secondary] = manifests;
  const { ref: panelRef, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div className="relative mx-auto w-full max-w-[19.5rem] sm:max-w-[22rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-44 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/16 blur-3xl"
      />

      <motion.div
        ref={panelRef}
        className="relative overflow-hidden rounded-[1.15rem] border border-border/80 bg-surface shadow-[0_28px_56px_-32px_rgb(var(--shadow-color)/0.55)] sm:rounded-[1.25rem]"
        variants={stage}
        initial={reduced ? "visible" : "hidden"}
        animate={reduced || playOnMount || inView ? "visible" : "hidden"}
      >
        <div className="relative z-10 flex items-end justify-between gap-3 border-b border-border/70 bg-background/70 px-3.5 pb-2.5 pt-4 sm:px-4 sm:pt-4.5">
          <div>
            <p className="font-display text-[1.05rem] leading-tight text-foreground sm:text-lg">
              Store routing
            </p>
            <p className="mt-0.5 text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
              triplicate manifest
            </p>
          </div>
          <p className="text-right text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
            RAG at
            <br />
            query time
          </p>
        </div>

        <div className="relative px-2.5 pb-3 pt-3 sm:px-3 sm:pb-3.5 sm:pt-3.5">
          <TriplicateStack primary={primary} secondary={secondary} />
        </div>

        <div className="border-t border-border/70 bg-background/70 px-3.5 py-2.5 sm:px-4">
          <p className="text-[10px] leading-4 text-muted-foreground sm:text-[11px]">
            Each row posts to the store that owns it. Stripe and Trust Commerce settle
            against that same write, not a separate ledger.
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function DataV5Mock5C() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="data-v5-mock-5-c"
      aria-labelledby="data-v5-mock-5-c-title"
      className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="lg:order-1" aria-hidden="true">
          <RoutingSpinePanel reduced={reduced} />
        </div>

        <div className="lg:order-2">
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            whileInView={reduced ? undefined : { opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.55, ease: settle }}
          >
            <h2
              id="data-v5-mock-5-c-title"
              className="font-display text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-tight"
            >
              Enterprise data management
            </h2>
            <p className="mt-5 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Postgres holds relational records. DynamoDB and Firestore take over when
              the product needs partition keys or live sync. RAG retrieval answers from
              those stores in one pass.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Stripe and Trust Commerce settle against whichever store posted the row. I
              wire that path at schema time so charges never chase the wrong home.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
