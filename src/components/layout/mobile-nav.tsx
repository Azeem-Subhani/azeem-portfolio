"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

import { industryIcons, serviceIcons } from "@/components/layout/service-icons";
import { Button } from "@/components/ui/button";
import { industryNav, primaryNav, serviceNav } from "@/content/nav";
import { cn } from "@/lib/utils";

// Grouped sections at the top of the panel, in the same order as the desktop dropdowns.
const menuGroups = [
  {
    label: "Services",
    items: serviceNav.map((item) => ({ ...item, Icon: serviceIcons[item.tone] })),
  },
  {
    label: "Industries",
    items: industryNav.map((item) => ({ ...item, Icon: industryIcons[item.tone] })),
  },
];

const pageLinks = primaryNav.filter((item) => item.href !== "/contact");

function isCurrentPath(pathname: string, href: string) {
  return pathname.startsWith(href);
}

/**
 * Open state for the phone menu. The header owns it because the toggle sits in
 * the right-hand tray while the panel hangs off the full-width bar below it.
 */
export function useMobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedOn, setOpenedOn] = useState(pathname);

  // A route change (link, back, forward) closes the menu. Adjusted during render
  // rather than in an effect so the old page never paints with the menu open.
  if (openedOn !== pathname) {
    setOpenedOn(pathname);
    if (open) setOpen(false);
  }

  return { open, setOpen };
}

type ToggleProps = {
  open: boolean;
  controls: string;
  onToggle: () => void;
  ref?: React.Ref<HTMLButtonElement>;
};

export function MobileNavToggle({ open, controls, onToggle, ref }: ToggleProps) {
  return (
    <Button
      ref={ref}
      type="button"
      variant="ghost"
      size="icon"
      className="md:hidden"
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls={controls}
      onClick={onToggle}
    >
      {open ? (
        <X aria-hidden="true" className="size-5" />
      ) : (
        <Menu aria-hidden="true" className="size-5" />
      )}
    </Button>
  );
}

type PanelProps = {
  id: string;
  open: boolean;
  onClose: (options?: { restoreFocus?: boolean }) => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
};

/**
 * Disclosure panel under the header bar: Services and Industries fold open in
 * place, then the page links, then a full-width Contact button. It is not a
 * modal, so the page stays scrollable, and Escape, an outside tap, or widening
 * past the md breakpoint closes it.
 */
export function MobileNavPanel({ id, open, onClose, toggleRef }: PanelProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [wasOpen, setWasOpen] = useState(open);
  const groupId = useId();

  // Each opening starts with the groups folded, however the menu was left.
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) setExpanded(null);
  }

  useEffect(() => {
    if (!open) return;

    // The floating contact shortcut reads this to step aside while the panel is open.
    const root = document.documentElement;
    root.dataset.mobileNav = "open";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose({ restoreFocus: true });
    };
    const handlePointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      onClose();
    };
    // The desktop nav takes over at md, so a rotated tablet should not keep a stale panel.
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleBreakpoint = () => {
      if (desktop.matches) onClose();
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("pointerdown", handlePointer);
    desktop.addEventListener("change", handleBreakpoint);
    return () => {
      delete root.dataset.mobileNav;
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("pointerdown", handlePointer);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [open, onClose, toggleRef]);

  const closeFromLink = () => onClose();

  return (
    <div
      ref={panelRef}
      id={id}
      hidden={!open}
      data-lenis-prevent
      className={cn(
        "absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-y-auto overscroll-contain rounded-2xl border border-border bg-background p-2 shadow-2xl shadow-black/20 md:hidden",
        "max-h-[calc(100dvh-var(--site-header-bottom,6rem)-1.5rem)]",
        "animate-in fade-in-0 slide-in-from-top-2 duration-200 motion-reduce:animate-none",
      )}
    >
      <nav aria-label="Mobile navigation">
        <ul className="grid">
          {menuGroups.map((group) => {
            const isOpen = expanded === group.label;
            const regionId = `${groupId}-${group.label.toLowerCase()}`;
            const current = group.items.some((item) => isCurrentPath(pathname, item.href));

            return (
              <li key={group.label} className="border-b border-border/70">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={regionId}
                  onClick={() => setExpanded(isOpen ? null : group.label)}
                  className={cn(
                    "flex min-h-14 w-full items-center justify-between rounded-lg px-4 text-left text-lg",
                    current && "text-accent-readable",
                  )}
                >
                  {group.label}
                  <ChevronDown
                    aria-hidden="true"
                    className={cn(
                      "size-5 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                {/* Grid rows animate the height; inert keeps folded links out of the tab order. */}
                <div
                  id={regionId}
                  inert={!isOpen || undefined}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <ul aria-label={group.label} className="grid gap-1.5 overflow-hidden">
                    {group.items.map(({ Icon, ...item }, index) => (
                      <li key={item.href} className={cn(index === group.items.length - 1 && "pb-3")}>
                        <Link
                          href={item.href}
                          onClick={closeFromLink}
                          aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
                          className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/60 px-3 py-3 transition-colors hover:bg-surface-elevated aria-[current]:border-accent/50"
                        >
                          <span className="services-menu-icon shrink-0" data-tone={item.tone}>
                            <Icon aria-hidden="true" className="size-4" />
                          </span>
                          <span className="grid gap-0.5">
                            <span className="text-base font-medium">{item.title}</span>
                            <span className="text-sm leading-snug text-muted-foreground">
                              {item.copy}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
          <li className="pt-2">
            <ul className="grid">
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeFromLink}
                    aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-12 items-center rounded-lg px-4 text-lg transition-colors hover:bg-surface-elevated aria-[current]:text-accent-readable"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="px-2 pb-2 pt-3">
            <Button asChild size="lg" className="w-full">
              <Link href="/contact" onClick={closeFromLink}>
                Contact
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
