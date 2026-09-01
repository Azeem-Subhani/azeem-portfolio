"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { useReveal } from "@/hooks/use-reveal";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

function isCurrentPath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const ref = useReveal<HTMLElement>({ translateY: -12, durationMs: 400 });

  return (
    <header
      ref={ref}
      className="sticky top-0 z-50 px-4 pt-4 sm:px-6"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between rounded-full border border-border bg-glass px-4 shadow-lg shadow-black/5 backdrop-blur-xl sm:px-6">
        <Link
          href="/"
          aria-label="Azeem Subhani, home"
          className="font-display text-lg font-normal tracking-tight"
        >
          Azeem Subhani
        </Link>

        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const current = isCurrentPath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:bg-surface-elevated aria-[current=page]:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">Start a conversation</Link>
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
