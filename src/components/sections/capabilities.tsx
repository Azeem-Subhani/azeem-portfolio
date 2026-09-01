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

      <div className="mt-12 border-y border-border">
        {skillGroups.map((group) => (
          <Reveal
            key={group.label}
            as="section"
            className="grid grid-cols-1 gap-3 border-b border-border py-6 last:border-b-0 sm:grid-cols-[minmax(11rem,16rem)_1fr] sm:items-baseline sm:gap-6 sm:py-7"
          >
            <h3 className="text-lg font-medium text-foreground">{group.label}</h3>
            <ul className="flex flex-wrap items-baseline">
              {group.skills.map((skill, index) => (
                <li key={skill} className="flex items-baseline">
                  <span className="text-sm text-muted-foreground transition-colors duration-200 hover:text-accent">
                    {skill}
                  </span>
                  {index < group.skills.length - 1 ? (
                    <span aria-hidden="true" className="mx-2 text-sm text-muted-foreground/35">
                      ·
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
