"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { CloudV3Diagram } from "@/components/services/cloud-v3-diagram";
import { serviceNav } from "@/content/nav";
import { profile } from "@/content/profile";
import { cn } from "@/lib/utils";

import "./cloud-v3.css";

const year = new Date().getFullYear();

const capabilities = [
  {
    title: "Multi-cloud",
    copy: "I pick the platform the workload fits. Auth, data, and compute stay one system.",
    icon: "layers" as const,
  },
  {
    title: "Shipped work",
    copy: "Fifty-plus production apps. Real accounts, real traffic, not a slide deck.",
    icon: "code" as const,
  },
  {
    title: "Infrastructure as code",
    copy: "Terraform, SAM, and Serverless. Reviewers read a pull request, not a console click.",
    icon: "cube" as const,
  },
  {
    title: "Serverless systems",
    copy: "If the box sits idle twenty hours a day, it should not exist. Functions scale with the write path.",
    icon: "bolt" as const,
  },
  {
    title: "Lightweight hosting",
    copy: "DigitalOcean, Vercel, or Firebase when a full cloud is too much.",
    icon: "cloud" as const,
  },
];

function CapabilityIcon({ name }: { name: (typeof capabilities)[number]["icon"] }) {
  if (name === "layers") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M4.5 9.2 12 5.4l7.5 3.8L12 13 4.5 9.2z" />
        <path d="M4.5 12.6 12 16.4l7.5-3.8" />
        <path d="M4.5 16 12 19.8l7.5-3.8" />
      </svg>
    );
  }

  if (name === "code") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M8.4 8.2 4.6 12l3.8 3.8" />
        <path d="M15.6 8.2 19.4 12l-3.8 3.8" />
      </svg>
    );
  }

  if (name === "cube") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M12 4.6 19 8.4v7.2L12 19.4 5 15.6V8.4L12 4.6z" />
        <path d="M12 12.1 19 8.4M12 12.1 5 8.4M12 12.1v7.3" />
      </svg>
    );
  }

  if (name === "bolt") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden>
        <path d="M13.2 3.8 6.6 13h5l-1 7.2 7-9.6h-5l1.6-6.8z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path d="M7.4 17.2h9.4c2.4 0 4.2-1.8 4.2-4.1 0-2.1-1.6-3.8-3.7-4.1-.6-2.4-2.8-4.2-5.4-4.2-2.2 0-4.1 1.2-5.1 3-2.2.2-4 2-4 4.2 0 2.4 2 4.2 4.6 4.2z" />
    </svg>
  );
}

function ThemeControl() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // next-themes resolves after mount; reveal the real icon once.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button type="button" className="cloud-v3-icon-btn" aria-label="Toggle theme">
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3.4v2.2M12 18.4v2.2M3.4 12h2.2M18.4 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M5.8 18.2l1.6-1.6M16.6 7.4l1.6-1.6" />
        </svg>
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";
  const label = isDark ? "Use light theme" : "Use dark theme";

  return (
    <button
      type="button"
      className="cloud-v3-icon-btn"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 3.4v2.2M12 18.4v2.2M3.4 12h2.2M18.4 12h2.2M5.8 5.8l1.6 1.6M16.6 16.6l1.6 1.6M5.8 18.2l1.6-1.6M16.6 7.4l1.6-1.6" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M15.6 13.2A6.2 6.2 0 0 1 10.8 4.8 6.6 6.6 0 1 0 19.2 13.2a6.1 6.1 0 0 1-3.6 0z" />
        </svg>
      )}
    </button>
  );
}

