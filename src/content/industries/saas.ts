import type { IndustryPageContent } from "@/types/content";

/*
 * Sources: experience.ts (SaaS delivery at Cinnova), projects.ts (Track Booking Platform white-label,
 * Sports Team App), services/cloud.ts (SaaS analytics case). Do not add figures they do not state.
 */
export const saasIndustry: IndustryPageContent = {
  slug: "saas",
  label: "SaaS",
  evidence: "shipped",
  tone: "cyan",
  heroVisual: "tenants",
  layout: {
    hero: "split-reverse",
    challenges: "list",
    solutions: "tabs",
    stack: "grid",
    practices: "checklist",
  },
  metaTitle: "SaaS engineering: multi-tenant platforms, billing, and analytics",
  metaDescription:
    "White-label and multi-tenant platforms, Stripe subscriptions, and analytics that keep up with the data, from an engineer who has led SaaS delivery end to end.",
  kicker: "SaaS",
  title: "one platform,",
  titleAccent: "every tenant",
  lede: "Multi-tenant products where each customer gets their own brand, data, and plan, and the team still ships one codebase. Billing, analytics, and releases included.",
  proof: [
    { value: "5", label: "white-label tenants on one platform" },
    { value: "−40%", label: "average response time" },
    { value: "−70%", label: "deployment time" },
    { value: "99.95%", label: "uptime on the AWS stacks I run" },
  ],
  challengesTitle: "Where SaaS products stall",
  challengesIntro:
    "The first ten customers are a product problem. The next hundred are a platform problem.",
  challenges: [
    {
      icon: "split",
      title: "A fork for every big customer",
      copy: "Custom branding and settings end up as copies of the codebase, and every fix has to land five times.",
    },
    {
      icon: "card",
      title: "Billing drifts from the plan",
      copy: "Seats, upgrades, and invoices live in different places, so the plan a customer has and the plan they pay for disagree.",
    },
    {
      icon: "gauge",
      title: "Dashboards slow down as data grows",
      copy: "Analytics runs against the product database until the reports and the app start waiting on each other.",
    },
    {
      icon: "refresh",
      title: "Releases the team is afraid of",
      copy: "Manual deploys mean fewer releases, bigger batches, and more of them rolled back.",
    },
  ],
  solutionsTitle: "Four parts of a SaaS platform",
  solutionsIntro:
    "Pick a tab. Each one is work that has run in production, tied to where it ran.",
  solutions: [
    {
      icon: "layers",
      title: "White-label and multi-tenant",
      copy: "One engine, many branded tenants. Configuration decides the brand, the domain, and the features, not a fork.",
      features: [
        "Per-tenant branding and domains",
        "Shared reservation and payments engine",
        "Tenant-scoped data access",
        "Feature flags per tenant",
        "One codebase, one release",
        "Operator back office",
      ],
      link: { kind: "shipped", label: "Track Booking Platform", href: "/projects/track-booking" },
    },
    {
      icon: "card",
      title: "Subscriptions and billing",
      copy: "Plans, seats, and invoices on Stripe, with webhooks keeping the product and the bill in step.",
      features: [
        "Stripe subscriptions",
        "Stripe Connect for marketplaces",
        "In-app invoicing",
        "Webhook-driven plan changes",
        "Wallet modules",
        "Billing notifications",
      ],
      link: { kind: "shipped", label: "Sports Team App", href: "/projects/sports-team-app" },
    },
    {
      icon: "gauge",
      title: "Analytics that keeps up",
      copy: "A warehouse beside the product, so reports and models never compete with the app for the same database.",
      features: [
        "BigQuery warehouse",
        "Data Fusion pipelines",
        "Looker dashboards",
        "Vertex AI models",
        "1M+ data points a day",
        "10x faster queries than the old store",
      ],
      link: { kind: "shipped", label: "SaaS analytics case study", href: "/services/cloud" },
    },
    {
      icon: "zap",
      title: "Fast, typed product surfaces",
      copy: "Typed GraphQL APIs and TanStack-powered front ends that load fast and stay predictable as the product grows.",
      features: [
        "NestJS GraphQL services",
        "TanStack Router and Query",
        "Tuned PostgreSQL access patterns",
        "Typed API clients",
        "GitHub Actions CI/CD",
        "Preview deploys per pull request",
      ],
      link: { kind: "related", label: "Web development service", href: "/services/web-development" },
    },
  ],
  stackIntro: "The stack behind the tenants, the bills, and the dashboards.",
  stack: [
    { title: "Front end", items: ["React", "Next.js", "Angular", "TanStack Query", "TanStack Router"] },
    { title: "API & data", items: ["NestJS", "GraphQL", "Node.js", "PostgreSQL", "BigQuery"] },
    { title: "Billing & identity", items: ["Stripe", "Stripe Connect", "Cognito", "JWT"] },
    { title: "Platform", items: ["AWS", "GitHub Actions", "CloudWatch", "Looker"] },
  ],
  practicesKicker: "Platform hygiene",
  practicesTitle: "Tenants stay separate, releases stay boring",
  practicesIntro:
    "The controls that let one codebase serve many customers without one customer seeing another.",
  practices: [
    {
      icon: "layers",
      title: "Tenant scope on every query",
      copy: "Data access is scoped by tenant at the API layer, so a missing filter is a failing test, not a leak.",
      supports: "Supports SOC 2 confidentiality",
    },
    {
      icon: "fingerprint",
      title: "One identity provider",
      copy: "Sign-in, MFA, and revocation live in one place instead of per-tenant user tables.",
      supports: "Supports access reviews",
    },
    {
      icon: "key",
      title: "Secrets out of the repo",
      copy: "Keys live in the cloud's secret store, scoped per environment.",
      supports: "Supports SOC 2 access controls",
    },
    {
      icon: "scroll",
      title: "Least privilege per service",
      copy: "Each service gets the permissions it needs and nothing else, with changes logged.",
      supports: "Supports SOC 2 and GDPR audits",
    },
    {
      icon: "refresh",
      title: "CI gates before release",
      copy: "Tests, types, and lint run on every push; production deploys only from a passing build.",
      supports: "Supports change-management controls",
    },
    {
      icon: "bell",
      title: "Monitoring and alerting",
      copy: "Dashboards and alerts are part of the first deploy, not a ticket after the first outage.",
      supports: "Supports availability commitments",
    },
  ],
  practicesNote:
    "These are engineering practices, not certifications. SOC 2 reports come from your auditor; the platform is built so the evidence is already there.",
  ctaTitle: "Building the platform, not just the product?",
  ctaCopy:
    "Tell me how many customers you have now and how many you expect. I will come back with where the platform bends first and what I would build before it does.",
};
