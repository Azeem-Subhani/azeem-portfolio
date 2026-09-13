import { PhoneStatusBar } from "@/components/projects/device-frames/phone-status-bar";
import { IPHONE_15_PRO } from "@/components/projects/device-frames/iphone-15-pro";
import { cn } from "@/lib/utils";

type PhoneFrameProps = {
  className?: string;
  /** Device shell color behind the screen (default charcoal). */
  shellClassName?: string;
  /** Screen color behind the live UI (default mint, for light product UIs). */
  screenClassName?: string;
  /** Status bar glyphs. Light product UIs use dark icons. */
  statusTone?: "dark" | "light";
  children: React.ReactNode;
};

const islandWidthPct = `${(IPHONE_15_PRO.dynamicIsland.width / IPHONE_15_PRO.screenWidth) * 100}%`;
const islandTopPct = `${(IPHONE_15_PRO.dynamicIsland.top / IPHONE_15_PRO.screenHeight) * 100}%`;
const islandHeightPct = `${(IPHONE_15_PRO.dynamicIsland.height / IPHONE_15_PRO.screenHeight) * 100}%`;

export function PhoneFrame({
  className,
  shellClassName,
  screenClassName,
  statusTone = "dark",
  children,
}: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "w-[270px] rounded-[42px] bg-[#08201F] p-[9px] font-sans shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]",
        shellClassName,
        className,
      )}
    >
      {/* iPhone 15 Pro screen ratio (393×852 logical) */}
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[34px] bg-[#F4F7F4]",
          screenClassName,
        )}
        style={{ aspectRatio: `${IPHONE_15_PRO.screenWidth} / ${IPHONE_15_PRO.screenHeight}` }}
      >
        <PhoneStatusBar tone={statusTone} />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 rounded-[999px] bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]"
          style={{
            top: islandTopPct,
            width: islandWidthPct,
            height: islandHeightPct,
          }}
        />
        {children}
      </div>
    </div>
  );
}
