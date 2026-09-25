export const primaryNav = [
  { href: "/projects", label: "Portfolio" },
  { href: "/why-me", label: "Why me" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
] as const;

export const serviceNav = [
  {
    href: "/services/cloud",
    label: "Cloud",
    title: "Cloud services",
    copy: "AWS, Azure, GCP. SAM stacks, traced hops.",
    tone: "cloud",
  },
  {
    href: "/services/web-development",
    label: "Web",
    title: "Web development",
    copy: "Next.js product sites. Search can read the HTML.",
    tone: "web",
  },
  {
    href: "/services/mobile-development",
    label: "Mobile",
    title: "Mobile development",
    copy: "iOS, Android, and web from one TypeScript repo.",
    tone: "mobile",
  },
  {
    href: "/services/data-management",
    label: "Data",
    title: "Data management",
    copy: "Postgres owns the row. Payments write there too.",
    tone: "data",
  },
] as const;

// Keep in step with src/content/industries.ts; tests/unit/header.test.tsx checks every page is listed.
export const industryNav = [
  {
    href: "/industries/fintech",
    label: "Fintech",
    title: "Fintech",
    copy: "Payment engines, portals, and regulated platforms.",
    tone: "fintech",
  },
  {
    href: "/industries/healthtech",
    label: "HealthTech",
    title: "HealthTech",
    copy: "Patient portals, video visits, protected records.",
    tone: "healthtech",
  },
  {
    href: "/industries/ecommerce",
    label: "E-commerce",
    title: "E-commerce",
    copy: "Storefronts that hold up on sale day.",
    tone: "ecommerce",
  },
  {
    href: "/industries/saas",
    label: "SaaS",
    title: "SaaS",
    copy: "Multi-tenant platforms, billing, and analytics.",
    tone: "saas",
  },
  {
    href: "/industries/education",
    label: "Education",
    title: "Education",
    copy: "Courses, live classes, and enrollment.",
    tone: "education",
  },
  {
    href: "/industries/real-estate",
    label: "Real Estate",
    title: "Real Estate",
    copy: "Resident portals, tours, and smart buildings.",
    tone: "real-estate",
  },
  {
    href: "/industries/logistics",
    label: "Logistics",
    title: "Logistics",
    copy: "Fleet operations, live status, and alerts.",
    tone: "logistics",
  },
  {
    href: "/industries/media",
    label: "Media & Entertainment",
    title: "Media & Entertainment",
    copy: "Live communities, events, and media delivery.",
    tone: "media",
  },
] as const;
