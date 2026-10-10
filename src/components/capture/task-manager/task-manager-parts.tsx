import type { ReactNode } from "react";

/*
 * Shared pieces for the Posy captures (Today, task detail, upcoming, phone).
 *
 * Nothing here uses element ids or url(#...) references. The stage mounts each capture twice
 * (a mobile copy and a desktop copy), and an id inside the display:none copy can stop the
 * visible copy from painting. Halftone and grain are CSS tiles in task-manager-capture.css
 * for the same reason.
 */

export type ListName = "work" | "home" | "personal" | "book";

const LIST_LABELS: Record<ListName, string> = {
  work: "Work",
  home: "Home",
  personal: "Personal",
  book: "Book club",
};

/** A list label drawn as a sticker: a tilted pill with a paper ring around it. */
export function ListTag({ list }: { list: ListName }) {
  return <span className={`tm-tag tm-tag--${list}`}>{LIST_LABELS[list]}</span>;
}

/** Time chip. The hot variant (due soon) is ink with a butter dot. */
export function TimeChip({ children, hot = false }: { children: ReactNode; hot?: boolean }) {
  return (
    <span className={hot ? "tm-time tm-time--hot" : "tm-time"}>
      {hot ? <i className="tm-time-dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

/** Hand-drawn check: a slightly wobbly stroke rather than a geometric tick. */
export function HandCheck({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3.1 12.4c1.5.3 2.8 1.5 3.8 3.2 2.1-4.2 5.5-8.6 11.6-11.9"
        stroke="currentColor"
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Pen-drawn underline, or a strike with variant="strike". It stretches to the width and height
 * of its box, and vector-effect keeps the pen weight constant at any size.
 */
export function HandLine({
  variant = "under",
  className,
}: {
  variant?: "under" | "strike";
  className?: string;
}) {
  const d =
    variant === "strike"
      ? "M0.5 7.2C34 4.1 69 8.9 103 5.9S168 4.2 199.5 6.6"
      : "M0.5 6.4C42 9.7 84 3.6 126 6.9S180 5.6 199.5 7.4";
  return (
    <svg
      className={className}
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** The Posy mark: four tomato petals around a paper centre. */
export function PosyBloom({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <circle className="tm-bloom-petal" cx="20" cy="11.6" r="7.6" />
      <circle className="tm-bloom-petal" cx="28.4" cy="20" r="7.6" />
      <circle className="tm-bloom-petal" cx="20" cy="28.4" r="7.6" />
      <circle className="tm-bloom-petal" cx="11.6" cy="20" r="7.6" />
      <circle className="tm-bloom-core" cx="20" cy="20" r="4.2" />
    </svg>
  );
}

/** Check mark for the verified-email and session cues. */
export function VerifiedMark({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6.5 9.4 17.1 4 11.7" />
    </svg>
  );
}

export type IconName =
  | "today"
  | "upcoming"
  | "someday"
  | "completed"
  | "search"
  | "bell"
  | "plus"
  | "sort"
  | "share"
  | "back"
  | "prev"
  | "next"
  | "pause"
  | "play";

const ICON_SHAPES: Record<IconName, ReactNode> = {
  today: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M2.5 12h2M19.5 12h2M5.2 18.8l1.4-1.4M17.4 6.6l1.4-1.4" />
    </>
  ),
  upcoming: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="3.2" />
      <path d="M3.4 10h17.2M8.5 3v4M15.5 3v4" />
    </>
  ),
  someday: (
    <>
      <path d="M4 8.5 12 4l8 4.5v9L12 22l-8-4.5z" />
      <path d="M4 8.5 12 13l8-4.5M12 13v9" />
    </>
  ),
  completed: (
    <>
      <circle cx="12" cy="12" r="8.6" />
      <path d="M8.4 12.2l2.5 2.5 4.7-5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.6-3.6" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8.5a6 6 0 1 0-12 0c0 6-2.2 7.5-2.2 7.5h16.4S18 14.5 18 8.5" />
      <path d="M10.2 19.5a2 2 0 0 0 3.6 0" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  sort: <path d="M4 6h16M7 12h10M10 18h4" />,
  share: (
    <>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M16 6l-4-4-4 4M12 2v13" />
    </>
  ),
  back: <path d="m14.5 5.5-6.5 6.5 6.5 6.5" />,
  prev: <path d="M15 6l-6 6 6 6" />,
  next: <path d="M9 6l6 6-6 6" />,
  pause: <path d="M8.5 5.5v13M15.5 5.5v13" />,
  play: <path d="M7 4.5v15l13-7.5z" fill="currentColor" stroke="none" />,
};

/** Line icon on a 24px grid with round caps. */
export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {ICON_SHAPES[name]}
    </svg>
  );
}

type StampProps = { done: number; total: number; size?: "lg" | "sm" };

/**
 * Progress stamp: a butter disc with a halftone shade, an ink ring, and a tomato arc for the
 * share of tasks done. The cobalt plate behind it is the misregistered second colour.
 */
export function ProgressStamp({ done, total, size = "lg" }: StampProps) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const share = total > 0 ? done / total : 0;
  return (
    <div className={size === "sm" ? "tm-stamp tm-stamp--sm" : "tm-stamp"} aria-hidden="true">
      <span className="tm-stamp-plate" />
      <span className="tm-stamp-disc">
        <span className="tm-stamp-shade" />
      </span>
      <svg className="tm-stamp-ring" viewBox="0 0 160 160" fill="none">
        <circle className="tm-stamp-outer" cx="80" cy="80" r="77" strokeWidth="2.2" />
        <circle className="tm-stamp-track" cx="80" cy="80" r={radius} strokeWidth="7" />
        <circle
          className="tm-stamp-arc"
          cx="80"
          cy="80"
          r={radius}
          strokeWidth="7"
          strokeDasharray={`${share * circumference} ${circumference}`}
          transform="rotate(-90 80 80)"
        />
        <circle
          className="tm-stamp-inner"
          cx="80"
          cy="80"
          r="58"
          strokeWidth="1.4"
          strokeDasharray="0.1 5.2"
          strokeLinecap="round"
        />
      </svg>
      <span className="tm-stamp-core">
        <span className="tm-stamp-num">{done}</span>
        <span className="tm-stamp-of">of {total} done</span>
      </span>
    </div>
  );
}

type CalendarProps = {
  /** Day of March that is today. */
  today?: number;
  /** Inclusive range to highlight as the upcoming week. */
  weekFrom?: number;
  weekTo?: number;
  /** Days with tasks; each gets a cobalt dot. */
  eventDays?: number[];
};

const WEEKDAY_LETTERS = ["M", "T", "W", "T", "F", "S", "S"];

/** March on a Monday-first grid. March 1 falls on a Monday, so only the tail needs padding. */
export function MarchCalendar({ today, weekFrom, weekTo, eventDays = [] }: CalendarProps) {
  const days: (number | null)[] = Array.from({ length: 31 }, (_, index) => index + 1);
  while (days.length % 7 !== 0) days.push(null);

  return (
    <div className="tm-cal-grid">
      {WEEKDAY_LETTERS.map((letter, index) => (
        <div key={`weekday-${index}`} className="tm-cal-wd">
          {letter}
        </div>
      ))}
      {days.map((day, index) => {
        if (day === null) {
          return <div key={`blank-${index}`} className="tm-cal-d tm-is-blank" />;
        }
        const inWeek =
          weekFrom !== undefined && weekTo !== undefined && day >= weekFrom && day <= weekTo;
        const classes = ["tm-cal-d"];
        if (inWeek) classes.push("tm-is-week");
        if (day === today) classes.push("tm-is-today");
        return (
          <div key={`day-${day}`} className={classes.join(" ")}>
            {day}
            {eventDays.includes(day) ? <i /> : null}
          </div>
        );
      })}
    </div>
  );
}
