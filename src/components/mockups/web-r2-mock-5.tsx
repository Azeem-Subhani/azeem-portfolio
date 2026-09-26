"use client";

export const venues = [
  { id: "ridgeline", label: "Ridgeline", sub: "Motor Club" },
  { id: "coastal", label: "Coastal", sub: "Raceway" },
  { id: "harbor", label: "Harbor", sub: "Motor Park" },
  { id: "summit", label: "Summit", sub: "Racing School" },
  { id: "desert", label: "High Desert", sub: "Motorsports" },
] as const;

export type LightState = "idle" | "red" | "green";

const trafficRed = "#ff1a1a";
const trafficGreen = "#00ff5c";

/**
 * The gantry signals a start: red holds long enough to read as a signal rather
 * than a blink, then the light turns green and the run begins. Flashing red
 * three times pushed green out past a second and read as an error state.
 */
export const gantryRedHoldMs = 650;
export const terminalLagMs = 180;
/** Green is the beat the body copy and terminal key off. */
export const gantryGreenAtMs = gantryRedHoldMs;
/** All five stay green this long before the venue highlight cycle takes over. */
export const gantryGreenHoldMs = 420;

export function runGantryStartSequence(
  setLightStates: (states: LightState[]) => void,
): ReturnType<typeof setTimeout>[] {
  const timers: ReturnType<typeof setTimeout>[] = [];

  timers.push(setTimeout(() => setLightStates(allLights("red")), 0));
  timers.push(
    setTimeout(() => setLightStates(allLights("green")), gantryGreenAtMs),
  );

  return timers;
}

function lightFill(state: LightState) {
  if (state === "red") return trafficRed;
  if (state === "green") return trafficGreen;
  return "color-mix(in srgb, var(--muted) 28%, transparent)";
}

function lightGlow(state: LightState) {
  if (state === "red") {
    return `0 0 16px ${trafficRed}, 0 0 28px color-mix(in srgb, ${trafficRed} 65%, transparent), inset 0 -2px 4px rgb(0 0 0 / 35%)`;
  }
  if (state === "green") {
    return `0 0 16px ${trafficGreen}, 0 0 28px color-mix(in srgb, ${trafficGreen} 65%, transparent), inset 0 -2px 4px rgb(0 0 0 / 35%)`;
  }
  return "inset 0 2px 6px rgb(0 0 0 / 45%)";
}

export function allLights(state: LightState) {
  return venues.map(() => state);
}

export function highlightLights(activeIndex: number): LightState[] {
  return venues.map((_, index) => (index === activeIndex ? "green" : "idle"));
}

export function GantryPosts() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative mx-[5%] h-3 sm:h-4"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-foreground/12" />
      <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-foreground/22 via-border/55 to-border" />
      <div className="absolute bottom-0 right-0 top-0 w-px bg-gradient-to-b from-foreground/22 via-border/55 to-border" />
    </div>
  );
}

export function GantryLights({
  states,
  activeIndex,
  onSelect,
  interactive = false,
}: {
  states: LightState[];
  /** `undefined` keeps the standalone Coastal accent. `null` skips label highlight (flash). */
  activeIndex?: number | null;
  onSelect?: (index: number) => void;
  interactive?: boolean;
}) {
  return (
    <div className="relative w-full min-h-[5rem] pb-1 sm:min-h-[5.75rem] sm:pb-1.5">
      <svg
        viewBox="0 0 320 52"
        preserveAspectRatio="none"
        className="h-12 w-full"
        aria-hidden="true"
      >
        <path
          d="M 0 38 Q 160 4 320 38"
          fill="none"
          stroke="color-mix(in srgb, var(--muted) 35%, transparent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 0 38 L 320 38"
          fill="none"
          stroke="color-mix(in srgb, var(--foreground) 12%, transparent)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ul className="absolute inset-x-0 top-3 flex justify-between">
        {venues.map((venue, index) => {
          const state = states[index] ?? "idle";
          const lit = state !== "idle";
          const labelHot =
            activeIndex === undefined
              ? venue.id === "coastal"
              : activeIndex === index;

          const lightOrb = (
            <div
              className="relative flex size-7 items-center justify-center rounded-full sm:size-8"
              style={{
                background: "color-mix(in srgb, var(--background) 70%, var(--surface))",
                boxShadow: lit
                  ? `0 0 0 1px color-mix(in srgb, var(--foreground) 14%, transparent)`
                  : "0 0 0 1px color-mix(in srgb, var(--border) 80%, transparent)",
              }}
            >
              <span
                className="block size-4 rounded-full sm:size-[1.125rem]"
                style={{
                  background: lightFill(state),
                  boxShadow: lightGlow(state),
                }}
              />
            </div>
          );

          return (
            <li
              key={venue.id}
              className="flex w-[18%] flex-col items-center gap-1.5 sm:gap-2"
            >
              {interactive && onSelect ? (
                <button
                  type="button"
                  onClick={() => onSelect(index)}
                  className="rounded-full transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  aria-label={`Select ${venue.label}`}
                  aria-pressed={labelHot}
                >
                  {lightOrb}
                </button>
              ) : (
                lightOrb
              )}
              <div
                className="w-full px-0.5 text-center leading-snug transition-opacity duration-300"
                style={{
                  opacity: activeIndex == null || labelHot ? 1 : 0.42,
                }}
              >
                <p
                  className={`line-clamp-2 text-balance break-words text-[9px] leading-tight sm:text-[10px] ${
                    labelHot ? "text-accent" : "text-foreground"
                  }`}
                >
                  {venue.label}
                </p>
                <p className="mt-0.5 hidden text-[7px] leading-snug text-muted-foreground sm:block">
                  {venue.sub}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
