import type { Metadata } from "next";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PrintButton } from "@/components/resume/print-button";
import { certificates } from "@/content/certificates";
import { education, experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { skillGroups } from "@/content/skills";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Azeem Subhani's experience, skills, education, and certifications as a senior full-stack and AI application engineer.",
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: "Resume | Azeem Subhani",
    description:
      "Experience, skills, education, and certifications as a senior full-stack and AI application engineer.",
    url: "/resume",
  },
};

const summary =
  "Senior Full-Stack Engineer with 4+ years of experience delivering SaaS, booking, payment, smart-home, and cloud-backed web platforms. Builds customer-facing and operational workflows with React, Next.js, Node.js, NestJS, Django, GraphQL, PostgreSQL, and AWS. Professional development in AI application engineering includes Claude API integrations, tool calling, Model Context Protocol (MCP), retrieval-augmented generation (RAG), vector search, and agentic developer automation.";

export default function ResumePage() {
  return (
    <article className="mx-auto max-w-4xl px-6 py-20 print:max-w-none print:px-0 print:py-8">
      <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between print:pb-4">
        <div>
          <h1 className="font-display text-4xl font-semibold sm:text-5xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">{profile.title}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.location} ·{" "}
            <a href={`mailto:${profile.email}`} className="hover:text-accent">
              {profile.email}
            </a>{" "}
            ·{" "}
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              LinkedIn
            </a>{" "}
            ·{" "}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-accent"
            >
              GitHub
            </a>
          </p>
        </div>

        <div className="flex gap-3 no-print">
          <PrintButton />
          <Button asChild size="lg">
            <a href={profile.resumeUrl} download>
              <Download aria-hidden="true" className="mr-2 size-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      <section className="mt-10 print:mt-6">
        <h2 className="font-display text-xl font-semibold">Summary</h2>
        <p className="mt-3 text-muted-foreground">{summary}</p>
      </section>

      <section className="mt-10 print:mt-6">
        <h2 className="font-display text-xl font-semibold">
          Technical skills
        </h2>
        <dl className="mt-4 grid gap-3">
          {skillGroups.map((group) => (
            <div key={group.label} className="grid gap-1 sm:grid-cols-[160px_1fr] sm:gap-4">
              <dt className="font-medium text-foreground">{group.label}</dt>
              <dd className="text-sm text-muted-foreground">
                {group.skills.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10 print:mt-6">
        <h2 className="font-display text-xl font-semibold">Experience</h2>
        <div className="mt-4 flex flex-col gap-8">
          {experience.map((job) => (
            <div key={job.company}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-semibold text-foreground">
                  {job.title} · {job.company}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {job.start} – {job.end}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{job.location}</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 break-inside-avoid print:mt-6">
        <h2 className="font-display text-xl font-semibold">
          Certifications & professional development
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-sm text-muted-foreground">
          {certificates.map((certificate) => (
            <li key={certificate.verificationUrl}>
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noreferrer"
                className="text-foreground hover:text-accent"
              >
                {certificate.title}
              </a>{" "}
              — {certificate.issuer}
              {certificate.issued ? `, ${certificate.issued}` : ""}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 break-inside-avoid print:mt-6">
        <h2 className="font-display text-xl font-semibold">Education</h2>
        <div className="mt-4 flex flex-col gap-1">
          {education.map((item) => (
            <div key={item.institution}>
              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                <h3 className="font-semibold text-foreground">
                  {item.degree}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.start} – {item.end}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {item.institution}, {item.location}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
