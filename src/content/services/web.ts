import type { ServicePageContent } from "@/types/content";

export const webService: ServicePageContent = {
  slug: "web-development",
  label: "Web",
  metaTitle: "Web development",
  metaDescription:
    "Next.js product sites with a headless CMS, technical SEO, and edge delivery. First-person work by Azeem Subhani.",
  kicker: "Services / web",
  titleLines: ["sites that load fast", "and rank well"],
  lede:
    "I build Next.js product sites on a headless CMS. Search engines get server-rendered HTML, editors change copy without a deploy, and pages are served from the edge. Track Hero's five booking venues run this way.",
  proof: [
    { value: "95+", label: "Lighthouse scores I ship to" },
    { value: "5", label: "white-label booking sites live" },
    { value: "<100ms", label: "edge response, worldwide" },
  ],
  sections: [
    {
      kind: "capabilities",
      title: "Product sites, not themes",
      copy: "Every site is a Next.js app written for the business. Brand, layout, and interactions live in code; content lives in a CMS editors can actually use.",
      items: [
        {
          title: "Next.js and React",
          copy: "Server-rendered pages with the booking flow, forms, and interactions built in, not a marketing theme with a product bolted on later.",
        },
        {
          title: "Custom design in code",
          copy: "Brand, type, and layout written as components. Nothing to paint over, nothing that breaks when the theme updates.",
        },
        {
          title: "SEO from the first commit",
          copy: "Sitemaps, canonicals, robots, and Schema.org ship with the routes. Ranking is a build concern, not a plugin you install after launch.",
        },
        {
          title: "Headless CMS",
          copy: "Contentful, Payload, or Prismic. Editors change copy, sessions, and prices without opening a pull request. The frontend stays a Next.js app.",
        },
        {
          title: "Edge delivery",
          copy: "Hosted on Vercel or Netlify and rendered at the edge, so a visitor in Lahore and a visitor in New York get the same sub-100ms response.",
        },
        {
          title: "Security without plugins",
          copy: "HTTPS, locked-down previews, and no public PHP admin to patch. DDoS handling lives with the host, not in a plugin folder.",
        },
      ],
    },
    {
      kind: "compare",
      title: "From WordPress to headless",
      copy: "If the current site is a PHP monolith, I rebuild it as a Next.js frontend with the CMS behind authentication. The old admin goes away; editors get a faster one.",
      left: { title: "WordPress", subtitle: "The public PHP app" },
      right: { title: "Headless", subtitle: "Next.js plus Contentful, Payload, or Prismic" },
      rows: [
        {
          label: "Security",
          left: "A public database and a plugin list that needs weekly patches. SQL injection still shows up.",
          right: "No public database. Static or server-rendered files on a CDN, preview behind login.",
        },
        {
          label: "Page load",
          left: "MySQL on every request, while the theme and the cache plugin fight each other.",
          right: "Pre-rendered HTML from the edge. The sites I ship land in the 95–100 Lighthouse range.",
        },
        {
          label: "Upkeep",
          left: "Plugin updates, PHP errors, and a host that must stay up just so the admin works.",
          right: "The CMS is a managed service. I touch the app when the product needs a change.",
        },
        {
          label: "Design",
          left: "Tied to themes and PHP templates, so custom work fights the template hierarchy.",
          right: "The frontend is Next.js and CSS. Nothing in the CMS dictates the page grid.",
        },
        {
          label: "Traffic",
          left: "Peaks take the database down unless you pay for a heavy host.",
          right: "Static and server-rendered pages scale on the edge. The CMS is never in the request path.",
        },
      ],
    },
    {
      kind: "process",
      title: "A prototype you can click, not a deck",
      copy: "I design in the repo, not in slides. Within days you get a working Next.js prototype on real URLs. You click it, we keep what works, and the prototype grows into production.",
      left: {
        title: "The usual agency path",
        copy: "Design-first: a Figma file becomes the contract, then someone rebuilds it in code.",
        steps: [
          "Brief, then a round of static frames",
          "Review, revise, another round",
          "Handoff to engineering",
          "Build it, then discover the interaction was wrong",
        ],
      },
      right: {
        title: "How I run it",
        copy: "A clickable Next.js prototype from day two. Variations live as routes you visit, not slides you scroll.",
        steps: [
          "Write the screen in code",
          "Two or three directions on real devices",
          "You use it and we cut what doesn't work",
          "The prototype becomes production",
        ],
      },
      outcomes: [
        {
          title: "Live in 3–4 weeks, not 8–12",
          copy: "First users see a working site within a month. Feedback comes from use, not a slide deck.",
        },
        {
          title: "3–5 directions in parallel",
          copy: "Same time budget as one design pass. You pick the version that feels like the product.",
        },
        {
          title: "What you click is what ships",
          copy: "Hover, type, resize, hit the back button. The prototype is already the real thing.",
        },
      ],
    },
    {
      kind: "features",
      title: "SEO and performance, built in together",
      copy: "A beautiful site search can't parse is just a brochure. I build the crawl path alongside the routes, and treat speed as a launch requirement.",
      items: [
        {
          title: "Technical SEO in the app",
          copy: "Generated sitemaps, robots.txt, canonical tags, and Schema.org on every page that should rank.",
        },
        {
          title: "Server-rendered HTML",
          copy: "Crawlers get content without running a JavaScript bundle. JS powers the product, not the paragraph.",
        },
        {
          title: "Core Web Vitals as launch criteria",
          copy: "LCP, CLS, and INP measured before sign-off, never a performance ticket filed after design is done.",
        },
        {
          title: "Analytics you can act on",
          copy: "Search Console plus the few events that change the next sprint. No wall of vanity charts.",
        },
      ],
    },
  ],
  ctaTitle: "Is your current site the bottleneck?",
  ctaCopy:
    "Slow, stuck on WordPress, or invisible to search? Tell me what it has to do and who has to edit it, and I'll tell you the fastest path to a site that ranks and converts.",
};
