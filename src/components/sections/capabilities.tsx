import { Reveal } from "@/components/motion/reveal";
import { skillGroups } from "@/content/skills";

export function Capabilities() {
  return (
    <section aria-labelledby="capabilities-title" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
          Capabilities
        </p>
        <h2
          id="capabilities-title"
          className="mt-3 text-balance font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none"
        >
          What I work with
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <Reveal
            key={group.label}
            as="section"
            className="rounded-lg border border-border bg-surface p-6 sm:p-8"
          >
            <h3 className="font-display text-lg font-semibold">{group.label}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-border px-3 py-1.5 text-sm text-muted-foreground"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
