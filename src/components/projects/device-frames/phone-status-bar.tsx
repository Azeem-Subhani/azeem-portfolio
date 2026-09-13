import { IPHONE_15_PRO } from "@/components/projects/device-frames/iphone-15-pro";
import { cn } from "@/lib/utils";

type PhoneStatusBarProps = {
  /** Light product UIs need dark glyphs. Dark UIs keep white. */
  tone?: "dark" | "light";
};

/** iOS 18+ status row. Time and indicators share the Dynamic Island's vertical center. */

function StatusCellular() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 19 13"
      className="h-[3.2cqw] w-[4.7cqw]"
      fill="currentColor"
    >
      <rect x="0.15" y="8.05" width="3.35" height="4.7" rx="0.85" />
      <rect x="5.15" y="5.55" width="3.35" height="7.2" rx="0.85" />
      <rect x="10.15" y="2.85" width="3.35" height="9.9" rx="0.85" />
      <rect x="15.15" y="0.25" width="3.35" height="12.5" rx="0.85" />
    </svg>
  );
}

function StatusWifi() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 12.5"
      className="h-[3.25cqw] w-[4.3cqw]"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.4"
    >
      <path d="M1.05 4.2c3.95-3.6 9.95-3.6 13.9 0" />
      <path d="M3.45 6.75c2.55-2.3 6.55-2.3 9.1 0" />
      <path d="M5.95 9.25c1.15-1.05 2.95-1.05 4.1 0" />
    </svg>
  );
}

function StatusBattery() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 27 13"
      className="h-[3.35cqw] w-[6.9cqw]"
      fill="none"
    >
      <rect
        x="0.55"
        y="0.55"
        width="22.3"
        height="11.9"
        rx="3.55"
        stroke="currentColor"
        strokeOpacity="0.32"
        strokeWidth="1.1"
      />
      <rect x="2.05" y="2.05" width="17.6" height="8.9" rx="1.85" fill="currentColor" />
      <rect
        x="23.7"
        y="4.15"
        width="2.55"
        height="4.7"
        rx="1.15"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  );
}

const islandCol = `${(IPHONE_15_PRO.dynamicIsland.width / IPHONE_15_PRO.screenWidth) * 100}%`;
const islandTopPct = `${(IPHONE_15_PRO.dynamicIsland.top / IPHONE_15_PRO.screenHeight) * 100}%`;
const islandHeightPct = `${(IPHONE_15_PRO.dynamicIsland.height / IPHONE_15_PRO.screenHeight) * 100}%`;

export function PhoneStatusBar({ tone = "dark" }: PhoneStatusBarProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 z-20 grid items-center font-[system-ui,-apple-system,BlinkMacSystemFont,'SF_Pro_Text',sans-serif] [container-type:inline-size]",
        tone === "light" ? "text-[#26332F]" : "text-white",
      )}
      style={{
        top: islandTopPct,
        height: islandHeightPct,
        gridTemplateColumns: `1fr ${islandCol} 1fr`,
      }}
    >
      <span
        className="font-semibold leading-none tracking-[-0.04em] tabular-nums"
        style={{ paddingLeft: "6.1cqw", fontSize: "4.33cqw" }}
      >
        9:41
      </span>

      <span aria-hidden="true" />

      <div
        className="flex items-center justify-end"
        style={{ paddingRight: "5.6cqw", gap: "1.3cqw" }}
      >
        <StatusCellular />
        <StatusWifi />
        <StatusBattery />
      </div>
    </div>
  );
}
