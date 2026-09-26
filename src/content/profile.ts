import type { Profile } from "@/types/content";

export const profile: Profile = {
  name: "Azeem Subhani",
  title: "Senior Full-Stack & AI Application Engineer",
  location: "Lahore, Pakistan",
  summary:
    "I build SaaS, booking, payment, real-time, and AI-enabled web platforms with React, Next.js, Node.js, NestJS, Django, PostgreSQL, and AWS. My work includes Stripe payment systems, white-label booking flows, real-time collaboration, RAG workflows, and developer automation.",
  email: "azeemsubhani@proton.me",
  linkedinUrl: "https://linkedin.com/in/azeem-subhani-cs/",
  githubUrl: "https://github.com/Azeem-Subhani",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://azeem-subhani.vercel.app",
  resumeUrl: "/azeem-subhani-resume.pdf",
};
