"use client";

import LogoLoop from "@/components/react-bits/LogoLoop";

/**
 * Moving band of every tool on the page. Decorative: the stack groups below list the
 * same names as text, so the band is hidden from assistive tech. LogoLoop itself
 * stops moving for reduced-motion visitors.
 */
export function IndustryStackLoop({ items, label }: { items: string[]; label: string }) {
  return (
    <div aria-hidden="true" className="mt-12 overflow-x-hidden text-foreground">
      <LogoLoop
        logos={items.map((item) => ({
          node: (
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-2 text-sm text-foreground/80">
              <span className="size-1.5 rounded-full bg-accent" />
              {item}
            </span>
          ),
          title: item,
        }))}
        speed={45}
        gap={12}
        logoHeight={16}
        pauseOnHover
        fadeOut
        ariaLabel={label}
      />
    </div>
  );
}
