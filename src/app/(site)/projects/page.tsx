import type { Metadata } from "next";
import Link from "next/link";

import { MagneticButton } from "@/components/motion/magnetic-button";
import { ProjectCatalog } from "@/components/projects/project-catalog";
import { ProjectsIntro } from "@/components/projects/projects-intro";
import { Button } from "@/components/ui/button";
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
    <>
      <section className="projects-page relative isolate">
        <div
          aria-hidden="true"
          className="projects-grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-[30rem] overflow-hidden"
        />

        <div className="relative mx-auto max-w-[calc(var(--container-7xl)+2.5rem)] px-5 pb-24 pt-32 sm:px-8 lg:pb-32 lg:pt-40">
          <ProjectsIntro />

          <dl className="projects-proof mt-14 lg:mt-20">
            <div data-projects-proof>
              <dt>Project stories</dt>
              <dd>{projects.length}</dd>
            </div>
            <div data-projects-proof>
              <dt>White-label venues</dt>
              <dd>5</dd>
            </div>
            <div data-projects-proof>
              {/* Placeholder wording matching the Data page; confirm payments vs requests. */}
              <dt>Authenticated payments a day</dt>
              <dd>500+</dd>
            </div>
          </dl>

          <div className="mt-16 lg:mt-24">
            <ProjectCatalog projects={projects} />
          </div>
        </div>
      </section>

      <div data-catalog-outro className="projects-outro relative z-10">
        <div className="mx-auto flex max-w-[calc(var(--container-7xl)+2.5rem)] flex-col gap-6 px-5 py-20 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-28">
          <p className="max-w-xl text-balance font-display text-[clamp(2rem,4vw,3.75rem)] leading-[0.98]">
            Have a product that needs to work harder?
          </p>
          {/* Same filled button the other pages close on; a text link read as an afterthought. */}
          <div data-inline-cta className="w-fit">
            <MagneticButton>
              <Button asChild size="lg">
                <Link href="/contact">Start a conversation</Link>
              </Button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </>
  );
}
