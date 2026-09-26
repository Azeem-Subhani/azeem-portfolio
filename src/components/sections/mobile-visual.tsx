"use client";

import { Calendar, Check, MessageCircle, Send, Users } from "lucide-react";
import { motion, type Variants } from "motion/react";

import { useInViewOnce } from "@/hooks/use-in-view-once";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const settle = [0.16, 1, 0.3, 1] as const;

const stage: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const tabletIn: Variants = {
  hidden: { opacity: 0, x: -72, rotateY: -32, rotate: -8 },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    rotate: -8,
    transition: { duration: 0.85, ease: settle },
  },
};

const phoneIn: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.82, rotateX: 8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.8, ease: settle },
  },
};

const screen: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.28, staggerChildren: 0.07 },
  },
};

const pass: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: settle },
  },
};

const pop: Variants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 16 },
  },
};

const bubble: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

const dock: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: settle },
  },
};

const faces = [
  { initials: "MR", className: "bg-accent text-accent-foreground" },
  { initials: "AK", className: "bg-signal text-foreground" },
  { initials: "JL", className: "bg-surface-elevated text-accent" },
  { initials: "TP", className: "bg-accent/35 text-foreground" },
  { initials: "NS", className: "bg-signal/40 text-foreground" },
];

const spots = [
  { x: 50, y: 86 },
  { x: 16, y: 68 },
  { x: 38, y: 70 },
  { x: 62, y: 70 },
  { x: 84, y: 68 },
  { x: 28, y: 46 },
  { x: 50, y: 42 },
  { x: 72, y: 46 },
  { x: 24, y: 22 },
  { x: 50, y: 16 },
  { x: 76, y: 22 },
];

const tabs = [
  { label: "Match", icon: Calendar, active: true },
  { label: "Squad", icon: Users, active: false },
  { label: "Chat", icon: MessageCircle, active: false },
];

function StatusBar({ time }: { time: string }) {
  return (
    <div className="flex items-end justify-between px-5 pb-1 pt-3 text-[10px] font-medium text-muted-foreground">
      <span>{time}</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 16 12" className="h-2.5 w-3.5 fill-current" aria-hidden="true">
          <rect x="0" y="6" width="2.2" height="6" rx="0.4" />
          <rect x="3.6" y="3.5" width="2.2" height="8.5" rx="0.4" />
          <rect x="7.2" y="1" width="2.2" height="11" rx="0.4" />
          <rect x="10.8" y="0" width="2.2" height="12" rx="0.4" opacity="0.35" />
        </svg>
        <svg viewBox="0 0 24 12" className="h-2.5 w-5 fill-current" aria-hidden="true">
          <rect
            x="0"
            y="1"
            width="18"
            height="10"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <rect x="2" y="3" width="12" height="6" rx="1" />
          <rect x="19" y="4" width="2" height="4" rx="0.6" />
        </svg>
      </span>
    </div>
  );
}

function KitMark({
  letters,
  away,
}: {
  letters: string;
  away?: boolean;
}) {
  return (
    <div
      className={`relative flex h-[3.6rem] w-[2.85rem] items-center justify-center overflow-hidden rounded-xl ${
        away ? "bg-signal text-foreground" : "bg-accent text-accent-foreground"
      }`}
    >
      <span
        className={`absolute inset-y-0 w-[22%] ${away ? "bg-foreground/20" : "bg-background/20"}`}
        style={{ left: "28%" }}
      />
      <span
        className={`absolute inset-y-0 w-[10%] ${away ? "bg-foreground/12" : "bg-background/12"}`}
        style={{ left: "54%" }}
      />
      <span className="relative font-display text-[1.35rem] leading-none tracking-tight">
        {letters}
      </span>
    </div>
  );
}

