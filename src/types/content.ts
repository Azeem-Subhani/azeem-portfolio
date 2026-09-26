export type ProjectCategory =
  | "AI & RAG"
  | "Full-Stack"
  | "Payments"
  | "Real-Time"
  | "Mobile"
  | "Cloud";

/** A device screen. It is always a live React capture; alt describes it for screen readers. */
export type ProjectScreen = {
  alt: string;
};

export type ProjectScreens = {
  web: ProjectScreen;
  phone?: ProjectScreen;
  /** Charcoal sampled from mockup edges so the pane dissolves into the screenshot. */
  backdrop: string;
  /** When true, the web pane renders its live React mockup (otherwise it stays blank). */
  liveWeb?: boolean;
  /** When true, the phone pane renders its live React mockup (otherwise it stays blank). */
  livePhone?: boolean;
};

export type ProjectMetric = {
  value: string;
  label: string;
};

export const STACK_ICON_IDS = [
  "react",
  "nextjs",
  "typescript",
  "django",
  "stripe",
  "postgresql",
  "angular",
  "ionic",
  "nestjs",
  "nodejs",
  "express",
  "mongodb",
  "firebase",
  "firestore",
  "socketio",
  "aws",
  "redux",
  "graphql",
  "javascript",
  "jwt",
  "text",
] as const;

export type StackIconId = (typeof STACK_ICON_IDS)[number];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  role: string;
  approach: string[];
  outcomes: string[];
  stack: string[];
  categories: ProjectCategory[];
  screens: ProjectScreens;
  metrics: ProjectMetric[];
  productPath?: string;
  featured: boolean;
  visibility: "public" | "anonymized";
  liveUrl?: string;
  repositoryUrl?: string;
};

export type Profile = {
  name: string;
  title: string;
  location: string;
  summary: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  siteUrl: string;
  resumeUrl: string;
};

export const SERVICE_SLUGS = [
  "cloud",
  "web-development",
  "mobile-development",
  "data-management",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export type ServiceProof = {
  value: string;
  label: string;
};

export type ServiceItem = {
  title: string;
  copy: string;
};

export type ServiceSection =
  | {
      kind: "capabilities";
      title: string;
      copy: string;
      items: ServiceItem[];
    }
  | {
      kind: "compare";
      title: string;
      copy: string;
      left: { title: string; subtitle: string };
      right: { title: string; subtitle: string };
      rows: { label: string; left: string; right: string }[];
    }
  | {
      kind: "process";
      title: string;
      copy: string;
      left: { title: string; copy: string; steps: string[] };
      right: { title: string; copy: string; steps: string[] };
      outcomes: ServiceItem[];
    }
  | {
      kind: "metrics";
      title: string;
      copy?: string;
      items: ServiceProof[];
    }
  | {
      kind: "features";
      title: string;
      copy: string;
      items: ServiceItem[];
    }
  | {
      kind: "steps";
      title: string;
      copy: string;
      items: ServiceItem[];
    }
  | {
      kind: "case";
      kicker: string;
      title: string;
      client: string;
      challenge: string;
      solution: string;
      results: ServiceProof[];
      /** Where traffic or data enters the stack, shown as the root of the trace. */
      entry?: string;
      /**
       * Services in the stack. `parent` names the service that calls or reads
       * from this one; services without a parent hang off `entry`.
       */
      path: { name: string; copy: string; parent?: string }[];
    }
  | {
      kind: "platforms";
      title: string;
      copy: string;
      items: (ServiceItem & { meta?: string })[];
    }
  | {
      kind: "coverage";
      title: string;
      copy: string;
      groups: { title: string; copy: string; items: string[] }[];
    };

export type ServicePageContent = {
  slug: ServiceSlug;
  label: string;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  titleLines: string[];
  lede: string;
  proof: ServiceProof[];
  sections: ServiceSection[];
  ctaTitle: string;
  ctaCopy: string;
};

export const INDUSTRY_SLUGS = [
  "fintech",
  "healthtech",
  "ecommerce",
  "saas",
  "education",
  "real-estate",
  "logistics",
  "media",
] as const;

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number];

/** Icon keys an industry page can use; the component maps each to a lucide icon. */
export type IndustryIcon =
  | "card"
  | "wallet"
  | "shield"
  | "key"
  | "lock"
  | "landmark"
  | "refresh"
  | "database"
  | "fingerprint"
  | "scroll"
  | "waypoints"
  | "split"
  | "cart"
  | "store"
  | "zap"
  | "layers"
  | "users"
  | "gauge"
  | "heart"
  | "stethoscope"
  | "video"
  | "calendar"
  | "graduation"
  | "book"
  | "sparkles"
  | "home"
  | "map"
  | "building"
  | "truck"
  | "route"
  | "radio"
  | "bell"
  | "film"
  | "message"
  | "globe"
  | "trophy";

/** Solarized accent a page is tinted with; matches the tone of its nav entry. */
export type IndustryTone =
  | "green"
  | "red"
  | "yellow"
  | "cyan"
  | "violet"
  | "orange"
  | "blue"
  | "magenta";

/** Which illustration runs beside the hero copy. */
export type IndustryHeroVisual =
  | "ledger"
  | "checkout"
  | "tenants"
  | "routes"
  | "stream"
  | "care"
  | "course"
  | "listings";

/** Per-page arrangement, so no two industry pages read as the same template. */
export type IndustryLayout = {
  hero: "split" | "split-reverse" | "centered";
  challenges: "cards" | "list" | "columns";
  solutions: "stacked" | "alternating" | "tabs";
  stack: "grid" | "rows";
  practices: "grid" | "checklist";
};

export type IndustryChallenge = {
  icon: IndustryIcon;
  title: string;
  copy: string;
};

export type IndustrySolution = {
  icon: IndustryIcon;
  title: string;
  copy: string;
  features: string[];
  /**
   * "shipped" points at the project where this ran in production; "related" points at the
   * closest real work when the solution itself has not shipped yet. Omit when nothing fits.
   */
  link?: { kind: "shipped" | "related"; label: string; href: string };
};

export type IndustryStackGroup = {
  title: string;
  items: string[];
};

export type IndustryPractice = {
  icon: IndustryIcon;
  title: string;
  copy: string;
  /** Standards the practice helps a review of; never a certification claim. */
  supports: string;
};

export type IndustryPageContent = {
  slug: IndustrySlug;
  label: string;
  /**
   * "shipped": the page cites production work and shows proof figures.
   * "approach": no shipped product in this industry yet; the page describes the build and
   * links related work instead, and shows no figures.
   */
  evidence: "shipped" | "approach";
  tone: IndustryTone;
  heroVisual: IndustryHeroVisual;
  layout: IndustryLayout;
  metaTitle: string;
  metaDescription: string;
  kicker: string;
  title: string;
  titleAccent: string;
  lede: string;
  /** Empty on approach pages. */
  proof: ServiceProof[];
  /** Shown in place of the proof band on approach pages. */
  approachNote?: string;
  challengesTitle: string;
  challengesIntro: string;
  challenges: IndustryChallenge[];
  solutionsTitle: string;
  solutionsIntro: string;
  solutions: IndustrySolution[];
  stackIntro: string;
  stack: IndustryStackGroup[];
  /** Defaults to "Security & compliance". */
  practicesKicker?: string;
  practicesTitle: string;
  practicesIntro: string;
  practices: IndustryPractice[];
  practicesNote: string;
  ctaTitle: string;
  ctaCopy: string;
};
