import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/content/profile";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <Reveal
        as="section"
        className="flex flex-col items-start gap-6 rounded-lg border border-border bg-surface p-10 sm:p-14"
      >
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
          Get in touch
        </p>
        <h2 className="max-w-2xl text-balance font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none">
          Have a project in mind?
        </h2>
        <p className="max-w-xl text-lg text-muted-foreground">
          I&apos;m open to full-stack, payments, and AI application
          engineering work. Tell me what you&apos;re building and I&apos;ll
          get back to you.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/contact">
              Start a conversation
              <ArrowRight aria-hidden="true" className="ml-2 size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={`mailto:${profile.email}`}>Email directly</a>
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
