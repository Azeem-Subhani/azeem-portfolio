import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Confirmation that your message to Azeem Subhani was received.",
  alternates: {
    canonical: "/contact/thank-you",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-6 py-32 text-center">
      <div className="flex size-12 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent-ink">
        <CheckCircle2 aria-hidden="true" className="size-6" />
      </div>
      <p className="mt-6 font-mono text-xs tracking-[0.12em] text-accent-readable">
        Message received
      </p>
      <h1 className="mt-4 font-display text-[clamp(3.5rem,8vw,6.5rem)] font-normal leading-[0.88] tracking-[-0.045em]">
        Thanks for reaching out.
      </h1>
      <p role="status" className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
        I&apos;ll read this properly and reply as soon as I can, usually within
        two days. You can also reach me directly at {" "}
        <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        .
      </p>
      <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
        <Button asChild size="lg">
          <Link href="/projects">See the work</Link>
        </Button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back home
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  );
}
