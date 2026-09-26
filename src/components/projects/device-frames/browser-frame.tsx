import type { ReactNode } from "react";
import { Lock } from "lucide-react";

import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  url?: string;
  className?: string;
  /** Product-matched chrome. Site follows the portfolio theme. */
  tone?:
    | "site"
    | "dark"
    | "ink"
    | "cream"
    | "white"
    | "walnut"
    | "paper"
    | "sports-team";
  children: ReactNode;
};

export function BrowserFrame({
  url,
  className,
  tone = "site",
  children,
}: BrowserFrameProps) {
  const dark = tone === "dark";
  const ink = tone === "ink";
  const walnut = tone === "walnut";
  const cream = tone === "cream";
  const paper = tone === "paper";
  const white = tone === "white";
  const sportsTeam = tone === "sports-team";
  const darkish = dark || ink || walnut || sportsTeam;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-t-xl border border-b-0 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]",
        darkish
          ? "border-white/[0.08]"
          : cream
            ? "border-[#E5E9E5]"
            : paper
              ? "border-[#F1E5DE]"
              : white
                ? "border-[#E8E8E8]"
                : sportsTeam
                  ? "border-[#16523F]"
                : "border-white/10",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-3",
          dark
            ? "border-white/[0.07] bg-[#07080A]"
            : ink
              ? "border-white/[0.07] bg-[#12110F]"
              : walnut
                ? "border-white/[0.07] bg-[#14110E]"
                : cream
                  ? "border-[#E5E9E5] bg-[#F7F7F4]"
              : paper
                ? "border-[#F1E5DE] bg-[#FBF5F1]"
                : white
                  ? "border-[#E8E8E8] bg-white"
                  : sportsTeam
                    ? "border-white/[0.08] bg-[#0C3B2E]"
                  : "border-border/80 bg-surface",
        )}
      >
        <div className="flex gap-2" aria-hidden="true">
          <span className="inline-block size-3 rounded-full bg-[#F1655C]" />
          <span className="inline-block size-3 rounded-full bg-[#F5BE4F]" />
          <span className="inline-block size-3 rounded-full bg-[#5FC97B]" />
        </div>
        {url ? (
          <div
            className={cn(
              "mx-auto flex max-w-[360px] flex-1 items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-center text-[13px]",
              darkish
                ? "bg-white/[0.06] text-[#9AA1AC]"
                : cream
                  ? "bg-white text-[#6C7771]"
                  : paper
                    ? "bg-white text-[#6B5A68]"
                    : white
                      ? "bg-[#F4F4F4] text-[#777777]"
                      : "bg-white/6 text-muted-foreground",
            )}
          >
            <Lock className="size-3 shrink-0 opacity-70" strokeWidth={2.2} />
            <span className="truncate">{url}</span>
          </div>
        ) : (
          <div className="flex-1" />
        )}
        <div className="w-[60px] shrink-0" aria-hidden="true" />
      </div>
      {children}
    </div>
  );
}
