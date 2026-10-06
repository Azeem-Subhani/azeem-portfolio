import Link from "next/link";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/content/profile";

// Monogram until a headshot is added to public/images.
const initials = profile.name
  .split(" ")
  .map((part) => part[0])
  .join("");

export function AuthorCard() {
  return (
    <section
      aria-label="About the author"
      className="mt-16 flex flex-col gap-5 rounded-lg border border-border p-6 sm:flex-row sm:items-start"
    >
      <div
        aria-hidden="true"
        className="flex size-14 shrink-0 items-center justify-center rounded-full bg-accent font-display text-xl text-accent-foreground"
      >
        {initials}
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Written by</p>
        <p className="mt-1 font-display text-2xl">{profile.name}</p>
        <p className="text-sm text-muted-foreground">{profile.title}</p>
        <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{profile.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <Link href="/why-me" className="underline underline-offset-4">
            More about me
          </Link>
          <a
            href={profile.githubUrl}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            rel="noopener noreferrer"
            target="_blank"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedinIcon className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