function CloudV3Header() {
  const menuId = useId();
  const pointerType = useRef("");
  const [open, setOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector("[data-site-header]");
    const footer = document.querySelector("main ~ footer");
    const cta = document.querySelector('aside[aria-label="Contact shortcut"]');
    const nodes = [header, footer, cta].filter(Boolean) as HTMLElement[];
    for (const node of nodes) {
      node.setAttribute("aria-hidden", "true");
      node.setAttribute("inert", "");
    }
    return () => {
      for (const node of nodes) {
        node.removeAttribute("aria-hidden");
        node.removeAttribute("inert");
      }
    };
  }, []);

  return (
    <header className="cloud-v3-header">
      <div className="cloud-v3-header__bar">
      <Link href="/" className="cloud-v3-wordmark">
        {profile.name}
      </Link>

      <nav className="cloud-v3-nav" aria-label="Primary">
        <div
          className="cloud-v3-services"
          onPointerEnter={() => setOpen(true)}
          onPointerLeave={() => setOpen(false)}
        >
          <button
            type="button"
            className="cloud-v3-nav-link"
            aria-expanded={open}
            aria-controls={menuId}
            aria-haspopup="menu"
            onPointerDown={(event) => {
              pointerType.current = event.pointerType;
            }}
            onClick={() => {
              if (pointerType.current === "mouse") {
                setOpen(true);
                return;
              }
              setOpen((value) => !value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Escape") setOpen(false);
            }}
          >
            Services
            <svg viewBox="0 0 12 12" aria-hidden>
              <path d="M2.2 4.2 6 8l3.8-3.8" />
            </svg>
          </button>
          <ul id={menuId} role="menu" hidden={!open} className="cloud-v3-services__menu">
            {serviceNav.map((item) => (
              <li key={item.href} role="none">
                <Link role="menuitem" href={item.href}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/projects" className="cloud-v3-nav-link">
          Portfolio
        </Link>
        <ThemeControl />
        <Link href="/contact" className="cloud-v3-contact">
          Contact
        </Link>
      </nav>

      <div className="cloud-v3-header__mobile">
        <ThemeControl />
        <Link href="/contact" className="cloud-v3-contact">
          Contact
        </Link>
        <button
          type="button"
          className="cloud-v3-icon-btn"
          aria-expanded={navOpen}
          aria-controls="cloud-v3-mobile-nav"
          aria-label={navOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setNavOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" aria-hidden>
            {navOpen ? (
              <path d="M6 6 18 18M18 6 6 18" />
            ) : (
              <path d="M5 8h14M5 12h14M5 16h14" />
            )}
          </svg>
        </button>
      </div>
      </div>

      <nav
        id="cloud-v3-mobile-nav"
        className="cloud-v3-mobile-nav"
        hidden={!navOpen}
        aria-label="Mobile"
      >
        <p>Services</p>
        {serviceNav.map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setNavOpen(false)}>
            {item.title}
          </Link>
        ))}
        <Link href="/projects" onClick={() => setNavOpen(false)}>
          Portfolio
        </Link>
      </nav>
    </header>
  );
}

export function CloudV3Page({ className }: { className?: string }) {
  return (
    <article className={cn("cloud-v3-page dark", className)} data-theme="dark">
      <div className="cloud-v3-shell">
        <CloudV3Header />

        <div className="cloud-v3-hero">
          <div className="cloud-v3-hero__copy">
            <p className="cloud-v3-kicker">
              Cloud infrastructure
              <span aria-hidden />
            </p>
            <h1>
              <span>cloud that ships</span>
              <span>as one stack</span>
            </h1>
            <p className="cloud-v3-lede">
              AWS, Azure, and GCP. Fifty-plus production apps, one deploy,
              traced hops. Built to ship, not sit idle.
            </p>
            <ul className="cloud-v3-providers" aria-label="Cloud platforms">
              <li>
                <img src="/images/cloud-v3/amazonaws.svg" alt="AWS" width="72" height="43" />
              </li>
              <li>
                <img src="/images/cloud-v3/microsoftazure.svg" alt="Azure" width="22" height="22" />
              </li>
              <li>
                <img src="/images/cloud-v3/googlecloud.svg" alt="GCP" width="26" height="23" />
              </li>
            </ul>
          </div>

          <CloudV3Diagram />
        </div>

        <section className="cloud-v3-proof" aria-label="Operated results">
          <div>
            <p>Production apps</p>
            <strong className="cloud-v3-proof__value">50+</strong>
          </div>
          <div>
            <p>Infrastructure cost cut</p>
            <strong className="cloud-v3-proof__value">40%</strong>
            <p className="cloud-v3-proof__note">average</p>
          </div>
          <div>
            <p>Uptime</p>
            <strong className="cloud-v3-proof__value">99.95%</strong>
          </div>
        </section>

        <section className="cloud-v3-capabilities" aria-label="Capabilities">
          {capabilities.map((item) => (
            <article key={item.title}>
              <span className="cloud-v3-capability-icon" aria-hidden>
                <CapabilityIcon name={item.icon} />
              </span>
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </section>

        <section className="cloud-v3-cta">
          <h2>Let&apos;s build your cloud infrastructure.</h2>
          <p>
            Tell me what runs today, where it falls over, and what a cheaper,
            traced stack would unblock.
          </p>
          <Link href="/contact" className="cloud-v3-cta__action">
            Start a conversation
            <svg viewBox="0 0 16 16" aria-hidden>
              <path d="M2.4 8h11.2M9.6 4.2 13.4 8 9.6 11.8" />
            </svg>
          </Link>
        </section>

        <footer className="cloud-v3-footer">
          <p>
            <span>© {year} {profile.name}</span>
            <span aria-hidden>·</span>
            <Link href="/privacy">Privacy</Link>
            <span aria-hidden>·</span>
            <Link href="/terms">Terms</Link>
          </p>
          <span className="cloud-v3-footer__rule" aria-hidden />
        </footer>
      </div>
    </article>
  );
}
