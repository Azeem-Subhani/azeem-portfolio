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

export type WorkflowTile = {
  id: string;
  label: string;
  icon: StackIconId;
};

export type ProjectWorkflow = {
  description: string;
  hub: WorkflowTile;
  orbit: WorkflowTile[];
};

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

export type Experience = {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  bullets: string[];
};

export type Certificate = {
  title: string;
  issuer: string;
  verificationUrl: string;
  issued?: string;
};

export type SkillGroup = {
  label: string;
  skills: string[];
};

export type EducationItem = {
  institution: string;
  degree: string;
  location: string;
  start: string;
  end: string;
};

export type ContactService =
  | "Full-Stack SaaS Development"
  | "Payments and Stripe Integrations"
  | "AI/LLM Integrations"
  | "Real-Time Systems"
  | "Technical Consultation";

export type Profile = {
  name: string;
  title: string;
  location: string;
  summary: string;
  email: string;
  phone: string;
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
      path: { name: string; copy: string }[];
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
