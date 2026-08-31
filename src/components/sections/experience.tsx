import { Reveal } from "@/components/motion/reveal";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section aria-labelledby="experience-title" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
          Experience
        </p>
        <h2
          id="experience-title"
          className="mt-3 text-balance font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none"
        >
          Where the work happened
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-col gap-6">
        {experience.map((job) => (
          <Reveal
            key={job.company}
            as="section"
            className="rounded-lg border border-border bg-surface p-6 sm:p-8"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="font-display text-xl font-semibold sm:text-2xl">
                {job.title} · {job.company}
              </h3>
              <p className="font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground">
                {job.start} – {job.end}
              </p>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{job.location}</p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-sm text-muted-foreground">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  {bullet}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
