import type { ServiceSlug } from "@/types/content";

// Post metadata lives here, typed, so sitemap, nav, and tests can read it
// without an MDX transform. Each post's body is src/content/blog/<slug>.mdx;
// tests/unit/blog.test.ts checks the two stay in step.
export type BlogPost = {
  slug: string;
  title: string;
  // Used as the meta description and the index card summary. Keep it 70-160 characters.
  description: string;
  // ISO dates (YYYY-MM-DD).
  publishedAt: string;
  updatedAt?: string;
  tags: string[];
  // Drafts render (so they can be reviewed in a production build) but are
  // noindex, left out of the sitemap and index, and never turn on the nav link.
  draft: boolean;
  relatedProjects: string[];
  relatedServices: ServiceSlug[];
  // Optional real image for the cover and index card; posts without one get generated art.
  cover?: { src: string; alt: string; width: number; height: number };
};

export const posts: BlogPost[] = [
  {
    slug: "white-label-booking-one-payments-engine",
    title: "Five branded booking sites on one payments engine",
    description:
      "How a motorsports booking platform serves five white-label venues from one shared reservation and Stripe payments engine, and what that design costs.",
    publishedAt: "2026-08-12",
    tags: ["Architecture", "Payments", "Multi-tenant"],
    draft: true,
    relatedProjects: ["track-booking"],
    relatedServices: ["web-development", "data-management"],
    cover: {
      src: "/images/blog/track-booking-ops-console.webp",
      alt: "Operator console with a group overview across all venues, beside the customer booking flow on a phone. Mockup with sample data.",
      width: 1600,
      height: 897,
    },
  },
  {
    slug: "typed-api-clients-token-refresh",
    title: "Typed API clients and token refresh: fixing auth-expiry bugs",
    description:
      "Why booking flows fail when access tokens expire mid-checkout, and how typed API clients, token refresh, and route guards removed a class of those bugs.",
    publishedAt: "2026-09-10",
    tags: ["TypeScript", "Auth", "Next.js"],
    draft: true,
    relatedProjects: ["track-booking"],
    relatedServices: ["web-development"],
    cover: {
      src: "/images/blog/typed-api-clients-token-refresh-cover.webp",
      alt: "A JWT printed huge in red, magenta and cyan monospace, with the decoded exp line enlarged and struck through above a note that the token expired at step three of checkout.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "nextjs-product-sites-search-can-read",
    title: "Next.js product sites that search engines can actually read",
    description:
      "A checklist for shipping Next.js marketing and product pages that crawlers can parse: server-rendered HTML, metadata, canonicals, sitemaps, and structured data.",
    publishedAt: "2026-08-06",
    tags: ["Next.js", "SEO", "Performance"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development"],
    cover: {
      src: "/images/blog/nextjs-product-sites-search-can-read-cover.webp",
      alt: "Raw page source in Courier on white, with the title, meta description, canonical link and JSON-LD lines swiped with a green highlighter.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "retry-storm-backoff-jitter",
    title: "Retry Storms: Exponential Backoff, Jitter, and One Retry Layer",
    description:
      "Why capped exponential backoff still causes retry storms, how retries multiply across layers, and how to fix it with full jitter, budgets, and one retry layer.",
    publishedAt: "2026-10-03",
    tags: ["APIs", "Distributed systems", "Reliability", "AWS"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "cloud"],
    cover: {
      src: "/images/blog/retry-storm-fan-out.webp",
      alt: "One click fans out through a gateway and a service into 27 attempts against the database when each layer tries three times.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "idempotency-key-race-conditions",
    title: "Idempotency Key Race Conditions That Still Cause Duplicate Charges",
    description:
      "Three ways an idempotency key still lets a charge run twice, and the claim, call, record design in Postgres that closes each race.",
    publishedAt: "2026-08-17",
    tags: ["APIs", "Payments", "Postgres", "Distributed systems"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "data-management"],
    cover: {
      src: "/images/blog/idempotency-race-lanes.webp",
      alt: "Two requests, A and B, carry the same idempotency key. Both find no key, both charge 50 dollars, and only then does B's insert fail as a duplicate.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "webhook-handler-durable-ack",
    title: "Webhook Return 200 Before Processing: Store First, Then Do the Work",
    description:
      "Return a webhook 200 before processing, but only after a durable insert. How to avoid lost events and double applies with Stripe-style retries.",
    publishedAt: "2026-09-02",
    tags: ["APIs", "Payments", "Reliability", "Distributed systems"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "cloud"],
    cover: {
      src: "/images/blog/webhook-stamped-200.webp",
      alt: "A log of stored webhook events with a blue rubber stamp reading 200, after insert, pressed over one row.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "api-slow-under-load-connection-pool",
    title: "API Slow Under Load? Measure Connection Pool Wait Before Tuning",
    description:
      "Pool wait, not query time, is often why APIs slow down under load. Measure wait and hold time, cap waiters, and size the pool for the database.",
    publishedAt: "2026-09-11",
    tags: ["Performance", "APIs", "Postgres", "Databases"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "data-management"],
    cover: {
      src: "/images/blog/api-slow-under-load-connection-pool-cover.webp",
      alt: "Ten occupied connection slots labelled 4 ms query above a long snaking queue of waiting requests labelled 8 s wait.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "serverless-database-connection-limits",
    title: "Serverless Database Connection Exhaustion: Fix the Fleet Arithmetic",
    description:
      "Serverless instances times pool size can exceed Postgres max_connections. Size pools per platform, add a pooler, and know what transaction mode breaks.",
    publishedAt: "2026-08-22",
    tags: ["Cloud", "AWS", "Postgres", "Databases"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["cloud", "data-management"],
    cover: {
      src: "/images/blog/serverless-database-connection-limits-cover.webp",
      alt: "A grid of 1,000 squares: the first 100 in cream up to max_connections, the other 900 in red, from 200 instances times 5 connections.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "long-transactions-external-calls",
    title: "Transaction Open During an HTTP Call: Why the Pool Drains",
    description:
      "A transaction held across a remote call ties up a connection and its locks. Find it, split the transaction, and recover safely with idempotency keys.",
    publishedAt: "2026-10-02",
    tags: ["Postgres", "Databases", "Reliability", "APIs"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "data-management"],
    cover: {
      src: "/images/blog/long-transactions-external-calls-cover.webp",
      alt: "BEGIN and COMMIT at opposite edges of a magenta field, joined by a thin line with an hourglass marked 1.85 s, waiting on the payment API.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "unexpected-aws-bill-investigation",
    title: "Unexpected AWS Bill Investigation: Find the Usage Type and Resource",
    description:
      "Trace a surprise AWS bill from the daily total to service, usage type, and resource, and learn which charges never carry a resource ID.",
    publishedAt: "2026-10-04",
    tags: ["Cloud", "AWS", "Cost"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["cloud"],
    cover: {
      src: "/images/blog/unexpected-aws-bill-investigation-cover.webp",
      alt: "A typewritten AWS bill on a red surface with the USE2-NatGateway-Bytes line, $2,846.71, circled in blue ink.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "nat-gateway-data-transfer-costs",
    title: "NAT Gateway Cost and Data Transfer: Diagnose the Path, Then Fix It",
    description:
      "Trace NAT gateway and cross-AZ charges back to the network path, then choose gateway endpoints, zone routing, or interface endpoints.",
    publishedAt: "2026-08-29",
    tags: ["Cloud", "AWS", "Cost"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["cloud"],
    cover: {
      src: "/images/blog/nat-gateway-data-transfer-costs-cover.webp",
      alt: "A transit map where an orange line runs from a private subnet through a NAT gateway and the internet to S3 at a per-GB fare, while a green line reaches S3 through a gateway endpoint for $0.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "kubernetes-oomkilled-causes",
    title: "Kubernetes OOMKilled Debugging: Container Limit, Node, or Heap?",
    description:
      "Tell a container limit kill, a node memory kill, and a runtime heap failure apart before you raise a Kubernetes memory limit.",
    publishedAt: "2026-09-12",
    tags: ["Kubernetes", "Reliability", "Cloud"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["cloud"],
    cover: {
      src: "/images/blog/kubernetes-oomkilled-causes-cover.webp",
      alt: "Nested outlines of a node, a 2Gi container limit and a 75% heap, with memory bursting through the container's top edge beside the exit code 137.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "n-plus-one-queries-postgres",
    title: "N+1 Query Detection in Postgres: pg_stat_statements, Not EXPLAIN",
    description:
      "Find N+1 queries in Postgres when EXPLAIN says every query is fast and the request is slow. Sort pg_stat_statements by calls, then join or batch.",
    publishedAt: "2026-08-16",
    tags: ["Postgres", "Databases", "Performance", "APIs"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "data-management"],
    cover: {
      src: "/images/blog/n-plus-one-queries-postgres-cover.webp",
      alt: "A green terminal showing one orders query followed by the same order_items query repeated down the screen, next to call counts of 1,000 and 180,000.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "offset-vs-keyset-pagination",
    title: "Offset Pagination Is Slow and Skips Rows: Switch to Keyset Pagination",
    description:
      "Why deep OFFSET pages get slow and why rows skip or repeat under writes, plus keyset pagination, cursors, indexes, and cheap totals in Postgres.",
    publishedAt: "2026-09-22",
    tags: ["Postgres", "Databases", "Performance", "APIs"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "data-management"],
    cover: {
      src: "/images/blog/offset-vs-keyset-pagination-cover.webp",
      alt: "A barcode of 980 faded lines marked OFFSET 980 ending in 20 solid lines marked LIMIT 20, with a keyset arrow jumping straight to those 20.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "postgres-migration-lock-queue",
    title: "Postgres Migration Locks the Table: lock_timeout and the Lock Queue",
    description:
      "Why a waiting ALTER TABLE stalls every query on a Postgres table, and how lock_timeout, jittered retries, and CONCURRENTLY keep migrations safe.",
    publishedAt: "2026-09-27",
    tags: ["Postgres", "Databases", "Reliability"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["data-management", "cloud", "web-development"],
    cover: {
      src: "/images/blog/postgres-migration-lock-queue-cover.webp",
      alt: "A top-down traffic lane where a report query holding ACCESS SHARE blocks an ALTER TABLE truck waiting for ACCESS EXCLUSIVE, with UPDATE, INSERT and SELECT cars stuck behind it.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "p99-tail-latency",
    title: "P99 Latency: Why the Average Looks Fine and Users Still Retry",
    description:
      "The mean looks healthy while one in a hundred requests is slow enough to trigger retries. Read the histogram, find the tail's shape, and fix it.",
    publishedAt: "2026-10-01",
    tags: ["Performance", "Reliability", "Observability", "Distributed systems"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "cloud"],
    cover: {
      src: "/images/blog/p99-tail-latency-cover.webp",
      alt: "A newspaper-style latency histogram with blue bars peaking near 70 ms and a long red tail, with rules marking p50 at 70 ms and p99 at 5 s.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "opentelemetry-metric-cardinality",
    title: "High Cardinality Metrics: When OpenTelemetry Overflow Silences Alerts",
    description:
      "OpenTelemetry cardinality overflow keeps totals right but undercounts breakdowns, so error alerts can go quiet. Learn to detect, prevent, and bound it.",
    publishedAt: "2026-09-13",
    tags: ["Observability", "Reliability", "Distributed systems"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["cloud", "data-management"],
    cover: {
      src: "/images/blog/opentelemetry-metric-cardinality-cover.webp",
      alt: "Thousands of dots spraying out from the metric http.server.requests past a limit of 2,000 series, then funnelling into one overflow bucket labelled otel.metric.overflow=true.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "llm-api-cost-token-accounting",
    title: "LLM API Cost Unexpectedly High: Find Which Calls Drive the Bill",
    description:
      "The token price did not change but your LLM bill did. Trace it by feature, call pattern, and token type, with retries and loops.",
    publishedAt: "2026-08-20",
    tags: ["LLMs", "AI", "Cost", "Observability"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["cloud", "data-management"],
    cover: {
      src: "/images/blog/llm-api-cost-token-accounting-cover.webp",
      alt: "A support-bot system prompt split into pastel token chips and repeated on every call, beside a ledger of 1,640 system tokens per call and a running cost.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "rag-retrieval-evaluation",
    title: "RAG Retrieves Irrelevant Chunks: Evaluate Retrieval Before the Prompt",
    description:
      "Your RAG answer is wrong because the right passage never reached the model. Label queries, measure recall, and fix chunking and filters.",
    publishedAt: "2026-09-16",
    tags: ["AI", "LLMs", "Data engineering", "Databases"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["data-management", "web-development"],
    cover: {
      src: "/images/blog/rag-retrieval-evaluation-cover.webp",
      alt: "Five ranked index cards on a walnut desk where only card 4, the 2025 refund policy, has a green relevant tab and the top card is the outdated 2023 policy.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "late-arriving-data-pipelines",
    title: "Late Arriving Data Pipeline: Watermarks, Lateness, and Restatement",
    description:
      "Yesterday's total changed because late events arrived. Choose a restate, reconcile, or ignore policy, then set watermarks and lookbacks.",
    publishedAt: "2026-08-15",
    tags: ["Data engineering", "Distributed systems", "Reliability"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["data-management", "cloud"],
    cover: {
      src: "/images/blog/late-arriving-data-pipelines-cover.webp",
      alt: "A hand-drawn sketch on graph paper of hourly windows and a watermark line, with three late events curving back to windows that have already closed.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "at-least-once-delivery-idempotent-consumers",
    title: "Duplicate Events and Idempotent Consumers: At-Least-Once Done Right",
    description:
      "At-least-once delivery means duplicates. Dedupe with a stable key in the same transaction, ack after commit, and guard external side effects.",
    publishedAt: "2026-09-14",
    tags: ["Distributed systems", "Reliability", "Postgres", "APIs"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "cloud", "data-management"],
    cover: {
      src: "/images/blog/at-least-once-delivery-idempotent-consumers-cover.webp",
      alt: "Two identical postage stamps for the same event on kraft paper, one postmarked processed and the other postmarked duplicate, skipped.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "read-your-writes-replica-lag",
    title: "Read Replica Stale Reads: Read-Your-Writes Routing for Postgres Lag",
    description:
      "The user saved and saw old data. Prove replica lag with a WAL timeline, classify reads, and route read-your-writes without overloading the primary.",
    publishedAt: "2026-08-11",
    tags: ["Postgres", "Databases", "Reliability", "AWS"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "data-management", "cloud"],
    cover: {
      src: "/images/blog/read-your-writes-replica-lag-cover.webp",
      alt: "A split poster: the primary shows the new address 221 Elm St while the replica still shows 18 Oak Ave with a ghosted trail, 840 ms behind.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "broken-object-level-authorization",
    title: "IDOR and Broken Object Level Authorization: A Review Guide for APIs",
    description:
      "Logged in is not allowed. Find every object id in a request, scope queries by tenant, test with two users, and stop trusting UUIDs as access control.",
    publishedAt: "2026-08-14",
    tags: ["Security", "APIs", "Postgres", "Web"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development", "data-management"],
    cover: {
      src: "/images/blog/broken-object-level-authorization-cover.webp",
      alt: "A close-up of a browser address bar reading /api/invoices/1042 with the last digit selected, captioned 1041 was yours, 1042 is not.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "debug-inp-field-data",
    title: "Debug Poor INP: Find the Slow Phase in Real User Data",
    description:
      "Lab scores look fine but taps feel late. Split INP into input delay, processing, and presentation delay, reproduce it, and verify the fix in field data.",
    publishedAt: "2026-09-04",
    tags: ["Performance", "Web", "Observability"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development"],
    cover: {
      src: "/images/blog/debug-inp-field-data-cover.webp",
      alt: "A giant mouse pointer clicking inside a ring split into input delay 240 ms, processing 160 ms and presentation delay 90 ms, 490 ms to next paint.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "nextjs-cache-stale-data",
    title: "Next.js Stale Cache Serving the Wrong User: Find the Layer",
    description:
      "Logged-in users see another account's data, or stay stale after revalidation. Map the symptom to the Next.js 16 cache layer and invalidate the right one.",
    publishedAt: "2026-09-01",
    tags: ["Next.js", "Web", "Security", "Performance"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["web-development"],
    cover: {
      src: "/images/blog/nextjs-cache-stale-data-cover.webp",
      alt: "Four photocopies of the same Hi, Maya account page handed to Sam, Priya, Leo and Ana, with Maya's name circled in red.",
      width: 2400,
      height: 1350,
    },
  },
  {
    slug: "android-app-startup-ttid-ttfd",
    title: "Android App Startup Time: Measure TTID and TTFD Before You Fix",
    description:
      "Name the startup clock first: TTID or TTFD. Measure cold starts with Macrobenchmark, then decide whether profiles or deferred work will actually help.",
    publishedAt: "2026-09-17",
    tags: ["Mobile", "Android", "Performance"],
    draft: true,
    relatedProjects: [],
    relatedServices: ["mobile-development"],
    cover: {
      src: "/images/blog/android-app-startup-ttid-ttfd-cover.webp",
      alt: "A stopwatch on Android green with two hands marking TTID at 0.64 s and TTFD at 2.1 s, with the gap between them shaded.",
      width: 2400,
      height: 1350,
    },
  },
];

const bySlug = new Map(posts.map((post) => [post.slug, post]));

export function getPost(slug: string): BlogPost | undefined {
  return bySlug.get(slug);
}

export function blogPath(slug: string) {
  return `/blog/${slug}`;
}

// Newest first.
export const publishedPosts = posts
  .filter((post) => !post.draft)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const hasPublishedPosts = publishedPosts.length > 0;

// The nav links to /blog once a post is published. Outside production it always does, so drafts
// can be reviewed through the nav; listedPosts() shows them on the index there too.
export const showBlogNav = hasPublishedPosts || process.env.NODE_ENV !== "production";

// What the index and "Keep reading" show: published posts in production, plus
// drafts everywhere else so they can be reviewed locally.
export function listedPosts() {
  return process.env.NODE_ENV === "production"
    ? publishedPosts
    : [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function formatPostDate(iso: string) {
  // Parse as UTC so the rendered day matches the ISO date in every time zone.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