function Pitch() {
  return (
    <motion.div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-background" variants={pass}>
      <svg
        viewBox="0 0 100 132"
        className="absolute inset-0 h-full w-full text-accent/45"
        aria-hidden="true"
      >
        <rect x="5" y="5" width="90" height="122" rx="3" fill="rgb(42 161 152 / 0.08)" stroke="currentColor" strokeWidth="0.9" />
        <line x1="5" y1="66" x2="95" y2="66" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="50" cy="66" r="11" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="50" cy="66" r="1.2" fill="currentColor" />
        <rect x="24" y="5" width="52" height="20" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <rect x="24" y="107" width="52" height="20" fill="none" stroke="currentColor" strokeWidth="0.7" />
      </svg>
      {spots.map((spot, index) => (
        <motion.span
          key={index}
          className="absolute size-2.5 rounded-full bg-accent shadow-[0_0_10px_rgb(42_161_152/0.75)]"
          style={{ left: `${spot.x}%`, top: `${spot.y}%`, marginLeft: -5, marginTop: -5 }}
          variants={pop}
        />
      ))}
    </motion.div>
  );
}

function CoachTablet() {
  return (
    <motion.div
      className="absolute left-2 top-8 hidden w-[19.5rem] origin-center md:block lg:left-0"
      style={{ transformStyle: "preserve-3d" }}
      variants={tabletIn}
    >
      <motion.div
        className="rounded-[2.2rem] bg-background p-[9px] shadow-[0_0_0_1px_rgb(42_161_152/0.18),0_28px_50px_-24px_rgb(7_54_66/0.45)]"
        variants={pass}
      >
        <motion.div
          className="relative flex h-[27.5rem] flex-col overflow-hidden rounded-[1.7rem] bg-surface px-4 pb-4"
          variants={screen}
        >
          <motion.div variants={fade}>
            <StatusBar time="5:47" />
          </motion.div>
          <motion.div className="mt-1 flex items-center justify-between" variants={fade}>
            <div>
              <p className="text-[11px] text-muted-foreground">Coach board</p>
              <p className="font-display text-2xl leading-none text-foreground">4-3-3</p>
            </div>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-accent">
              synced
            </span>
          </motion.div>
          <motion.div className="mt-3 min-h-0 flex-1" variants={pass}>
            <Pitch />
          </motion.div>
          <motion.p className="mt-3 text-[11px] text-muted-foreground" variants={fade}>
            Maya in goal. 14 confirmed for Riverside.
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function PlayerPhone({ reduced }: { reduced: boolean }) {
  return (
    <motion.div
      className="relative z-20 w-[min(100%,17.75rem)] origin-center md:translate-x-12"
      style={{ transformStyle: "preserve-3d" }}
      variants={phoneIn}
    >
      <motion.div
        className="relative rounded-[2.75rem] bg-background p-[10px] shadow-[0_0_0_1px_rgb(42_161_152/0.28),0_36px_70px_-28px_rgb(7_54_66/0.55)]"
        variants={pass}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2.75rem] ring-1 ring-inset ring-foreground/12" />
        <motion.div
          className="relative flex h-[35rem] flex-col overflow-hidden rounded-[2.05rem] bg-surface"
          variants={screen}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-linear-to-b from-accent/15 to-transparent" />
          <div className="absolute left-1/2 top-[7px] z-20 h-[1.35rem] w-[5.15rem] -translate-x-1/2 rounded-full bg-background shadow-[inset_0_1px_2px_rgb(0_43_54/0.85)]" />

          <motion.div variants={fade}>
            <StatusBar time="5:47" />
          </motion.div>

          <motion.div className="flex min-h-0 flex-1 flex-col px-3.5 pb-3 pt-1" variants={pass}>
            <motion.div className="flex items-center justify-between" variants={fade}>
              <p className="text-[11px] font-medium text-foreground">Sports Team</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                <span className="relative flex size-1.5">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full bg-accent-foreground opacity-70 ${
                      reduced ? "" : "animate-ping"
                    }`}
                  />
                  <span className="relative inline-flex size-1.5 rounded-full bg-accent-foreground" />
                </span>
                KO in 13m
              </span>
            </motion.div>

            <motion.div
              className="relative mt-3 overflow-hidden rounded-3xl bg-background px-3 py-3.5"
              variants={pop}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -top-8 size-24 rounded-full bg-accent/25 blur-2xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-8 -left-6 size-24 rounded-full bg-signal/20 blur-2xl"
              />
              <div className="relative flex items-center justify-between gap-2">
                <KitMark letters="OX" />
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground">Riverside</p>
                  <p className="font-display text-[1.65rem] leading-none text-foreground">6:00</p>
                  <p className="mt-0.5 text-[10px] font-medium text-accent">vs</p>
                </div>
                <KitMark letters="NS" away />
              </div>
              <p className="relative mt-3 text-center text-[11px] text-muted-foreground">
                Saturday kickoff · both kits
              </p>
            </motion.div>

            <motion.div className="mt-3.5 flex items-center" variants={fade}>
              <div className="flex">
                {faces.map((face, index) => (
                  <motion.span
                    key={face.initials}
                    className={`flex size-8 items-center justify-center rounded-full text-[9px] font-medium ring-2 ring-surface ${face.className}`}
                    style={{ marginLeft: index === 0 ? 0 : -8, zIndex: faces.length - index }}
                    variants={pop}
                  >
                    {face.initials}
                  </motion.span>
                ))}
              </div>
              <p className="ml-2.5 text-[12px] text-accent">14 going</p>
            </motion.div>

            <motion.div className="mt-3.5 grid gap-2" variants={pass}>
              <motion.div className="flex items-end gap-2" variants={bubble}>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-signal text-[9px] font-medium text-foreground">
                  AK
                </span>
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-signal/20 px-3 py-2">
                  <p className="text-[12px] leading-4 text-foreground">Bus just pulled up.</p>
                </div>
              </motion.div>
              <motion.div className="flex items-end justify-end gap-2" variants={bubble}>
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-accent px-3 py-2">
                  <p className="text-[12px] leading-4 text-accent-foreground">
                    Got both. Two minutes out.
                  </p>
                </div>
              </motion.div>
              <motion.div className="flex items-end gap-2" variants={bubble}>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-accent-foreground">
                  MR
                </span>
                <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-background px-3 py-2">
                  <p className="text-[12px] leading-4 text-foreground">Warm-up 5:30 on pitch 2.</p>
                </div>
              </motion.div>
              {/* Typing indicator fills the thread so the chat reads live, not cut off. */}
              <motion.div className="flex items-center gap-2" variants={bubble}>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-signal/40 text-[9px] font-medium text-foreground">
                  NS
                </span>
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-background px-3 py-2.5">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className={`size-1.5 rounded-full bg-muted-foreground/60 ${reduced ? "" : "animate-pulse"}`}
                      style={{ animationDelay: `${dot * 160}ms` }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="mt-auto flex items-center gap-2" variants={fade}>
              <motion.div
                className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-accent py-2.5 text-[13px] font-medium text-accent-foreground"
                variants={pop}
              >
                <Check className="size-3.5" strokeWidth={2.5} />
                I&apos;m in
              </motion.div>
              <motion.span
                className="flex size-11 items-center justify-center rounded-2xl bg-background text-foreground"
                variants={pop}
              >
                <Send className="size-4" strokeWidth={2} />
              </motion.span>
            </motion.div>
          </motion.div>

          <motion.div className="border-t border-border bg-background px-2 pb-1.5 pt-2" variants={dock}>
            <div className="grid grid-cols-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <div
                    key={tab.label}
                    className={`flex flex-col items-center gap-0.5 ${
                      tab.active ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    <Icon className="size-4" strokeWidth={1.75} />
                    <span className="text-[9px] font-medium">{tab.label}</span>
                  </div>
                );
              })}
            </div>
            <div className="mx-auto mt-2 h-1 w-28 rounded-full bg-muted-foreground/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function MobileVisual() {
  const reduced = usePrefersReducedMotion();
  const { ref: stageRef, inView } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      className="relative mx-auto w-full max-w-[20rem] overflow-visible px-3 md:max-w-[34rem] md:px-6"
      style={{ perspective: 1400 }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] h-72 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30 blur-3xl"
      />

      <div className="relative">
        <motion.div
          ref={stageRef}
          className="relative flex min-h-[36rem] items-center justify-center overflow-visible md:min-h-[38rem]"
          variants={stage}
          initial={reduced ? false : "hidden"}
          animate={reduced || inView ? "visible" : "hidden"}
        >
          <CoachTablet />
          <PlayerPhone reduced={reduced} />
        </motion.div>
      </div>
    </div>
  );
}
