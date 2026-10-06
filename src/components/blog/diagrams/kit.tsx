import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

// Shared primitives for blog diagrams. Everything paints with theme utilities
// (fill-background, stroke-accent, ...) so diagrams follow the light/dark toggle.
// Diagrams use a 640-unit-wide viewBox with 15px+ text, which stays legible
// when scaled to a 390px phone.

export const DIAGRAM_W = 640;

type Tone = "default" | "accent" | "warn" | "muted";

const boxTone: Record<Tone, string> = {
  default: "fill-background stroke-muted-foreground/45",
  accent: "fill-background stroke-accent",
  warn: "fill-background stroke-[#CB4B16]",
  muted: "fill-foreground/[0.04] stroke-muted-foreground/25",
};

const lineTone: Record<Tone, string> = {
  default: "stroke-muted-foreground/60",
  accent: "stroke-accent",
  warn: "stroke-[#CB4B16]",
  muted: "stroke-muted-foreground/30",
};

const headTone: Record<Tone, string> = {
  default: "fill-muted-foreground/60",
  accent: "fill-accent",
  warn: "fill-[#CB4B16]",
  muted: "fill-muted-foreground/30",
};

export function Diagram({
  id,
  height,
  title,
  children,
}: {
  // Unique per diagram: prefixes the arrowhead marker ids, since several SVGs share a page.
  id: string;
  height: number;
  // Read by screen readers in place of the drawing.
  title: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${DIAGRAM_W} ${height}`}
      role="img"
      aria-labelledby={`${id}-title`}
      // 560px floor keeps 13-14px labels at ~11px or larger on phones; Figure scrolls it.
      className="block h-auto w-full min-w-[560px]"
      fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
    >
      <title id={`${id}-title`}>{title}</title>
      <defs>
        {(Object.keys(headTone) as Tone[]).map((tone) => (
          <marker
            key={tone}
            id={`${id}-head-${tone}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className={headTone[tone]} />
          </marker>
        ))}
      </defs>
      {children}
    </svg>
  );
}

export function Box({
  x,
  y,
  w,
  h,
  title,
  sub,
  tone = "default",
  size = "md",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  tone?: Tone;
  size?: "sm" | "md";
}) {
  const cx = x + w / 2;
  const titleSize = size === "sm" ? 15 : 18;
  // Center the one or two text lines vertically in the box.
  const titleY = sub ? y + h / 2 - 4 : y + h / 2 + titleSize / 3;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} strokeWidth={tone === "accent" ? 2.25 : 1.5} className={boxTone[tone]} />
      <text x={cx} y={titleY} textAnchor="middle" fontSize={titleSize} fontWeight={600} className="fill-foreground">
        {title}
      </text>
      {sub ? (
        <text x={cx} y={titleY + 21} textAnchor="middle" fontSize={14} className="fill-muted-foreground">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

export function Arrow({
  diagram,
  d,
  tone = "default",
  dashed,
  head = true,
}: {
  diagram: string;
  d: string;
  tone?: Tone;
  dashed?: boolean;
  head?: boolean;
}) {
  return (
    <path
      d={d}
      strokeWidth={1.5}
      strokeDasharray={dashed ? "5 5" : undefined}
      markerEnd={head ? `url(#${diagram}-head-${tone})` : undefined}
      className={cn("fill-none", lineTone[tone])}
    />
  );
}

export function Label({
  x,
  y,
  children,
  anchor = "middle",
  tone = "muted",
  size = 14,
  weight,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  tone?: "muted" | "fg" | "accent" | "warn";
  size?: number;
  weight?: number;
}) {
  const fill = {
    muted: "fill-muted-foreground",
    fg: "fill-foreground",
    accent: "fill-accent",
    warn: "fill-[#CB4B16]",
  }[tone];
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} className={fill}>
      {children}
    </text>
  );
}
