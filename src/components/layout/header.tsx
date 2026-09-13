"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { primaryNav } from "@/content/nav";
import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <header
      data-site-header
      data-scrolled={scrolled ? "true" : "false"}
      className={cn(
        "pointer-events-none fixed inset-x-0 z-50 flex justify-center px-4 transition-all duration-300 sm:px-6",
        scrolled ? "top-4" : "top-6",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto relative flex w-full items-center justify-between border transition-all duration-300",
          "animate-header-enter motion-reduce:animate-none",
          scrolled
            ? "max-w-5xl rounded-full border-border bg-header-glass px-4 py-3 shadow-lg shadow-black/5 backdrop-blur-xl sm:px-6"
            : "max-w-7xl rounded-none border-transparent bg-transparent px-0 py-4",
        )}
      >
        <Link
          href="/"
          aria-label="Azeem Subhani, home"
          className="relative z-10 font-display text-lg font-normal tracking-tight"
        >
          Azeem Subhani
        </Link>

        <nav
          aria-label="Primary navigation"
          className="absolute left-1/2 hidden -translate-x-1/2 md:block"
        >
          <ul
            className={cn(
              "flex items-center gap-1",
              scrolled
                ? "px-1"
                : "rounded-full border border-border/70 bg-surface/70 px-1 py-1 backdrop-blur-md",
            )}
          >
            {primaryNav.map((item) => {
              const current = isCurrentPath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-background aria-[current=page]:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">Contact</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
