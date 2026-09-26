"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import { industryIcons, serviceIcons } from "@/components/layout/service-icons";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { industryNav, primaryNav, serviceNav } from "@/content/nav";

// Grouped sections at the top of the sheet, in the same order as the desktop dropdowns.
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

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation"
        >
          <Menu aria-hidden="true" className="size-5" />
        </Button>
      </SheetTrigger>
      {/* No description: the title and link list say it all. Opting out explicitly
          keeps Radix from warning about a missing SheetDescription. */}
      <SheetContent side="right" className="bg-background" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <nav aria-label="Mobile navigation" className="mt-8">
          <ul className="grid gap-2">
            {menuGroups.map((group) => (
              <li key={group.label}>
                <p className="px-4 pb-1 text-sm text-muted-foreground">{group.label}</p>
                <ul className="grid gap-1">
                  {group.items.map(({ Icon, ...item }) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className="flex min-h-11 items-start gap-3 rounded-lg px-4 py-3 hover:bg-surface-elevated"
                        >
                          <span className="services-menu-icon mt-0.5" data-tone={item.tone}>
                            <Icon aria-hidden="true" className="size-4" />
                          </span>
                          <span className="grid gap-0.5">
                            <span className="text-base font-medium">{item.title}</span>
                            <span className="text-sm leading-snug text-muted-foreground">
                              {item.copy}
                            </span>
                          </span>
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            {primaryNav.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    className="block min-h-11 rounded-lg px-4 py-3 text-lg hover:bg-surface-elevated"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
