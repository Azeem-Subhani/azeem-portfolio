import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, MapPin } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Azeem Subhani about full-stack, payments, real-time, or AI application engineering work.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Azeem Subhani",
    description:
      "Get in touch about full-stack, payments, real-time, or AI application engineering work.",
    url: "/contact",
  },
};

const directLinks = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: profile.location, href: undefined },
];

const socials = [
  { icon: GithubIcon, label: "GitHub", href: profile.githubUrl },
  { icon: LinkedinIcon, label: "LinkedIn", href: profile.linkedinUrl },
];

export default function ContactPage() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-24 pt-32 sm:pt-40">
      <div className="pointer-events-none absolute -right-24 top-20 size-80 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

      <div className="relative grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(32rem,1.2fr)] lg:gap-20">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-accent-readable">
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              Available for select projects
            </p>
            <h1 className="mt-6 max-w-xl text-balance font-display text-[clamp(3.5rem,7vw,7rem)] font-normal leading-[0.86] tracking-[-0.045em]">
              Let&apos;s build something useful.
            </h1>
            <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
              Tell me what you&apos;re working on, where it&apos;s stuck, or what
              you want to make possible. I&apos;ll reply with a considered next
              step.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium">Prefer a direct line?</p>
            <ul className="mt-5 flex flex-col gap-4">
            {directLinks.map((item) => (
              <li key={item.label} className="flex items-center gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-accent">
                  <item.icon aria-hidden="true" className="size-4" />
                </span>
                {item.href ? (
                  <a href={item.href} className="text-sm underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-sm">{item.label}</span>
                )}
              </li>
            ))}
          </ul>

            <div className="mt-6 flex items-center gap-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <item.icon aria-hidden="true" className="size-4" />
                <span>{item.label}</span>
                <ArrowUpRight aria-hidden="true" className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium">Start a conversation</h2>
              <p className="mt-1 text-sm text-muted-foreground">A few details are enough to get started.</p>
            </div>
            <div className="hidden items-center gap-2 text-right text-xs text-muted-foreground sm:flex">
              <Clock3 aria-hidden="true" className="size-4 text-accent" />
              Usually replies within 2 days
            </div>
          </div>
          <ContactForm />
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
            <Clock3 aria-hidden="true" className="size-3.5 text-accent" />
            Usually replies within 2 days
          </p>
        </div>
      </div>
    </section>
  );
}
