import type { Metadata } from "next";

import { ProjectGrid } from "@/components/projects/project-grid";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack, payments, real-time, and AI application engineering projects by Azeem Subhani.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Azeem Subhani",
    description:
      "Full-stack, payments, real-time, and AI application engineering projects.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
        Selected work
      </p>
      <h1 className="mt-4 max-w-3xl text-balance font-display text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-none">
        Projects
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Client and personal work spanning bookings, payments, real-time
        systems, and AI application engineering. Client projects are
        anonymized where I can&apos;t share identifying details.
      </p>

      <div className="mt-12">
        <ProjectGrid projects={projects} />
      </div>
    </section>
  );
}
