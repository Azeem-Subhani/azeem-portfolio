export type ProjectCategory =
  | "AI & RAG"
  | "Full-Stack"
  | "Payments"
  | "Real-Time"
  | "Mobile"
  | "Cloud";

export type ProjectScreen = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectScreens = {
  web: ProjectScreen;
  phone?: ProjectScreen;
  /** Charcoal sampled from mockup edges so the pane dissolves into the screenshot. */
  backdrop: string;
  /** When true, the web pane renders a live React mockup instead of web.src. */
  liveWeb?: boolean;
  /** When true, the phone pane renders a live React mockup instead of phone.src. */
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
  "socketio",
  "aws",
  "redux",
  "graphql",
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
