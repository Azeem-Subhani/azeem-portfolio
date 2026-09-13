"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import LogoLoop from "@/components/react-bits/LogoLoop";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { revealStart } from "@/lib/reveal-visibility";

gsap.registerPlugin(ScrollTrigger);

const stack: { label: string; mark: ReactNode }[] = [
  {
    label: "Docker",
    mark: (
      <>
        <rect x="4" y="16" width="6" height="5" rx="0.6" fill="currentColor" />
        <rect x="11" y="16" width="6" height="5" rx="0.6" fill="currentColor" />
        <rect x="18" y="16" width="6" height="5" rx="0.6" fill="currentColor" />
        <rect x="11" y="10" width="6" height="5" rx="0.6" fill="currentColor" />
        <path
          d="M5 22.5c3 2.2 13 3.2 22-1"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </>
    ),
  },
  {
    label: "React",
    mark: (
      <>
        <circle cx="16" cy="16" r="2.2" fill="currentColor" />
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <ellipse cx="16" cy="16" rx="12" ry="5" />
          <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(60 16 16)" />
          <ellipse cx="16" cy="16" rx="12" ry="5" transform="rotate(120 16 16)" />
        </g>
      </>
    ),
  },
  {
    label: "Next.js",
    mark: (
      <>
        <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M13 10h2.1l6.4 10.2h-2.3L13 12.4V22h-2.1V10zm8.2 0H24v12h-2.8z"
          fill="currentColor"
        />
      </>
    ),
  },
  {
    label: "Angular",
    mark: (
      <path
        fill="currentColor"
        d="M16 4 5 8.2l1.7 14.2L16 28l9.3-5.6L27 8.2zm0 4.2 5.7 13.2h-2.3l-1.2-2.9h-4.4l-1.2 2.9H10.3zm0 4.2-1.8 4.4h3.6z"
      />
    ),
  },
  {
    label: "Node.js",
    mark: (
      <path
        fill="currentColor"
        d="M16 4 5.4 10v12L16 28l10.6-6V10zm0 3.4 7.4 4.2v8.4L16 24.2l-7.4-4.2v-8.4z"
      />
    ),
  },
  {
    label: "NestJS",
    mark: (
      <path
        fill="currentColor"
        d="M16 4c-2.4 4.2-7 7-7 13.2 0 4.4 3.2 8.8 7 10.8 3.8-2 7-6.4 7-10.8C23 11 18.4 8.2 16 4zm0 8.2c1.6 1.8 3.2 4.2 3.2 6.8 0 2.2-1.4 4.4-3.2 5.6-1.8-1.2-3.2-3.4-3.2-5.6 0-2.6 1.6-5 3.2-6.8z"
      />
    ),
  },
  {
    label: "GraphQL",
    mark: (
      <>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          d="m16 6 9 5.2v9.6L16 26 7 20.8V11.2z"
        />
        <circle cx="16" cy="6" r="1.7" fill="currentColor" />
        <circle cx="25" cy="11.2" r="1.7" fill="currentColor" />
        <circle cx="25" cy="20.8" r="1.7" fill="currentColor" />
        <circle cx="16" cy="26" r="1.7" fill="currentColor" />
        <circle cx="7" cy="20.8" r="1.7" fill="currentColor" />
        <circle cx="7" cy="11.2" r="1.7" fill="currentColor" />
      </>
    ),
  },
  {
    label: "PostgreSQL",
    mark: (
      <>
        <ellipse cx="16" cy="9" rx="8" ry="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M8 9v9c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V9"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 13.5c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
      </>
    ),
  },
  {
    label: "MySQL",
    mark: (
      <path
        fill="currentColor"
        d="M7 18c2.2-6 5-11.2 9.4-11.2 2.2 0 3.4 1.4 4.4 3.4 1.2 2.4 2.4 3.6 4.2 3.6 1.4 0 2.4-.6 3-1.2l-1.2 5.6c-.8 1-2.2 1.8-4 1.8-2.6 0-4.2-1.6-5.4-4.2-1-2.2-2-3.2-3.4-3.2-2.4 0-3.6 3.2-4.4 6.4H7zm11.4-12.2c.8-1.6 2-2.6 3.8-2.6.4 0 .8 0 1.2.2-1.6 1-2.6 2.6-3.4 4.6-.8.2-1.4.2-1.6-.2z"
      />
    ),
  },
  {
    label: "MongoDB",
    mark: (
      <path
        fill="currentColor"
        d="M16.4 4s.4 3.2-.8 5.4c-1 2-2.8 3.2-3.1 5.6-.3 2.1.8 4 2.4 5.2.4.3.6.6.6 1v.4c0 .4-.2.8-.5 1-.3.2-.4.4-.4.7 0 .3.2.5.4.6.2.1.3.4.3.6 0 .4-.3.7-.7.8-.8.2-1.7.2-2.5 0 2.1 1.4 4.7 1.9 7.1 1.1 2.1-.7 3.6-2.4 4.1-4.6.5-2.1 0-4.2-1.2-6-1.4-2.1-2.8-4-2.7-6.6 0-1.6.5-3.1 1.6-4.4-1 .1-2 .6-2.7 1.4-.4-1-.8-2.1-.7-3.2z"
      />
    ),
  },
  {
    label: "Tailwind",
    mark: (
      <path
        fill="currentColor"
        d="M8 14c2-4.8 4.8-7.2 8.4-7.2 2.6 0 4.5 1.3 5.6 3.8 1 2.2 2.2 3.4 3.6 3.4H16c-1.6 0-2.6-.8-3.2-2.4-.4-1.2-1-1.8-1.8-1.8-1.4 0-2.2 1.4-2.6 4.2H8zm0 8c2-4.8 4.8-7.2 8.4-7.2 2.6 0 4.5 1.3 5.6 3.8 1 2.2 2.2 3.4 3.6 3.4H16c-1.6 0-2.6-.8-3.2-2.4-.4-1.2-1-1.8-1.8-1.8-1.4 0-2.2 1.4-2.6 4.2H8z"
      />
    ),
  },
  {
    label: "Ionic",
    mark: (
      <>
        <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="16" cy="16" r="4.4" fill="currentColor" />
      </>
    ),
  },
  {
    label: "AWS",
    mark: (
      <>
        <path
          d="M8 11.5 16 8l8 3.5V18l-8 4.5L8 18z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 20.8c2.4 2.6 9.6 3.2 12.8-.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </>
    ),
  },
];

