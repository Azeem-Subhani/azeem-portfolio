"use client";

import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin } from "lucide-react";
import { gsap } from "gsap";

import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { INTRO_COMPLETE_EVENT } from "@/components/motion/site-intro";
import { profile } from "@/content/profile";

const titleLines = ["Let's build", "something", "useful."] as const;

const directLinks = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: MapPin, label: profile.location, href: undefined },
];

const socials = [
  { icon: GithubIcon, label: "GitHub", href: profile.githubUrl },
  { icon: LinkedinIcon, label: "LinkedIn", href: profile.linkedinUrl },
];

export function ContactPageContent() {
  const pageRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const availability = page.querySelector<HTMLElement>("[data-contact-availability]");
    const direct = page.querySelectorAll<HTMLElement>("[data-contact-direct]");
    const socials = page.querySelectorAll<HTMLElement>("[data-contact-social]");
    const formIntro = page.querySelector<HTMLElement>("[data-contact-form-intro]");
    const form = page.querySelector<HTMLElement>("[data-contact-form]");
    // Title and lede are left alone so they can paint from the HTML. Hiding
    // them until this timeline finished made the lede the largest paint.
    const targets = [availability, ...direct, ...socials, formIntro, form].filter(
      (target): target is HTMLElement => Boolean(target),
    );
    let removeIntroListener = () => {};
    let alive = true;

    const settle = () => {
      gsap.killTweensOf(targets);
      gsap.set(targets, { clearProps: "all" });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      settle();
      return;
    }

    gsap.set(availability, { opacity: 0, y: 12 });
    gsap.set(direct, { opacity: 0, y: 14 });
    gsap.set(socials, { opacity: 0, y: 14 });
    gsap.set(formIntro, { opacity: 0, y: 14 });
    gsap.set(form, { opacity: 0, y: 24 });

    const play = () => {
      if (!alive) return;

      gsap
        .timeline({
          defaults: { ease: "power4.out" },
          onComplete: settle,
        })
        .to(availability, { opacity: 1, y: 0, duration: 0.45 }, 0)
        .to(formIntro, { opacity: 1, y: 0, duration: 0.5 }, 0.12)
        .to(form, { opacity: 1, y: 0, duration: 0.72 }, 0.2)
        .to(direct, { opacity: 1, y: 0, duration: 0.48, stagger: 0.08 }, 0.28)
        .to(socials, { opacity: 1, y: 0, duration: 0.48, stagger: 0.08 }, 0.38);
    };

    const context = gsap.context(() => {
      if (document.documentElement.dataset.introState === "fresh") {
        window.addEventListener(INTRO_COMPLETE_EVENT, play, { once: true });
        removeIntroListener = () =>
          window.removeEventListener(INTRO_COMPLETE_EVENT, play);
      } else {
        play();
      }
    }, page);

    return () => {
      alive = false;
      removeIntroListener();
      context.revert();
      settle();
    };
  }, []);

  return (
    <section
      ref={pageRef}
      aria-labelledby="contact-title"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-24 pt-32 sm:pt-40"
    >
      <div
        className="pointer-events-none absolute -right-24 top-20 size-80 rounded-full bg-accent/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(32rem,1.2fr)] lg:gap-20">
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p
              data-contact-availability
              className="flex items-center gap-3 font-mono text-xs tracking-[0.12em] text-accent-readable"
            >
              <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
              Available for select projects
            </p>
            <h1
              id="contact-title"
              className="mt-6 max-w-xl text-balance font-display text-[clamp(3.5rem,7vw,7rem)] font-normal leading-[0.86] tracking-[-0.045em]"
            >
              {titleLines.map((line, index) => (
                <span
                  key={line}
                  className={`block overflow-hidden pb-[0.12em] -mb-[0.12em] ${index === titleLines.length - 1 ? "text-accent" : ""}`}
                >
                  <span data-contact-title-line className="block will-change-transform">
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p
              data-contact-copy
              className="mt-8 max-w-md text-base leading-7 text-muted-foreground sm:text-lg"
            >
              Tell me what you&apos;re working on, where it&apos;s stuck, or what
              you want to make possible. I&apos;ll reply with a considered next
              step.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <p className="text-sm font-medium">Prefer a direct line?</p>
            <ul className="mt-5 flex flex-col gap-4">
              {directLinks.map((item) => (
                <li key={item.label} data-contact-direct className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-accent">
                    <item.icon aria-hidden="true" className="size-4" />
                  </span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                    >
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
                  data-contact-social
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  <item.icon aria-hidden="true" className="size-4" />
                  <span>{item.label}</span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div data-contact-form-intro className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-medium">Start a conversation</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A few details are enough to get started.
              </p>
            </div>
            <div className="hidden items-center gap-2 text-right text-xs text-muted-foreground sm:flex">
              <Clock3 aria-hidden="true" className="size-4 text-accent" />
              Usually replies within 2 days
            </div>
          </div>
          <div data-contact-form>
            <ContactForm />
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground sm:hidden">
            <Clock3 aria-hidden="true" className="size-3.5 text-accent" />
            Usually replies within 2 days
          </p>
        </div>
      </div>
    </section>
  );
}
