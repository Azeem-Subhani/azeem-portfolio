"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, type LucideIcon } from "lucide-react";

import { industryIcons, serviceIcons } from "@/components/layout/service-icons";
import { industryNav, serviceNav } from "@/content/nav";
import { cn } from "@/lib/utils";

export const navItemClassName =
  "inline-flex min-h-8 items-center gap-1 rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current]:bg-background aria-[current]:text-foreground";

type NavMenuItem<Tone extends string> = {
  href: string;
  title: string;
  copy: string;
  tone: Tone;
};

type NavMenuProps<Tone extends string> = {
  label: string;
  items: readonly NavMenuItem<Tone>[];
  icons: Record<Tone, LucideIcon>;
  /** Routes under this prefix mark the trigger as current. */
  currentPrefix: string;
};

/** Fired when a menu opens so any other open header menu closes at once instead of overlapping. */
const MENU_OPEN_EVENT = "site-nav-menu-open";

/** Header dropdown shared by Services and Industries: same panel, motion, and keyboard model. */
function NavMenu<Tone extends string>({ label, items, icons, currentPrefix }: NavMenuProps<Tone>) {
  const pathname = usePathname();
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const closeTimer = useRef<number>(0);
  const focusOnOpen = useRef(false);
  const pointerType = useRef("");
  const [open, setOpen] = useState(false);
  const [menuPath, setMenuPath] = useState(pathname);

  // Close the menu on navigation by adjusting state during render, not in an effect.
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }
  const current = pathname.startsWith(currentPrefix);

  const cancelClose = () => {
    window.clearTimeout(closeTimer.current);
  };

  const openMenu = (focus = false) => {
    cancelClose();
    focusOnOpen.current = focus;
    setOpen(true);
  };

  useEffect(() => {
    const onOtherOpen = (event: Event) => {
      if ((event as CustomEvent<string>).detail !== menuId) {
        window.clearTimeout(closeTimer.current);
        setOpen(false);
      }
    };
    window.addEventListener(MENU_OPEN_EVENT, onOtherOpen);
    return () => window.removeEventListener(MENU_OPEN_EVENT, onOtherOpen);
  }, [menuId]);

  const closeMenu = () => {
    cancelClose();
    setOpen(false);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => cancelClose, [pathname]);

  useEffect(() => {
    return () => window.clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    if (open) window.dispatchEvent(new CustomEvent(MENU_OPEN_EVENT, { detail: menuId }));
  }, [open, menuId]);

  useEffect(() => {
    if (!open) return;

    if (focusOnOpen.current) {
      itemsRef.current[0]?.focus();
      focusOnOpen.current = false;
    }

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        buttonRef.current?.focus();
        return;
      }

      if (event.key === "Tab") {
        closeMenu();
        return;
      }

      const items = itemsRef.current.filter((item): item is HTMLAnchorElement =>
        Boolean(item),
      );
      if (!items.length) return;

      const index = items.findIndex((item) => item === document.activeElement);
      const cols = Math.min(2, items.length);
      if (index < 0) {
        if (
          event.key === "ArrowDown" ||
          event.key === "ArrowRight" ||
          event.key === "Home"
        ) {
          event.preventDefault();
          items[0]?.focus();
        } else if (
          event.key === "ArrowUp" ||
          event.key === "ArrowLeft" ||
          event.key === "End"
        ) {
          event.preventDefault();
          items[items.length - 1]?.focus();
        }
        return;
      }
      if ((event.key === "ArrowRight" || event.key === "ArrowLeft") && cols < 2) {
        event.preventDefault();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        const col = index % cols;
        items[col === cols - 1 ? index - 1 : index + 1]?.focus();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        const col = index % cols;
        items[col === 0 ? index + 1 : index - 1]?.focus();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        items[(index + cols) % items.length]?.focus();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        items[(index - cols + items.length) % items.length]?.focus();
      } else if (event.key === "Home") {
        event.preventDefault();
        items[0]?.focus();
      } else if (event.key === "End") {
        event.preventDefault();
        items[items.length - 1]?.focus();
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") openMenu();
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        className={cn(navItemClassName, open && "text-foreground")}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-current={current ? "true" : undefined}
        onPointerDown={(event) => {
          pointerType.current = event.pointerType;
        }}
        onClick={() => {
          if (pointerType.current === "mouse") {
            openMenu();
            return;
          }
          setOpen((value) => !value);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" && !open) {
            event.preventDefault();
            openMenu(true);
          }
        }}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 opacity-70 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        id={menuId}
        data-open={open ? "true" : "false"}
        data-cols={Math.min(2, items.length)}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
        className="services-menu"
      >
        <ul role="menu" aria-label={label} className="services-menu-panel">
          {items.map((item, index) => {
            const selected = pathname === item.href;
            const Icon: LucideIcon = icons[item.tone];
            return (
              <li
                key={item.href}
                role="none"
                className="services-menu-item"
                style={{ animationDelay: `${50 + index * 45}ms` }}
              >
                <Link
                  ref={(node) => {
                    itemsRef.current[index] = node;
                  }}
                  href={item.href}
                  role="menuitem"
                  tabIndex={-1}
                  aria-current={selected ? "page" : undefined}
                  className={cn(
                    "services-menu-link",
                    selected && "is-current",
                  )}
                >
                  <span className="services-menu-icon" data-tone={item.tone}>
                    <Icon aria-hidden="true" className="size-4" />
                  </span>
                  <span className="services-menu-copy">
                    <span className="services-menu-title">{item.title}</span>{" "}
                    <span className="services-menu-blurb">{item.copy}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function ServicesNav() {
  return <NavMenu label="Services" items={serviceNav} icons={serviceIcons} currentPrefix="/services/" />;
}

export function IndustriesNav() {
  return (
    <NavMenu label="Industries" items={industryNav} icons={industryIcons} currentPrefix="/industries/" />
  );
}
