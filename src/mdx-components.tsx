import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

import {
  BookingArchitecture,
  CheckoutInstruments,
  ConfigOrFork,
  StacksVsEngine,
} from "@/components/blog/diagrams/booking-architecture";
import { CrawlerView, OgImageUrl } from "@/components/blog/diagrams/nextjs-seo";
import { AuthLayers, RefreshRace, RefreshSingleFlight } from "@/components/blog/diagrams/token-refresh";
import { StartupClocksTimeline } from "@/components/blog/diagrams/android-app-startup-ttid-ttfd";
import { PoolDiagnosisTree, PoolWaitVsUse } from "@/components/blog/diagrams/api-slow-under-load-connection-pool";
import { AwsBillSixPasses } from "@/components/blog/diagrams/aws-bill-investigation";
import { InpFieldLabLoop, InpPhaseBreakdown } from "@/components/blog/diagrams/debug-inp-field-data";
import { IdempotencyCheckThenInsert, IdempotencyClaimFirst, IdempotencyRecordTooLate } from "@/components/blog/diagrams/idempotency-key-race-conditions";
import { IdempotentRedeliveryTimeline, IdempotentTransactionBoundary } from "@/components/blog/diagrams/idempotent-consumers";
import { LateEventPolicies, LateEventTimeline } from "@/components/blog/diagrams/late-arriving-data-pipelines";
import { LlmCostInvestigationOrder, LlmCostResentContext } from "@/components/blog/diagrams/llm-api-cost-token-accounting";
import { LongTxnHeldVsSplit, LongTxnOrderStates } from "@/components/blog/diagrams/long-transactions-external-calls";
import { NPlusOneJoinVsBatched, NPlusOneRoundTrips } from "@/components/blog/diagrams/n-plus-one-queries-postgres";
import { NatStackedCharges, NatWhichFix } from "@/components/blog/diagrams/nat-gateway-costs";
import { NextCacheInvalidationReach } from "@/components/blog/diagrams/nextjs-cache-stale-data";
import { BolaMissingDecision, BolaNestedChecks } from "@/components/blog/diagrams/object-authorization";
import { KeysetSeekVsOffsetScan, OffsetShiftsRows } from "@/components/blog/diagrams/offset-vs-keyset-pagination";
import { OomThreeBranches } from "@/components/blog/diagrams/oomkilled-branches";
import { OtelOverflowFold, OtelQuietErrorRatio } from "@/components/blog/diagrams/opentelemetry-metric-cardinality";
import { TailFanOutPage, TailQueueVsBimodal } from "@/components/blog/diagrams/p99-tail-latency";
import { MigrationLockQueue } from "@/components/blog/diagrams/postgres-migration-lock-queue";
import { RagTriageTree, RagWideToSendFunnel } from "@/components/blog/diagrams/rag-retrieval-evaluation";
import { ReplicaPositionTokenRouting, ReplicaStaleReadTimeline } from "@/components/blog/diagrams/read-your-writes-replica-lag";
import { JitterSpreadsRetries, RetryLayerAmplification } from "@/components/blog/diagrams/retry-storm-backoff-jitter";
import { ServerlessPoolerFunnel, ServerlessSessionMultiplication } from "@/components/blog/diagrams/serverless-database-connection-limits";
import { WebhookAckWindows, WebhookInboxFlow } from "@/components/blog/diagrams/webhook-handler-durable-ack";
import { Figure } from "@/components/blog/figure";
import { slugify, textOf } from "@/lib/slug";
import { cn } from "@/lib/utils";

// Aside for a tip or a caveat. Usage in MDX: <Callout title="Trade-off">…</Callout>
function Callout({ title, tone = "note", children }: { title?: string; tone?: "note" | "warn"; children: ReactNode }) {
  return (
    <aside
      className={cn(
        "my-8 rounded-lg border-l-2 bg-foreground/[0.03] px-5 py-4 [&>p:first-of-type]:mt-2",
        tone === "warn" ? "border-[#CB4B16]" : "border-accent",
      )}
    >
      {title ? <p className="text-sm font-medium text-foreground">{title}</p> : null}
      {children}
    </aside>
  );
}

