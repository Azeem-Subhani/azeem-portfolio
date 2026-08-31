export type ProjectCategory =
  | "AI & RAG"
  | "Full-Stack"
  | "Payments"
  | "Real-Time"
  | "Mobile"
  | "Cloud";

export type ProjectImage = {
  src: string;
  alt: string;
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
  image: ProjectImage;
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
