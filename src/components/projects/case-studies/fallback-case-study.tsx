import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectMockup } from "@/components/projects/project-mockup";
import type { Project } from "@/types/content";

type FallbackCaseStudyProps = {
  project: Project;
};

/** Original shared project page. Used until a slug has its own case study. */
export function FallbackCaseStudy({ project }: FallbackCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-20 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mt-10 overflow-hidden rounded-[26px]">
        <ProjectMockup
          project={project}
          density="case-study"
          priority
          descriptiveAlt
          sizes="(min-width: 1280px) 80rem, 100vw"
          className="lg:min-h-[520px]"
        />
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl gap-10 sm:grid-cols-2">
        <section>
          <h2 className="font-display text-2xl font-normal">Context</h2>
          <p className="mt-3 leading-7 text-muted-foreground">{project.context}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal">My role</h2>
          <p className="mt-3 leading-7 text-muted-foreground">{project.role}</p>
        </section>
      </div>

      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-normal">Technical approach</h2>
        <ul className="mt-4 space-y-3">
          {project.approach.map((item) => (
            <li
              key={item}
              className="border-l-2 border-accent/40 pl-4 text-sm leading-6 text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-14 max-w-3xl">
        <h2 className="font-display text-2xl font-normal">Outcome</h2>
        <ul className="mt-4 grid gap-3">
          {project.outcomes.map((item) => (
            <li key={item} className="flex gap-3 text-muted-foreground">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-14 max-w-3xl">
        <div>
          <h2 className="font-display text-2xl font-normal">Technology stack</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto mt-14 max-w-3xl">
        <ProjectLinks
          project={project}
          className="flex gap-6 border-t border-border pt-8"
        />
      </div>
    </article>
  );
}
