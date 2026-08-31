"use client";

import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SystemsMap } from "@/components/sections/systems-map";
import { profile } from "@/content/profile";
import { useReveal } from "@/hooks/use-reveal";

export function Hero() {
  const eyebrowRef = useReveal<HTMLParagraphElement>({ delayMs: 0 });
  const titleRef = useReveal<HTMLHeadingElement>({ delayMs: 80 });
  const summaryRef = useReveal<HTMLParagraphElement>({ delayMs: 160 });
  const actionsRef = useReveal<HTMLDivElement>({ delayMs: 240 });
  const mapRef = useReveal<HTMLDivElement>({ delayMs: 240, translateY: 0 });

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]"
    >
      <div className="max-w-4xl">
        <p
          ref={eyebrowRef}
          className="mb-6 font-mono text-xs uppercase tracking-[0.16em] text-accent"
        >
          {profile.location} · Full-stack product engineering
        </p>

        <h1
          ref={titleRef}
          id="hero-title"
          className="text-balance font-display text-[clamp(3rem,7vw,7rem)] font-semibold leading-[0.94] tracking-[-0.055em]"
        >
          {profile.title}
        </h1>

        <p
          ref={summaryRef}
          className="mt-8 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl"
        >
          {profile.summary}
        </p>

        <div
          ref={actionsRef}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
        >
          <Button asChild size="lg">
            <Link href="/projects">
              View projects
              <ArrowRight aria-hidden="true" className="ml-2 size-4" />
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact me</Link>
          </Button>

          <Button asChild size="lg" variant="ghost">
            <a href={profile.resumeUrl} download>
              <Download aria-hidden="true" className="mr-2 size-4" />
              Download resume
            </a>
          </Button>
        </div>
      </div>

      <div ref={mapRef} className="lg:justify-self-end">
        <SystemsMap />
      </div>
    </section>
  );
}