const stackPages: Record<(typeof stack)[number]["label"], string> = {
  Docker: "https://www.docker.com/",
  React: "https://react.dev",
  "Next.js": "https://nextjs.org/",
  Angular: "https://angular.io/",
  "Node.js": "https://nodejs.org/",
  NestJS: "https://nestjs.com/",
  GraphQL: "https://graphql.org/",
  PostgreSQL: "https://www.postgresql.org/",
  MySQL: "https://www.mysql.com/",
  MongoDB: "https://www.mongodb.com/",
  Tailwind: "https://tailwindcss.com/",
  Ionic: "https://ionicframework.com/",
  AWS: "https://aws.amazon.com/",
};

function StackMark({ item }: { item: (typeof stack)[number] }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className="h-[1em] w-[1em]">
      {item.mark}
    </svg>
  );
}

export function TechStack() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const lines = section.querySelectorAll<HTMLElement>("[data-stack-line]");
    const copy = section.querySelectorAll<HTMLElement>("[data-stack-copy]");
    const loop = section.querySelector<HTMLElement>("[data-stack-loop]");
    const targets = [...lines, ...copy, ...(loop ? [loop] : [])];

    const revert = () => {
      gsap.set(targets, { clearProps: "opacity,transform" });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revert();
      return;
    }

    gsap.set(lines, { yPercent: 112, rotate: 0.8, transformOrigin: "center bottom" });
    gsap.set(copy, {
      opacity: 0,
      x: (index) => (index % 2 === 0 ? -22 : 22),
      y: 12,
    });
    gsap.set(loop, { opacity: 0, y: 20 });

    // The headline block and the logo loop sit ~500px apart, so each gets its
    // own trigger: the loop used to finish fading in while still below the fold.
    const textTl = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
    textTl
      // Headline leads, body follows once it has landed.
      .to(lines, { yPercent: 0, rotate: 0, duration: 0.82, stagger: 0.12 })
      .to(
        copy,
        { opacity: 1, x: 0, y: 0, duration: 0.62, stagger: 0.12, ease: "power3.out" },
        0.5,
      );

    const loopTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    loopTl.to(loop, { opacity: 1, y: 0, duration: 0.75, delay: 0.15 });

    const textTrigger = textRef.current ?? section;
    const loopTrigger = loop ?? section;

    const textSt = ScrollTrigger.create({
      trigger: textTrigger,
      start: () => revealStart(textTrigger.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => textTl.play(),
    });

    const loopSt = ScrollTrigger.create({
      trigger: loopTrigger,
      start: () => revealStart(loopTrigger.offsetHeight, window.innerHeight),
      once: true,
      invalidateOnRefresh: true,
      onEnter: () => loopTl.play(),
    });

    const raf = requestAnimationFrame(() => {
      if (textSt.start <= window.scrollY + 4 && !textTl.isActive() && textTl.progress() === 0) {
        textTl.play();
      }
      if (loopSt.start <= window.scrollY + 4 && !loopTl.isActive() && loopTl.progress() === 0) {
        loopTl.play();
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      textSt.kill();
      loopSt.kill();
      textTl.kill();
      loopTl.kill();
      revert();
    };
  }, [reduced]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stack-title"
      className="home-band-stack relative overflow-x-clip py-20 pb-16 text-foreground sm:py-28 sm:pb-20"
    >
      <div ref={textRef} className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2
          id="stack-title"
          // -mb cancels the descender-guard padding on the last line so the
          // copy below keeps its original gap.
          className="-mb-[0.16em] text-center font-sans text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[0.9] tracking-tight"
        >
          <span className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
            <span data-stack-line className="block font-extralight will-change-transform">
              every layer of the
            </span>
          </span>
          <span className="block overflow-hidden pb-[0.16em] -mb-[0.16em]">
            <span data-stack-line className="block font-black text-accent will-change-transform">
              technology stack
            </span>
          </span>
        </h2>
        <p
          data-stack-copy
          className="mt-8 text-center text-xl font-bold leading-relaxed text-foreground/90"
        >
          I choose the stack for the project, not out of habit.
        </p>
        <p
          data-stack-copy
          className="pt-10 text-left text-lg leading-relaxed text-muted-foreground"
        >
          Track Hero is Next.js and React on a Django API. Oxym is Angular and Ionic
          on NestJS and Firestore. Different answers for different products, both
          running in production.
        </p>
        <p
          data-stack-copy
          className="pt-10 text-right text-lg leading-relaxed text-muted-foreground"
        >
          I work across the frontend, the API, the database, and the AWS account
          underneath, so nothing has to change hands between them.
        </p>
      </div>

      {reduced ? (
        <ul
          data-stack-loop
          className="mx-auto mt-16 flex max-w-7xl flex-wrap items-center justify-center gap-x-14 gap-y-10 px-4 text-[64px] sm:px-6"
        >
          {stack.map((item) => (
            <li key={item.label}>
              <a
                href={stackPages[item.label]}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={item.label}
                className="inline-flex rounded transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-current"
              >
                <StackMark item={item} />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div
          data-stack-loop
          className="mt-14 overflow-x-hidden text-foreground sm:mt-16"
        >
          <LogoLoop
            logos={stack.map((item) => ({
              node: <StackMark item={item} />,
              href: stackPages[item.label],
              title: item.label,
              ariaLabel: item.label,
            }))}
            speed={80}
            gap={24}
            logoHeight={64}
            pauseOnHover
            scaleOnHover
            ariaLabel="Technology stack"
          />
        </div>
      )}
    </section>
  );
}
