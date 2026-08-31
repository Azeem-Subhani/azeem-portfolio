import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

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
    <section className="mx-auto max-w-7xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
        Get in touch
      </p>
      <h1 className="mt-4 max-w-2xl text-balance font-display text-[clamp(2rem,4vw,4.5rem)] font-semibold leading-none">
        Let&apos;s work together
      </h1>
      <p className="mt-6 max-w-xl text-lg text-muted-foreground">
        Fill out the form and I&apos;ll get back to you, or reach out directly
        through email or LinkedIn.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="order-2 flex flex-col gap-8 lg:order-1">
          <ul className="flex flex-col gap-4">
            {directLinks.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border text-accent">
                  <item.icon aria-hidden="true" className="size-4" />
                </span>
                {item.href ? (
                  <a href={item.href} className="text-sm hover:text-accent">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-sm">{item.label}</span>
                )}
              </li>
            ))}
          </ul>

          <ul className="flex gap-3">
            {socials.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  <item.icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="order-1 lg:order-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