// Picked up by @next/mdx (the src/ location is one of its resolve aliases).
// Maps Markdown elements onto the site's type styles so posts read like the
// privacy and terms pages, without pulling in a prose plugin.
const components: MDXComponents = {
  // The id must match extractHeadings() in src/lib/blog-source.ts; both use slugify.
  h2: ({ children, ...props }) => (
    <h2
      id={slugify(textOf(children))}
      className="mt-14 font-display text-3xl font-normal leading-tight tracking-tight text-foreground"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: (props) => (
    <h3 className="mt-10 text-lg font-medium text-foreground" {...props} />
  ),
  p: (props) => <p className="mt-5" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-medium text-foreground" {...props} />,
  blockquote: (props) => (
    <blockquote className="mt-6 border-l-2 border-border pl-5 italic" {...props} />
  ),
  hr: () => <hr className="my-12 border-border" />,
  // Inline code. Fenced blocks arrive as <pre><code>, and the pre rule resets these styles.
  // Merge className: Shiki tags <pre> with its own classes, which must not drop these.
  code: ({ className, ...props }) => (
    <code
      className={cn("rounded bg-foreground/5 px-1.5 py-0.5 font-mono text-[0.9em] text-foreground", className)}
      {...props}
    />
  ),
  pre: ({ className, ...props }) => (
    <pre
      className={cn(
        "mt-6 overflow-x-auto rounded-lg border border-border bg-foreground/5 p-4 text-sm leading-relaxed text-foreground [&_code]:bg-transparent [&_code]:p-0",
        className,
      )}
      {...props}
    />
  ),
  Figure,
  Callout,
  // Diagrams (src/components/blog/diagrams). Wrap each in <Figure> for the frame and caption.
  BookingArchitecture,
  StacksVsEngine,
  CheckoutInstruments,
  ConfigOrFork,
  RefreshRace,
  RefreshSingleFlight,
  AuthLayers,
  CrawlerView,
  OgImageUrl,
  IdempotencyRecordTooLate,
  StartupClocksTimeline,
  PoolWaitVsUse,
  PoolDiagnosisTree,
  AwsBillSixPasses,
  InpPhaseBreakdown,
  InpFieldLabLoop,
  IdempotencyCheckThenInsert,
  IdempotencyClaimFirst,
  IdempotentRedeliveryTimeline,
  IdempotentTransactionBoundary,
  LateEventTimeline,
  LateEventPolicies,
  LlmCostInvestigationOrder,
  LlmCostResentContext,
  LongTxnHeldVsSplit,
  LongTxnOrderStates,
  NPlusOneRoundTrips,
  NPlusOneJoinVsBatched,
  NatStackedCharges,
  NatWhichFix,
  NextCacheInvalidationReach,
  BolaMissingDecision,
  BolaNestedChecks,
  OffsetShiftsRows,
  KeysetSeekVsOffsetScan,
  OomThreeBranches,
  OtelOverflowFold,
  OtelQuietErrorRatio,
  TailFanOutPage,
  TailQueueVsBimodal,
  MigrationLockQueue,
  RagTriageTree,
  RagWideToSendFunnel,
  ReplicaStaleReadTimeline,
  ReplicaPositionTokenRouting,
  RetryLayerAmplification,
  JitterSpreadsRetries,
  ServerlessSessionMultiplication,
  ServerlessPoolerFunnel,
  WebhookInboxFlow,
  WebhookAckWindows,
  a: ({ href = "", ...props }) => {
    const className = "text-foreground underline underline-offset-4";
    // Internal links go through next/link so they prefetch and keep client navigation.
    if (href.startsWith("/")) {
      return <Link href={href} className={className} {...props} />;
    }
    return <a href={href} className={className} rel="noopener noreferrer" {...props} />;
  },
};

export function useMDXComponents(inherited: MDXComponents = {}): MDXComponents {
  return { ...inherited, ...components };
}
