"use client";

import { AnimatePresence, motion } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

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

const squad = [
  { name: "Maya R.", pos: "GK", in: true },
  { name: "Arun K.", pos: "RB", in: true },
  { name: "Jules L.", pos: "CB", in: true },
  { name: "Tomas P.", pos: "CM", in: false },
  { name: "Nia S.", pos: "ST", in: true },
];

function StatusBar({ time, android }: { time: string; android?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-end justify-between px-4 pb-1 pt-2.5 text-[10px] font-medium text-muted-foreground",
        android && "pt-2",
      )}
    >
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
  compact,
}: {
  letters: string;
  away?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-xl",
        compact ? "h-9 w-7" : "h-[3.4rem] w-[2.7rem]",
        away ? "bg-signal text-foreground" : "bg-accent text-accent-foreground",
      )}
    >
      <span
        className={cn(
          "absolute inset-y-0 w-[22%]",
          away ? "bg-foreground/20" : "bg-background/20",
        )}
        style={{ left: "28%" }}
      />
      <span
        className={cn(
          "relative font-display leading-none tracking-tight",
          compact ? "text-[0.95rem]" : "text-[1.25rem]",
        )}
      >
        {letters}
      </span>
    </div>
  );
}

function MatchCard({ compact }: { compact?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-background", compact ? "px-2.5 py-2.5" : "px-3 py-3")}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 -top-8 size-20 rounded-full bg-accent/25 blur-2xl"
      />
      <div className="relative flex items-center justify-between gap-2">
        <KitMark letters="OX" compact={compact} />
        <div className="text-center">
          <p className="text-[10px] text-muted-foreground">Riverside</p>
          <p
            className={cn(
              "font-display leading-none text-foreground",
              compact ? "text-lg" : "text-[1.55rem]",
            )}
          >
            6:00
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-accent">vs</p>
        </div>
        <KitMark letters="NS" away compact={compact} />
      </div>
      {compact ? null : (
        <p className="relative mt-2.5 text-center text-[11px] text-muted-foreground">
          Saturday kickoff · both kits
        </p>
      )}
    </div>
  );
}

function Pitch({ dense }: { dense?: boolean }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl bg-background", dense ? "h-full min-h-[10rem]" : "aspect-[3/4]")}>
      <svg
        viewBox="0 0 100 132"
        className="absolute inset-0 h-full w-full text-accent/45"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect
          x="5"
          y="5"
          width="90"
          height="122"
          rx="3"
          fill="rgb(42 161 152 / 0.08)"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <line x1="5" y1="66" x2="95" y2="66" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="50" cy="66" r="11" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <circle cx="50" cy="66" r="1.2" fill="currentColor" />
        <rect x="24" y="5" width="52" height="20" fill="none" stroke="currentColor" strokeWidth="0.7" />
        <rect x="24" y="107" width="52" height="20" fill="none" stroke="currentColor" strokeWidth="0.7" />
      </svg>
      {spots.map((spot, index) => (
        <span
          key={index}
          data-mobile-spot
          className="absolute size-2 rounded-full bg-accent shadow-[0_0_10px_rgb(42_161_152/0.75)]"
          style={{ left: `${spot.x}%`, top: `${spot.y}%`, marginLeft: -4, marginTop: -4 }}
        />
      ))}
    </div>
  );
}

function TabBar({ active }: { active: "Match" | "Squad" | "Chat" }) {
  return (
    <div className="mt-auto grid grid-cols-3 border-t border-border pt-2 text-center text-[9px] text-muted-foreground">
      {(["Match", "Squad", "Chat"] as const).map((tab) => (
        <span key={tab} className={tab === active ? "text-accent" : undefined}>
          {tab}
        </span>
      ))}
    </div>
  );
}

/** Two-message thread so phone screens read as a live team chat, not blank space. */
function ChatPreview() {
  return (
    <div className="mt-3 space-y-1.5">
      <p className="text-[10px] text-muted-foreground">Team chat</p>
      <div className="flex items-end gap-1.5">
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-signal text-[8px] font-medium text-foreground">
          AK
        </span>
        <span className="rounded-xl rounded-bl-sm bg-signal/20 px-2.5 py-1.5 text-[11px] leading-4">
          Bus just pulled up.
        </span>
      </div>
      <div className="flex justify-end">
        <span className="rounded-xl rounded-br-sm bg-accent px-2.5 py-1.5 text-[11px] leading-4 text-accent-foreground">
          Two minutes out.
        </span>
      </div>
    </div>
  );
}

