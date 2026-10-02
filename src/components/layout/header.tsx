"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import {
  MobileNavPanel,
  MobileNavToggle,
  useMobileNav,
} from "@/components/layout/mobile-nav";
import {
  IndustriesNav,
  ServicesNav,
  navItemClassName,
} from "@/components/layout/services-nav";
import { primaryNav } from "@/content/nav";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

const trayLinks = primaryNav.filter((item) => item.href !== "/contact");

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const { open: menuOpen, setOpen: setMenuOpen } = useMobileNav();
  const closeMenu = useCallback(
    ({ restoreFocus = false }: { restoreFocus?: boolean } = {}) => {
      setMenuOpen(false);
      if (restoreFocus) menuToggleRef.current?.focus();
    },
    [setMenuOpen],
  );

  // Publish the bar's resting bottom edge so sticky page chrome can sit below it.
  // Uses layout offsets, not the bar's rect, so the enter animation's transform is ignored.
  useEffect(() => {
    const header = headerRef.current;
    const bar = barRef.current;
    if (!header || !bar) return;
    const root = document.documentElement;
    const publish = () => {
      const bottom = header.getBoundingClientRect().top + bar.offsetTop + bar.offsetHeight;
      root.style.setProperty("--site-header-bottom", `${Math.ceil(bottom)}px`);
    };
    publish();
    // Re-measure after the 300ms top/padding transition in case transitionend is skipped.
    const settle = window.setTimeout(publish, 350);
    const observer = new ResizeObserver(publish);
    observer.observe(bar);
    header.addEventListener("transitionend", publish);
    window.addEventListener("resize", publish);
    return () => {
      window.clearTimeout(settle);
      observer.disconnect();
      header.removeEventListener("transitionend", publish);
      window.removeEventListener("resize", publish);
    };
  }, [scrolled]);

  return (
    <header
      ref={headerRef}
      data-site-header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center transition-[top,padding] duration-300",
        // At rest the bar is the page container itself (max-w-7xl px-6), so the wordmark lines
        // up with page content. Scrolled, the outer padding keeps the pill off the screen edges.
        scrolled ? "top-4 px-4 sm:px-6" : "top-6 px-0",
      )}
    >
      <div
        ref={barRef}
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between overflow-visible border transition-[max-width,padding,border-radius] duration-300",
          "animate-header-enter motion-reduce:animate-none",
          scrolled
            ? "max-w-6xl rounded-full border-transparent px-3 py-2 sm:px-4"
            : "max-w-7xl rounded-none border-transparent bg-transparent px-6 py-4",
        )}
      >
        {scrolled ? (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full border border-border bg-header-glass shadow-lg shadow-black/5 backdrop-blur-xl"
          />
        ) : null}
        <Link
          href="/"
          aria-label="Azeem Subhani, home"
          className="relative z-10 font-display text-lg font-normal tracking-tight transition-opacity hover:opacity-70"
        >
          Azeem Subhani
        </Link>

        <div
          className={cn(
            "relative z-10 ml-auto flex items-center gap-1",
            !scrolled &&
              "rounded-full border border-border/70 bg-surface/70 px-1.5 py-1 shadow-sm backdrop-blur-md",
          )}
        >
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-1">
              <li>
                <ServicesNav />
              </li>
              <li>
                <IndustriesNav />
              </li>
              {trayLinks.map((item) => {
                const current = isCurrentPath(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={current ? "page" : undefined}
                      className={navItemClassName}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
          <Button
            asChild
            className={cn(
              "hidden sm:inline-flex",
              isCurrentPath(pathname, "/contact") &&
                "ring-2 ring-accent/45 ring-offset-2 ring-offset-background",
            )}
          >
            <Link
              href="/contact"
              aria-current={isCurrentPath(pathname, "/contact") ? "page" : undefined}
            >
              Contact
            </Link>
          </Button>
          <MobileNavToggle
            ref={menuToggleRef}
            open={menuOpen}
            controls={menuId}
            onToggle={() => setMenuOpen((open) => !open)}
          />
        </div>
        <MobileNavPanel
          id={menuId}
          open={menuOpen}
          onClose={closeMenu}
          toggleRef={menuToggleRef}
        />
      </div>
    </header>
  );
}
