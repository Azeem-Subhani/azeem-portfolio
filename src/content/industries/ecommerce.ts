import type { IndustryPageContent } from "@/types/content";

/*
 * Sources: services/cloud.ts (e-commerce migration case), projects.ts (Track Booking Platform,
 * Woody Shop), services/web.ts (headless Next.js). Do not add figures they do not state.
 */
export const ecommerceIndustry: IndustryPageContent = {
  slug: "ecommerce",
  label: "E-commerce",
  evidence: "shipped",
  tone: "yellow",
  heroVisual: "checkout",
  layout: {
    hero: "split",
    challenges: "columns",
    solutions: "alternating",
    stack: "rows",
    practices: "checklist",
  },
  metaTitle: "E-commerce engineering: storefronts that hold up on sale day",
  metaDescription:
    "Containerized storefronts on AWS, headless Next.js commerce, and Stripe carts and promotions, built by the engineer who migrated an enterprise store off racks.",
  kicker: "E-commerce",
  title: "storefronts that sell,",
  titleAccent: "even on sale day",
  lede: "Catalogs, carts, and checkouts that scale with the traffic instead of a capacity spreadsheet. Built so the busiest hour of the year is the one that works best.",
  proof: [
    { value: "5x", label: "faster peak handling after migration" },
    { value: "99.9%", label: "uptime after cutover" },
    { value: "−40%", label: "infrastructure cost" },
    { value: "5", label: "branded booking sites on one engine" },
  ],
  challengesTitle: "What breaks when the sale starts",
  challengesIntro:
    "Most stores work fine on a quiet Tuesday. The problems show up at 10x traffic, which is exactly when the revenue is.",
  challenges: [
    {
      icon: "zap",
      title: "Checkout fails at peak",
      copy: "Fixed hardware cannot absorb a sale. Carts time out right when the most people are trying to pay.",
    },
    {
      icon: "database",
      title: "Catalog reads crowd out orders",
      copy: "Every product page hits the same database the orders write to, so browsing slows buying.",
    },
    {
      icon: "store",
      title: "Every copy change needs a developer",
      copy: "Merchandisers wait on a deploy to change a banner, a price, or a landing page.",
    },
    {
      icon: "cart",
      title: "Carts that forget",
      copy: "A refresh or a second device empties the cart, and the shopper does not rebuild it.",
    },
  ],
  solutionsTitle: "What I have built for stores",
  solutionsIntro:
    "Three pieces of commerce work, from the infrastructure under the store to the cart on top of it.",
  solutions: [
    {
      icon: "zap",
      title: "Storefronts that scale with the sale",
      copy: "Containerized services behind a load balancer, with media at the edge and hot reads in a cache. Autoscaling follows the traffic, not a rack order.",
      features: [
        "ECS services behind an ALB",
        "CloudFront and S3 for media",
        "ElastiCache in front of the catalog",
        "RDS for catalog and orders",
        "Autoscaling on real load",
        "Staged cutover from on-premise",
      ],
      link: { kind: "shipped", label: "E-commerce migration case study", href: "/services/cloud" },
    },
    {
      icon: "store",
      title: "Headless storefronts on Next.js",
      copy: "Server-rendered product pages search engines can read, with content in a CMS editors use without opening a pull request.",
      features: [
        "Next.js server rendering",
        "Contentful, Payload, or Prismic",
        "Editor previews before publish",
        "Structured data for products",
        "Image optimization at the edge",
        "Lighthouse budgets of 95+",
      ],
      link: { kind: "related", label: "Web development service", href: "/services/web-development" },
    },
    {
      icon: "card",
      title: "Carts, checkout, and promotions",
      copy: "Persisted carts, Stripe checkout, and the promotion rules marketing actually asks for, on one payments engine.",
      features: [
        "Carts that survive a reload",
        "Stripe checkout and stored cards",
        "Gift certificates and credits",
        "Promo codes",
        "Several branded storefronts, one engine",
        "Order notifications",
      ],
      link: { kind: "shipped", label: "Track Booking Platform", href: "/projects/track-booking" },
    },
  ],
  stackIntro: "What the store runs on, from the page a shopper sees to the database the order lands in.",
  stack: [
    { title: "Storefront", items: ["Next.js", "React", "Redux", "Contentful", "Payload", "Prismic"] },
    { title: "Payments", items: ["Stripe", "Stripe Connect"] },
    { title: "Infrastructure", items: ["ECS", "ALB", "CloudFront", "S3", "ElastiCache", "RDS"] },
    { title: "Delivery", items: ["GitHub Actions", "CloudWatch", "Docker", "Terraform"] },
  ],
  practicesKicker: "Ready for peak",
  practicesTitle: "Built for the busiest hour",
  practicesIntro:
    "The checks that make a sale day boring: security for the card path, and capacity for everyone else.",
  practices: [
    {
      icon: "card",
      title: "Card data stays with the processor",
      copy: "Checkout uses the processor's hosted fields and stored-card references. Card numbers never reach the store's database.",
      supports: "Helps keep PCI DSS scope small",
    },
    {
      icon: "globe",
      title: "Media at the edge",
      copy: "Images and static HTML come from the CDN, so a spike does not hit origin for every product photo.",
      supports: "Protects origin during spikes",
    },
    {
      icon: "gauge",
      title: "Autoscaling on real load",
      copy: "Services scale on request and CPU signals, with health checks that pull a bad task out of rotation.",
      supports: "Keeps checkout available",
    },
    {
      icon: "database",
      title: "Reads cached, writes protected",
      copy: "The catalog is served from cache; orders keep the database to themselves.",
      supports: "Keeps order writes fast",
    },
    {
      icon: "key",
      title: "Secrets out of the repo",
      copy: "Payment keys and connection strings live in the cloud's secret store, rotated without a redeploy.",
      supports: "Supports access reviews",
    },
    {
      icon: "refresh",
      title: "Preview deploys for every change",
      copy: "Every pull request gets its own preview, so a promo page is checked before it goes live.",
      supports: "Fewer surprises at launch",
    },
  ],
  practicesNote:
    "PCI DSS validation is done by the merchant with their processor or assessor. The build is set up so that scope stays as small as possible.",
  ctaTitle: "Got a sale coming up?",
  ctaCopy:
    "Tell me what the store runs on and where it struggles at peak. I will come back with what I would change first and what it would cost to run.",
};
