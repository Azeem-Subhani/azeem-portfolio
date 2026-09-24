export const primaryNav = [
  { href: "/projects", label: "Portfolio" },
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

