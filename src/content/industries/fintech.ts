import type { IndustryPageContent } from "@/types/content";

/*
 * Every figure and platform here is already published elsewhere on the site
 * (projects.ts, services/cloud.ts, services/data.ts, experience.ts). Do not add
 * customers, benchmarks, or certifications that those sources do not state.
 */
export const fintechIndustry: IndustryPageContent = {
  slug: "fintech",
  label: "Fintech",
  evidence: "shipped",
  tone: "green",
  heroVisual: "ledger",
  layout: {
    hero: "split",
    challenges: "cards",
    solutions: "stacked",
    stack: "grid",
    practices: "grid",
  },
  metaTitle: "Fintech engineering: payments, portals, and regulated platforms",
  metaDescription:
    "Stripe and Stripe Connect payment flows, authenticated payment portals on AWS, and regulated platforms on Azure, built and run by one engineer.",
  kicker: "Fintech",
  title: "money that moves,",
  titleAccent: "records that match",
  lede: "Payment flows, wallets, and regulated platforms where the charge, the ledger, and the audit trail agree. Built by the engineer who also runs them in production.",
  proof: [
    { value: "500+", label: "authenticated payments a day" },
    { value: "3M+", label: "active users on a financial platform" },
    { value: "5", label: "venues on one payments engine" },
    { value: "−35%", label: "infrastructure cost after migration" },
  ],
  challengesTitle: "Where fintech builds go wrong",
  challengesIntro:
    "Moving money is the easy part. The work is everything around the charge that has to stay correct afterward.",
  challenges: [
    {
      icon: "refresh",
      title: "The charge and the record drift apart",
      copy: "Stripe, the app database, and the CRM each hold a copy of the same payment. When they disagree, support finds out before engineering does.",
    },
    {
      icon: "key",
      title: "Sessions expire at checkout",
      copy: "A token that lapses between the cart and the charge turns into a failed payment and a customer who does not come back.",
    },
    {
      icon: "landmark",
      title: "New platforms beside old identity",
      copy: "Regulated businesses rarely get to replace the directory they already run. The new system has to live next to it until cutover.",
    },
    {
      icon: "database",
      title: "Reporting competes with checkout",
      copy: "A finance query on the live store slows the payment path. Analytics needs its own copy, so a dashboard cannot block a transaction.",
    },
  ],
  solutionsTitle: "Solutions that shipped",
  solutionsIntro:
    "Three kinds of financial work I have shipped and kept running, each tied to the project it came from.",
  solutions: [
    {
      icon: "card",
      title: "Payment engines and marketplaces",
      copy: "Stripe for direct sales, Stripe Connect when money moves between users on the platform. One engine can serve several branded storefronts.",
      features: [
        "Stored cards on the processor",
        "Gift certificates, credits, promo codes",
        "Connect invoicing and transfers",
        "Subscriptions and recurring billing",
        "Wallet modules",
        "Typed API clients with token refresh",
      ],
      link: { kind: "shipped", label: "Track Booking Platform and Sports Team App", href: "/projects/track-booking" },
    },
    {
      icon: "lock",
      title: "Authenticated payment portals",
      copy: "Customers sign in, see what they owe, and pay. Staff hear about it without anyone forwarding an email.",
      features: [
        "Cognito sign-in",
        "AppSync GraphQL API",
        "Lambda payment workflows",
        "DynamoDB records",
        "Trust Commerce processing",
        "Automated staff notifications",
      ],
      link: { kind: "shipped", label: "Memorial planning portal", href: "/projects/memorial-planning" },
    },
    {
      icon: "landmark",
      title: "Regulated platforms on Azure",
      copy: "Hybrid builds that sit beside an on-premise directory, keep sensitive columns encrypted, and route every call through one gateway.",
      features: [
        "Azure SQL with Always Encrypted",
        "Azure AD alongside on-prem AD",
        "API Management policies and throttles",
        "Key Vault for secrets",
        "App Service hosting",
        "Staged cutover plan",
      ],
      link: { kind: "shipped", label: "Financial services case study", href: "/services/cloud" },
    },
  ],
  stackIntro:
    "The tools behind the projects above. Chosen per product, not carried from one build to the next out of habit.",
  stack: [
    {
      title: "Payments",
      items: ["Stripe", "Stripe Connect", "Trust Commerce"],
    },
    {
      title: "Backend & APIs",
      items: ["Node.js", "NestJS", "Django", "GraphQL", "AppSync", "PostgreSQL"],
    },
    {
      title: "Identity & secrets",
      items: ["Cognito", "Azure AD", "JWT", "Key Vault", "API Management"],
    },
    {
      title: "Infrastructure",
      items: ["AWS Lambda", "DynamoDB", "AWS SAM", "Azure App Service", "CloudWatch", "GitHub Actions"],
    },
  ],
  practicesTitle: "Built in, not bolted on",
  practicesIntro:
    "Controls built into the system from the first sprint, so a security review reads the code instead of a remediation plan.",
  practices: [
    {
      icon: "card",
      title: "Card numbers stay with the processor",
      copy: "Stored cards are processor references. The app database never holds a card number.",
      supports: "Helps keep PCI DSS scope small",
    },
    {
      icon: "lock",
      title: "Encrypted where it is stored",
      copy: "Sensitive columns use Always Encrypted. The database can store what it cannot read.",
      supports: "Supports data-protection reviews",
    },
    {
      icon: "key",
      title: "Secrets out of the repo",
      copy: "Keys and connection strings live in Key Vault or the cloud's secret store, never in config files.",
      supports: "Supports SOC 2 access controls",
    },
    {
      icon: "fingerprint",
      title: "One identity provider",
      copy: "Cognito or Azure AD owns sign-in, so there is one place to enforce MFA and revoke access.",
      supports: "Supports access reviews",
    },
    {
      icon: "scroll",
      title: "Least privilege and an audit trail",
      copy: "Scoped roles per service and a log of who touched what, the evidence reviewers ask for.",
      supports: "Supports SOC 2 and GDPR audits",
    },
    {
      icon: "waypoints",
      title: "One gateway for every call",
      copy: "Throttles and policies live at the API gateway, not copied into each service.",
      supports: "Supports consistent enforcement",
    },
  ],
  practicesNote:
    "These are engineering practices, not certifications. PCI DSS, SOC 2, and similar attestations come from your auditor; the system is built so that review goes faster.",
  ctaTitle: "Building something that moves money?",
  ctaCopy:
    "Tell me what the product charges for and where the money goes. I will come back with how I would build the payment path and what it would take to run it.",
};
