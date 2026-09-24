"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

import { GlassStage } from "@/components/services/data-management-grok/glass-stage";
import { serviceNav } from "@/content/nav";
import { profile } from "@/content/profile";

import "./grok.css";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M2.5 8h11M9.2 3.8 13.5 8l-4.3 4.2" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" data-open={open ? "true" : "false"}>
      <path d="M2.2 4.3 6 8l3.8-3.7" />
    </svg>
  );
}

export function GrokPage() {
  const menuId = useId();
  const drawerId = useId();
  const rootRef = useRef<HTMLElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-site-header]");
    const footer = document.querySelector<HTMLElement>("main ~ footer");
    const cta = document.querySelector<HTMLElement>(
      'aside[aria-label="Contact shortcut"]',
    );
    const nodes = [header, footer, cta].filter((node): node is HTMLElement =>
      Boolean(node),
    );
    for (const node of nodes) {
      node.setAttribute("hidden", "");
      node.setAttribute("inert", "");
    }
    return () => {
      for (const node of nodes) {
        node.removeAttribute("hidden");
        node.removeAttribute("inert");
      }
    };
  }, []);

  useEffect(() => {
    if (!servicesOpen && !drawerOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      setDrawerOpen(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [servicesOpen, drawerOpen]);

  return (
    <article className="grok-page" ref={rootRef}>
      <header className="grok-header">
        <Link href="/" className="grok-wordmark">
          {profile.name}
        </Link>

        <nav className="grok-nav" aria-label="Primary">
          <div
            className="grok-services"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="grok-nav__link"
              aria-expanded={servicesOpen}
              aria-controls={menuId}
              onClick={(event) => {
                if (event.detail === 0) {
                  setServicesOpen((open) => !open);
                  return;
                }
                setServicesOpen(true);
              }}
            >
              Services
              <Chevron open={servicesOpen} />
            </button>
            <div className="grok-menu" id={menuId} hidden={!servicesOpen}>
              <ul>
                {serviceNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={
                        item.href === "/services/data-management" ? "page" : undefined
                      }
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link href="/projects" className="grok-nav__link">
            Portfolio
          </Link>
          <Link href="/contact" className="grok-contact">
            Contact
          </Link>
        </nav>

        <button
          type="button"
          className="grok-drawer-button"
          aria-expanded={drawerOpen}
          aria-controls={drawerId}
          onClick={() => setDrawerOpen((open) => !open)}
        >
          {drawerOpen ? "Close" : "Menu"}
        </button>
      </header>

      <div className="grok-drawer" id={drawerId} hidden={!drawerOpen}>
        <p>Services</p>
        <ul>
          {serviceNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.title}</Link>
            </li>
          ))}
        </ul>
        <Link href="/projects">Portfolio</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <div className="grok-hero">
        <div className="grok-copy">
          <p className="grok-kicker">
            <span>Data management</span>
            <span className="grok-kicker__rule" aria-hidden="true" />
          </p>
          <h1>
            <span>one record,</span>
            <span>every system</span>
          </h1>
          <p className="grok-lede">
            Postgres owns the row. Every system stays in sync.
          </p>
          <Link href="/contact" className="grok-cta">
            Start a conversation
            <Arrow />
          </Link>
        </div>
        <GlassStage />
      </div>
    </article>
  );
}
