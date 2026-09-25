import type { ServicePageContent } from "@/types/content";

export const cloudService: ServicePageContent = {
  slug: "cloud",
  label: "Cloud",
  metaTitle: "Cloud infrastructure",
  metaDescription:
    "AWS, Azure, and GCP production systems. Serverless SAM stacks, cost cuts, and traced request paths. Work by Azeem Subhani.",
  kicker: "Services / cloud",
  titleLines: ["cloud that", "ships as one stack"],
  lede:
    "AWS, Azure, and GCP. Fifty-plus production apps, one deploy, traced hops. Built to ship, not sit idle.",
  proof: [
    { value: "50+", label: "Production apps" },
    { value: "40%", label: "Average infrastructure cost cut" },
    { value: "99.95%", label: "Uptime on the stacks I run" },
  ],
  sections: [
    {
      kind: "capabilities",
      title: "Cloud I will actually operate",
      copy: "Multi-cloud when the product needs it. AWS when a SAM stack is the whole backend. Cost and traces are part of the deploy, not a later audit.",
      items: [
        {
          title: "AWS, Azure, and GCP",
          copy: "I pick the platform the workload fits. Auth, data, and compute stay one system, even when the logos differ.",
        },
        {
          title: "Controls that survive an audit",
          copy: "Encryption, identity, and alerting on the accounts I run. Not a PDF of best practices left in a folder.",
        },
        {
          title: "Cost as a design input",
          copy: "Autoscaling and right-size so the bill drops. 40% is the average I have taken off idle or oversized stacks.",
        },
      ],
    },
    {
      kind: "case",
      kicker: "AWS",
      title: "E-commerce platform migration",
      entry: "Shopper traffic",
      client: "Enterprise e-commerce, name withheld",
      challenge:
        "On-premise hardware could not take 10x traffic during sales. Checkouts failed when the catalog spiked. The team needed a path that scaled without buying more racks.",
      solution:
        "I moved the storefront to containerized services on ECS behind an Application Load Balancer. RDS held the catalog and orders. ElastiCache took the hot reads. S3 and CloudFront served the media. Autoscaling followed the sale, not a capacity spreadsheet.",
      results: [
        { value: "40%", label: "infrastructure cost" },
        { value: "5x", label: "faster peak handling" },
        { value: "99.9%", label: "uptime after cutover" },
      ],
      path: [
        {
          name: "CloudFront",
          copy: "Media and HTML at the edge. A sale does not hit origin for every image.",
        },
        {
          name: "ALB",
          parent: "CloudFront",
          copy: "Spreads checkout across healthy ECS tasks. Unhealthy ones drop out of the pool.",
        },
        {
          name: "ECS",
          parent: "ALB",
          copy: "Containerized storefront. Tasks scale with the sale, not a rack order.",
        },
        {
          name: "ElastiCache",
          parent: "ECS",
          copy: "Hot reads so the catalog page does not query RDS on every hit.",
        },
        {
          name: "RDS",
          parent: "ECS",
          copy: "Catalog and orders. The source of truth for a cart.",
        },
        {
          name: "S3",
          parent: "CloudFront",
          copy: "Product media. CloudFront reads from here, not the app.",
        },
      ],
    },
    {
      kind: "case",
      kicker: "Azure",
      title: "Financial services platform",
      entry: "Customer traffic",
      client: "Financial institution, name withheld",
      challenge:
        "Three million active users, regulated data, and an on-premise Active Directory the business could not abandon. The new platform had to sit next to that directory, not replace it on day one.",
      solution:
        "Hybrid Azure: App Service for the apps, Azure SQL with Always Encrypted for the records, Azure AD for identity, API Management as the gateway, Key Vault for secrets. The on-prem directory stayed the source of truth until the cutover was done.",
      results: [
        { value: "−35%", label: "infrastructure cost" },
        { value: "3M+", label: "active users on the platform" },
        { value: "A+", label: "security posture after review" },
      ],
      path: [
        {
          name: "App Service",
          parent: "API Management",
          copy: "The apps sit here, next to the identity the bank already runs.",
        },
        {
          name: "Azure SQL",
          parent: "App Service",
          copy: "Records with Always Encrypted. The database can store what it cannot read.",
        },
        {
          name: "Azure AD",
          parent: "App Service",
          copy: "Identity. The on-prem directory stays the source until cutover is done.",
        },
        {
          name: "API Management",
          copy: "The gateway. Policies and throttles live here, not in each app.",
        },
        {
          name: "Key Vault",
          parent: "App Service",
          copy: "Secrets out of config files and out of the repo.",
        },
      ],
    },
    {
      kind: "case",
      kicker: "GCP",
      title: "AI analytics platform",
      entry: "Raw events",
      client: "SaaS analytics company, name withheld",
      challenge:
        "The product had to score live data and return model output the same day. Batch warehouses were too slow. The volume was already past a single Postgres box.",
      solution:
        "BigQuery as the warehouse, Data Fusion for the pipelines, Cloud Storage as the lake, Looker for the boards, Vertex AI for the models. Queries hit columnar storage. The app never scanned the lake on a user request.",
      results: [
        { value: "1M+", label: "data points processed a day" },
        { value: "84%", label: "faster insight time" },
        { value: "10x", label: "query speed vs the old store" },
      ],
      path: [
        {
          name: "Cloud Storage",
          copy: "The lake. Raw events land here before a model sees them.",
        },
        {
          name: "Data Fusion",
          parent: "Cloud Storage",
          copy: "Pipelines from lake to warehouse. No weekend of cron on a box.",
        },
        {
          name: "BigQuery",
          parent: "Data Fusion",
          copy: "Columnar warehouse. The app never scans the lake on a user request.",
        },
        {
          name: "Looker",
          parent: "BigQuery",
          copy: "Boards on warehouse SQL, not on the product database.",
        },
        {
          name: "Vertex AI",
          parent: "BigQuery",
          copy: "Models trained on the warehouse copy. Scoring does not touch checkout.",
        },
      ],
    },
    {
      kind: "platforms",
      title: "Infrastructure as code",
      copy: "The stack is a repo. Reviewers read a pull request, not a console click. 99.9% of deploys land the same way in staging and production.",
      items: [
        {
          title: "Terraform",
          meta: "Multi-cloud",
          copy: "Shared modules for the accounts that span AWS, Azure, and GCP. State is remote. Drift shows up in CI.",
        },
        {
          title: "SAM and Serverless Framework",
          meta: "TypeScript",
          copy: "Lambda, APIs, and tables declared next to the code. The memorial portal ships this way.",
        },
      ],
    },
    {
      kind: "features",
      title: "Serverless when the work is bursty",
      copy: "If the box sits idle 20 hours a day, it should not exist. Event-driven functions scale with the write path.",
      items: [
        {
          title: "No servers to patch",
          copy: "Compute is the function. Scaling and the runtime are the platform's job.",
        },
        {
          title: "Pay for the invocation",
          copy: "Idle costs drop to storage and a few always-on bits. The 40% cuts usually start here.",
        },
        {
          title: "Autoscaling without a meeting",
          copy: "A sale, a roster sync, a payment spike. Concurrency follows the queue.",
        },
        {
          title: "Events, not cron on a box",
          copy: "S3, queues, and webhooks wake the function. Cold starts stay in the milliseconds I measure.",
        },
      ],
    },
    {
      kind: "coverage",
      title: "When a full cloud is too much",
      copy: "Not every product needs a three-cloud diagram. Some just need a host that matches the app.",
      groups: [
        {
          title: "A box and a PaaS",
          copy: "SSH when the team wants a machine they can touch. A platform when they should not grow an ops roster yet.",
          items: ["DigitalOcean", "Heroku", "Render"],
        },
        {
          title: "Edge and media",
          copy: "Next.js at the edge, plus transforms so the origin never resizes a 12MB upload.",
          items: ["Vercel", "Netlify", "Cloudinary"],
        },
        {
          title: "App backends",
          copy: "Auth, a store, and live sync when the mobile client is the product and RDS is the wrong size.",
          items: ["Firebase", "Supabase"],
        },
      ],
    },
  ],
  ctaTitle: "Let's build your cloud infrastructure.",
  ctaCopy:
    "Tell me what runs today, where it falls over, and what a cheaper, traced stack would unblock.",
};
