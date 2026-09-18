"use client";

import { useId, useState, type ComponentProps, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BrowserFrame } from "@/components/projects/device-frames/browser-frame";
import { PhoneFrame } from "@/components/projects/device-frames/phone-frame";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DeviceStageWebSlide = {
  id: string;
  label: string;
  url?: string;
  tone?: ComponentProps<typeof BrowserFrame>["tone"];
  children: ReactNode;
};

export type DeviceStagePhoneSlide = {
  id: string;
  label: string;
  shellClassName?: string;
  screenClassName?: string;
  statusTone?: "dark" | "light";
  children: ReactNode;
};

type DeviceStageProps = {
  web?: DeviceStageWebSlide[];
  phones?: DeviceStagePhoneSlide[];
  /** hero: browser carousel with an overlapping phone. row: labeled phones. browser: carousel only. */
  layout?: "hero" | "row" | "browser";
  className?: string;
  /** When both web and phones exist, keep the phone on the same index. */
  syncPhone?: boolean;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return (index + length) % length;
}

export function DeviceStage({
  web = [],
  phones = [],
  layout = "hero",
  className,
  syncPhone = true,
}: DeviceStageProps) {
  const labelId = useId();
  const [webIndex, setWebIndex] = useState(0);
  const [phoneIndex, setPhoneIndex] = useState(0);

  const hasWeb = web.length > 0;
  const hasPhones = phones.length > 0;
  const activeWeb = hasWeb ? web[wrapIndex(webIndex, web.length)] : undefined;
  const resolvedPhoneIndex = syncPhone && hasWeb && hasPhones
    ? wrapIndex(webIndex, phones.length)
    : wrapIndex(phoneIndex, phones.length);
  const activePhone = hasPhones ? phones[resolvedPhoneIndex] : undefined;

  const controlSlides = web;
  const controlIndex = wrapIndex(webIndex, web.length);
  // Row layout already shows every phone with a label. A pager there
  // does not change what is on screen.
  const showControls = layout !== "row" && controlSlides.length > 1;

  const go = (delta: number) => {
    if (layout === "row" && !hasWeb) {
      setPhoneIndex((current) => wrapIndex(current + delta, phones.length));
      return;
    }
    setWebIndex((current) => wrapIndex(current + delta, web.length));
    if (!syncPhone) {
      setPhoneIndex((current) => wrapIndex(current + delta, phones.length));
    }
  };

  const select = (id: string) => {
    const webAt = web.findIndex((slide) => slide.id === id);
    if (webAt >= 0) {
      setWebIndex(webAt);
      return;
    }
    const phoneAt = phones.findIndex((slide) => slide.id === id);
    if (phoneAt >= 0) setPhoneIndex(phoneAt);
  };

  return (
    <div className={cn("w-full", className)}>
      {layout !== "row" && activeWeb ? (
        <div className="relative">
          <div
            className={cn(
              "relative",
              layout === "hero" && hasPhones
                ? "min-h-[280px] pb-24 sm:min-h-[400px] sm:pb-8 lg:min-h-[560px]"
                : undefined,
            )}
          >
            <div
              className={cn(
                "mx-auto w-full max-w-[1000px]",
                layout === "hero" && hasPhones && "sm:pr-[168px] lg:pr-[220px]",
              )}
            >
              <BrowserFrame url={activeWeb.url} tone={activeWeb.tone}>
                <div className="pointer-events-none">{activeWeb.children}</div>
              </BrowserFrame>
            </div>

            {layout === "hero" && activePhone ? (
              <div className="pointer-events-none absolute bottom-[-8px] right-0 hidden w-[270px] origin-bottom-right scale-[0.62] sm:block lg:bottom-0 lg:right-2 lg:scale-[0.7]">
                <PhoneFrame
                  shellClassName={activePhone.shellClassName}
                  screenClassName={activePhone.screenClassName}
                  statusTone={activePhone.statusTone}
                >
                  <div className="pointer-events-none absolute inset-0">
                    {activePhone.children}
                  </div>
                </PhoneFrame>
              </div>
            ) : null}
          </div>

          {layout === "hero" && activePhone ? (
            <div className="mt-6 flex justify-center sm:hidden">
              <PhoneFrame
                className="origin-top scale-[0.92]"
                shellClassName={activePhone.shellClassName}
                screenClassName={activePhone.screenClassName}
                statusTone={activePhone.statusTone}
              >
                <div className="pointer-events-none absolute inset-0">
                  {activePhone.children}
                </div>
              </PhoneFrame>
            </div>
          ) : null}
        </div>
      ) : null}

      {layout === "row" && hasPhones ? (
        <ul className="flex flex-wrap items-end justify-center gap-8 lg:gap-12">
          {phones.map((phone) => (
            <li key={phone.id} className="flex flex-col items-center gap-4">
              <PhoneFrame
                shellClassName={phone.shellClassName}
                screenClassName={phone.screenClassName}
                statusTone={phone.statusTone}
              >
                <div className="pointer-events-none absolute inset-0">
                  {phone.children}
                </div>
              </PhoneFrame>
              <p className="max-w-[12rem] text-center text-sm text-muted-foreground">
                {phone.label}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {showControls ? (
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Previous screen"
              onClick={() => go(-1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Next screen"
              onClick={() => go(1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <p
            id={labelId}
            className="font-mono text-xs tabular-nums text-muted-foreground"
          >
            {pad(controlIndex + 1)} / {pad(controlSlides.length)}
          </p>

          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product screens">
            {controlSlides.map((slide, index) => {
              const selected = index === controlIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-[0.7rem] font-medium transition-colors",
                    selected
                      ? "border-foreground text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground",
                  )}
                  onClick={() => select(slide.id)}
                >
                  {slide.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
