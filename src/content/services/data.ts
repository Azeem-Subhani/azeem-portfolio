import type { ServicePageContent } from "@/types/content";

export const dataService: ServicePageContent = {
  slug: "data-management",
  label: "Data",
  metaTitle: "Data management",
  metaDescription:
    "Postgres, DynamoDB, Firestore, CDC, and warehouses built so one record stays true across every system. Work by Azeem Subhani.",
  kicker: "Services / data",
  titleLines: ["one record,", "every system"],
  lede:
    "Postgres owns the row. DynamoDB and Firestore take the live writes. Stripe writes to that same store, so a payment can never drift from its record. The warehouse gets its own copy, so a finance query never competes with checkout.",
  proof: [
    { value: "500+", label: "authenticated payments a day" },
    { value: "10×", label: "faster queries after a rebuild" },
    { value: "<100ms", label: "CDC lag I design to" },
  ],
  sections: [
    {
      kind: "capabilities",
      title: "The work I actually do",
      copy: "Ingestion, the live product store, and the analytical copy are three different jobs. Keeping them apart is what stops a dashboard from taking down payments.",
      items: [
        {
          title: "ETL and ELT",
          copy: "Cron for the nightly load, events for what can't wait. Retries are idempotent, so a failed batch never double-writes, and it fails loudly with a log you can read at 2am.",
        },
        {
          title: "Migration without a weekend outage",
          copy: "Legacy to warehouse, or Postgres to a partitioned store. Dual-write, validate, then cut over. The old system stays up until the numbers match.",
        },
        {
          title: "Real-time sync",
          copy: "Change data capture, so inserts, updates, and deletes land in the next system in under 100ms on a local path.",
        },
        {
          title: "Warehouses",
          copy: "Snowflake, BigQuery, or Redshift for the analytical copy. The product database never doubles as the BI backend.",
        },
        {
          title: "Governance",
          copy: "Quality checks, least-privilege access, and the audit trail GDPR, HIPAA, and SOC 2 reviewers actually ask for.",
        },
        {
          title: "Query cost and latency",
          copy: "Indexes, caching, and warehouse layout that have cut query time by roughly 10× on the jobs I've rebuilt.",
        },
      ],
    },
    {
      kind: "steps",
      title: "Migration with zero downtime",
      copy: "The business keeps writing while the data moves. I copy, catch up, prove the totals, then switch readers. Rollback stays wired until the new store has earned trust.",
      items: [
        {
          title: "Map the current system",
          copy: "Volume, keys, the jobs already touching those tables, and the reports nobody documented.",
        },
        {
          title: "Design the target",
          copy: "Schema, partition keys, and the transforms that make the new model honest.",
        },
        {
          title: "Pilot on a slice",
          copy: "A subset with checksums and a timing run before the full copy starts.",
        },
        {
          title: "Full copy with dual-write",
          copy: "Catch-up CDC runs while the old system still takes live traffic.",
        },
        {
          title: "Validate, then cut over",
          copy: "Row counts, money totals, and a few real business queries. Readers move first, writers follow, and the old store stays until we're sure.",
        },
      ],
    },
    {
      kind: "platforms",
      title: "Where the analytical copy lives",
      copy: "Columnar storage and elastic compute. BI and models run here; checkout doesn't. Separating the two is what keeps a dashboard from blocking a payment.",
      items: [
        {
          title: "Snowflake",
          copy: "Separate compute per workload, so the finance board never queues behind a training job.",
        },
        {
          title: "BigQuery",
          copy: "Serverless warehouse on GCP. The analytics platform case on the cloud page runs here.",
        },
        {
          title: "Redshift",
          copy: "The right call when the rest of the estate is already AWS and the team wants SQL they know.",
        },
      ],
    },
    {
      kind: "platforms",
      title: "Sources I already connect",
      copy: "Databases, APIs, SaaS tools, and object stores. Those connectors exist in the pipeline catalog today. I'm not promising to invent a new one for free.",
      items: [
        {
          title: "OLTP",
          meta: "CDC",
          copy: "Postgres, MySQL, SQL Server, DynamoDB, and Firestore.",
        },
        {
          title: "SaaS",
          meta: "Webhook",
          copy: "Stripe, Trust Commerce, and the CRMs and billing tools already in your account.",
        },
        {
          title: "Files",
          meta: "Batch",
          copy: "S3, GCS, and the CSVs operations still emails around on a Friday.",
        },
        {
          title: "Streams",
          meta: "Realtime",
          copy: "Kafka, Kinesis, and product events when the source is already a stream.",
        },
      ],
    },
  ],
  ctaTitle: "When the record and the report disagree",
  ctaCopy:
    "Tell me which system owns the row today. I'll tell you what has to sync, what has to move, and what should never share a database.",
};