function Bezel({
  children,
  className,
  screenClassName,
  island,
  radius = "2.4rem",
  screenRadius = "1.8rem",
}: {
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
  island?: boolean;
  radius?: string;
  screenRadius?: string;
}) {
  return (
    <div
      className={cn("mobile-bezel relative bg-background", className)}
      style={{ borderRadius: radius, padding: 9 }}
    >
      <div
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-foreground/12"
        style={{ borderRadius: radius }}
      />
      <div
        className={cn("relative overflow-hidden bg-surface", screenClassName)}
        style={{ borderRadius: screenRadius }}
      >
        {island ? (
          <div className="absolute left-1/2 top-[6px] z-20 h-[1.1rem] w-[4.2rem] -translate-x-1/2 rounded-full bg-background shadow-[inset_0_1px_2px_rgb(0_43_54/0.85)]" />
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function SyncStage() {
  return (
    <div className="mobile-sync" aria-hidden="true">
      <div className="mobile-sync-pane is-web">
        <div data-mobile-shell="web">
          <div className="mobile-browser">
            <div className="mobile-browser-bar">
              <span />
              <span />
              <span />
              <em>oxym.app/match</em>
            </div>
            <div className="bg-surface px-3.5 pb-4 pt-3">
              <MatchCard />
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-background px-2.5 py-2">
                  <p className="font-display text-xl leading-none">14</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">going</p>
                </div>
                <div className="rounded-2xl bg-background px-2.5 py-2">
                  <p className="font-display text-xl leading-none">4-3-3</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">board</p>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-muted-foreground">Web client. Same roster.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-sync-pane is-phone">
        <div data-mobile-shell="phone">
          <Bezel island className="w-[17rem]" screenClassName="h-[28rem]">
            <StatusBar time="5:47" />
            <div className="flex h-[calc(100%-1.75rem)] flex-col px-3 pb-2 pt-1">
              <p className="text-[11px] font-medium text-foreground">Oxym</p>
              <div className="mt-2">
                <MatchCard />
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-background px-2.5 py-2">
                  <p className="font-display text-xl leading-none">14</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">going</p>
                </div>
                <div className="rounded-2xl bg-background px-2.5 py-2">
                  <p className="font-display text-xl leading-none">4-3-3</p>
                  <p className="mt-1 text-[10px] text-muted-foreground">board</p>
                </div>
              </div>
              <ChatPreview />
              <TabBar active="Match" />
            </div>
          </Bezel>
        </div>
      </div>

      <div className="mobile-sync-pane is-android">
        <div data-mobile-shell="android">
          <Bezel
            radius="1.6rem"
            screenRadius="1.15rem"
            className="w-[15.5rem]"
            screenClassName="h-[26rem]"
          >
            <div className="absolute left-1/2 top-[7px] z-20 size-2.5 -translate-x-1/2 rounded-full bg-background" />
            <StatusBar time="5:47" android />
            <div className="flex h-[calc(100%-1.5rem)] flex-col px-3 pb-3 pt-1">
              <p className="text-[11px] font-medium text-foreground">Oxym</p>
              <div className="mt-2">
                <MatchCard />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-[11px] text-accent">14 going</p>
                <p className="text-[10px] text-muted-foreground">Squad</p>
              </div>
              <ul className="mt-1.5 space-y-1.5">
                {squad.slice(0, 4).map((row) => (
                  <li
                    key={row.name}
                    className="flex items-center justify-between rounded-xl bg-background px-2.5 py-1.5 text-[11px]"
                  >
                    <span>
                      <span className="mr-1.5 text-accent">{row.pos}</span>
                      {row.name}
                    </span>
                    <span className={row.in ? "text-[10px] text-accent" : "text-[10px] text-muted-foreground"}>
                      {row.in ? "in" : "out"}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex justify-center">
                <span className="h-1 w-16 rounded-full bg-muted-foreground/35" />
              </div>
            </div>
          </Bezel>
        </div>
      </div>
    </div>
  );
}

export function IonicPhone() {
  return (
    <Bezel island className="w-[13.5rem]" screenClassName="h-[22.5rem]">
      <StatusBar time="5:47" />
      <div className="flex h-[calc(100%-1.75rem)] flex-col px-3 pb-2 pt-1">
        <p className="text-[11px] font-medium">Oxym</p>
        <div className="mt-2">
          <MatchCard />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-background px-2.5 py-2">
            <p className="font-display text-xl leading-none">14</p>
            <p className="mt-1 text-[10px] text-muted-foreground">going</p>
          </div>
          <div className="rounded-2xl bg-background px-2.5 py-2">
            <p className="font-display text-xl leading-none">4-3-3</p>
            <p className="mt-1 text-[10px] text-muted-foreground">board</p>
          </div>
        </div>
        <ChatPreview />
        <TabBar active="Match" />
      </div>
    </Bezel>
  );
}

export function NativePhone() {
  return (
    <Bezel island className="w-[13.5rem]" screenClassName="h-[22.5rem]">
      <StatusBar time="5:47" />
      <div className="flex h-[calc(100%-1.75rem)] flex-col px-3 pb-2 pt-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium">Squad</p>
          <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-accent">live</span>
        </div>
        <ul className="mt-2 space-y-1.5">
          {squad.map((row) => (
            <li
              key={row.name}
              data-mobile-row
              className="flex items-center justify-between rounded-xl bg-background px-2.5 py-1.5"
            >
              <span className="flex items-center gap-2">
                <span className="flex size-6 items-center justify-center rounded-full bg-accent/20 text-[9px] font-medium text-accent">
                  {row.pos}
                </span>
                <span className="text-[12px]">{row.name}</span>
              </span>
              <span className={row.in ? "text-[10px] text-accent" : "text-[10px] text-muted-foreground"}>
                {row.in ? "in" : "out"}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 rounded-xl bg-accent/12 px-2.5 py-1.5">
          <p className="text-[10px] text-muted-foreground">Riverside · Sat 6:00</p>
          <p className="text-[12px] text-foreground">4 of 5 starters in</p>
        </div>
        <TabBar active="Squad" />
      </div>
    </Bezel>
  );
}

export function TabletBoard() {
  return (
    <Bezel radius="1.9rem" screenRadius="1.35rem" className="w-full max-w-[34rem]" screenClassName="min-h-[20.5rem]">
      <StatusBar time="5:47" />
      <div className="grid grid-cols-[11.5rem_minmax(0,1fr)] gap-3 px-3 pb-3 pt-1">
        <div>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] text-muted-foreground">Coach board</p>
              <p className="font-display text-2xl leading-none">4-3-3</p>
            </div>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-accent">synced</span>
          </div>
          <ul className="mt-3 space-y-1.5">
            {squad.map((row) => (
              <li
                key={row.name}
                data-mobile-row
                className="flex items-center justify-between gap-2 rounded-lg bg-background px-2 py-1.5 text-[11px]"
              >
                <span>
                  <span className="mr-1.5 text-accent">{row.pos}</span>
                  {row.name}
                </span>
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    row.in ? "bg-accent" : "bg-muted-foreground/35",
                  )}
                />
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] text-muted-foreground">14 confirmed for Riverside.</p>
        </div>
        <Pitch dense />
      </div>
    </Bezel>
  );
}

export function SquadPhone() {
  return (
    <Bezel island className="w-[16.5rem]" screenClassName="h-[31rem]">
      <StatusBar time="5:47" />
      <div className="flex h-[calc(100%-1.75rem)] flex-col px-3.5 pb-3 pt-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium">Squad</p>
          <span className="rounded-full bg-background px-2 py-0.5 text-[10px] text-muted-foreground">
            offline
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">Roster still opens. Push waits.</p>
        <ul className="mt-3 space-y-2">
          {squad.map((row) => (
            <li
              key={row.name}
              data-mobile-row
              className="flex items-center justify-between rounded-2xl bg-background px-3 py-2.5"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-accent/20 text-[10px] font-medium text-accent">
                  {row.pos}
                </span>
                <span>
                  <span className="block text-[13px]">{row.name}</span>
                  <span className="text-[10px] text-muted-foreground">{row.in ? "confirmed" : "no reply"}</span>
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div data-mobile-toast className="mt-auto rounded-2xl bg-signal/20 px-3 py-2.5">
          <p className="text-[10px] text-muted-foreground">APNs · just now</p>
          <p className="text-[13px] leading-5">Maya confirmed. 14 going.</p>
        </div>
      </div>
    </Bezel>
  );
}

export function WatchFace() {
  return (
    <div className="relative">
      <span className="absolute -right-[7px] top-10 z-10 h-7 w-[7px] rounded-r-sm bg-background shadow-[0_0_0_1px_rgb(42_161_152/0.28)]" />
      <span className="absolute -right-[5px] top-[5.4rem] z-10 h-3.5 w-[5px] rounded-r-sm bg-background shadow-[0_0_0_1px_rgb(42_161_152/0.22)]" />
      <Bezel radius="2.1rem" screenRadius="1.55rem" className="w-[12.25rem]" screenClassName="h-[14.6rem]">
        <div className="flex h-full flex-col px-3.5 py-3.5">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] text-muted-foreground">Sat</p>
            <p className="font-display text-2xl leading-none">5:47</p>
          </div>
          <p className="mt-3 text-[10px] text-accent">Live activity</p>
          <p className="font-display text-[2.6rem] leading-[0.85] tracking-tight">13m</p>
          <p className="mt-1 text-[11px] text-muted-foreground">Riverside kickoff</p>
          <div className="mt-auto grid grid-cols-2 gap-1.5">
            <span className="rounded-xl bg-accent py-1.5 text-center text-[11px] font-medium text-accent-foreground">
              In
            </span>
            <span className="rounded-xl bg-background py-1.5 text-center text-[11px]">Skip</span>
          </div>
        </div>
      </Bezel>
    </div>
  );
}

export function CarDash() {
  return (
    <div className="mobile-car" aria-hidden="true">
      <div className="mobile-car-road">
        {/* Route preview: approach from the bottom, right turn onto Riverside Drive. */}
        <svg className="mobile-car-route" viewBox="0 0 120 100" preserveAspectRatio="xMidYMid meet">
          <path className="is-street" d="M8 30 H112 M34 4 V96 M84 4 V96" />
          <path className="is-path" d="M34 96 V30 H112" />
          <circle className="is-car" cx="34" cy="74" r="4.5" />
          <path className="is-arrow" d="M100 23 L110 30 L100 37" />
        </svg>
      </div>
      <div className="relative flex h-full flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <span>Riverside</span>
          <span>KO 6:00</span>
        </div>
        <div className="mt-auto mb-5">
          <p className="font-display text-[clamp(2rem,4vw,3.1rem)] leading-[0.92]">Turn right</p>
          <p className="mt-2 text-accent">200 m · Riverside Drive</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="rounded-2xl bg-accent px-3 py-3 text-center text-[12px] font-medium text-accent-foreground">
            Nav
          </span>
          <span className="rounded-2xl bg-surface px-3 py-3 text-center text-[12px]">Audio</span>
          <span className="rounded-2xl bg-surface px-3 py-3 text-center text-[12px]">Call</span>
        </div>
      </div>
    </div>
  );
}

/** What each bridged capability is doing in the Oxym screen, per hardware tab. */
const hardwareStatus: Record<string, { label: string; status: string }[]> = {
  "Radios and identity": [
    { label: "BLE", status: "Kit tag in range" },
    { label: "NFC", status: "Tap to check in" },
    { label: "Face ID", status: "Roster unlocked" },
  ],
  "Capture and place": [
    { label: "Camera", status: "Scan match pass" },
    { label: "GPS", status: "Arrived at Riverside" },
    { label: "Gyro", status: "Drill reps counted" },
  ],
  "Voice and network": [
    { label: "Mic", status: "Voice note to squad" },
    { label: "Radio", status: "5G, strong signal" },
    { label: "Wi-Fi", status: "Clubhouse sync on" },
  ],
};

const hardwareMarks: Record<string, { top: string; left: string; label: string }[]> = {
  "Radios and identity": [
    { top: "28%", left: "-2.6rem", label: "BLE" },
    { top: "52%", left: "calc(100% + 0.55rem)", label: "NFC" },
    { top: "7%", left: "38%", label: "Face ID" },
  ],
  "Capture and place": [
    { top: "8%", left: "-3.4rem", label: "Camera" },
    { top: "58%", left: "-2.7rem", label: "GPS" },
    { top: "72%", left: "calc(100% + 0.55rem)", label: "Gyro" },
  ],
  "Voice and network": [
    { top: "86%", left: "36%", label: "Mic" },
    { top: "36%", left: "calc(100% + 0.55rem)", label: "Radio" },
    { top: "18%", left: "-2.9rem", label: "Wi-Fi" },
  ],
};

export function HardwarePhone({ active }: { active: string }) {
  const marks = hardwareMarks[active] ?? hardwareMarks["Radios and identity"];
  const status = hardwareStatus[active] ?? hardwareStatus["Radios and identity"];
  const radios = active === "Radios and identity";
  const reduced = usePrefersReducedMotion();

  return (
    <div className="mobile-hw-stage" aria-hidden="true">
      <div className={cn("mobile-hw-device", radios && "is-radio")}>
        <span className="mobile-hw-side" />
        <Bezel island className="w-[14.5rem]" screenClassName="h-[23.5rem]">
          <StatusBar time="5:47" />
          <div className="flex h-[calc(100%-1.75rem)] flex-col px-3 pb-2 pt-1">
            <p className="text-[11px] font-medium">Oxym</p>
            <div className="mt-2">
              <MatchCard compact />
            </div>
            <p className="mt-3 text-[10px] text-muted-foreground">Native bridge</p>
            <ul key={active} className="mobile-hw-status mt-1.5 space-y-1.5">
              {status.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between gap-2 rounded-xl bg-background px-2.5 py-2"
                >
                  <span className="text-[11px] font-medium text-accent">{row.label}</span>
                  <span className="text-[11px] text-foreground">{row.status}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] leading-4 text-muted-foreground">
              Only what the brief needs is wired in.
            </p>
            <TabBar active="Match" />
          </div>
        </Bezel>
        <AnimatePresence>
          {marks?.map((mark) => (
            <motion.span
              key={`${active}-${mark.label}`}
              className="mobile-hw-mark"
              style={{ top: mark.top, left: mark.left }}
              initial={reduced ? false : { opacity: 0, scale: 0.72 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.72 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {mark.label}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function OsShelf({
  title,
  copy,
  items,
  kind,
}: {
  title: string;
  copy: string;
  items: string[];
  kind: "ios" | "android" | "web" | "desktop";
}) {
  return (
    <article data-mobile-item className="mobile-os">
      <div className="mobile-os-stage" aria-hidden="true">
        {kind === "ios" ? (
          <div className="mobile-os-row">
            <span className="mobile-os-phone">
              <span className="mobile-os-screen" />
            </span>
            <span className="mobile-os-tablet">
              <span className="mobile-os-screen" />
            </span>
            <span className="mobile-os-watch">
              <span className="mobile-os-screen" />
            </span>
          </div>
        ) : null}
        {kind === "android" ? (
          <div className="mobile-os-row">
            <span className="mobile-os-phone is-android">
              <span className="mobile-os-screen" />
            </span>
            <span className="mobile-os-tablet is-android">
              <span className="mobile-os-screen" />
            </span>
            <span className="mobile-os-watch is-android">
              <span className="mobile-os-screen" />
            </span>
          </div>
        ) : null}
        {kind === "web" ? (
          <span className="mobile-os-browser">
            <span className="mobile-os-screen" />
          </span>
        ) : null}
        {kind === "desktop" ? (
          <span className="mobile-os-window">
            <span className="mobile-os-screen" />
          </span>
        ) : null}
      </div>
      <h3>{title}</h3>
      <p>{copy}</p>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
