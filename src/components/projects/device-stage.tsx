"use client";

import {
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { BrowserFrame } from "@/components/projects/device-frames/browser-frame";
import { PhoneFrame } from "@/components/projects/device-frames/phone-frame";
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

function wrapIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return (index + length) % length;
}

const arrowClassName =
  "inline-flex size-10 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm backdrop-blur-md transition-colors hover:border-foreground/30 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)] sm:size-11";

export function DeviceStage({
  web = [],
  phones = [],
  layout = "hero",
  className,
  syncPhone = true,
}: DeviceStageProps) {
  const statusId = useId();
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

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const tabId = (index: number) => `${statusId}-tab-${index}`;

  // Tabs follow the APG pattern: one tab stop, arrows/Home/End move selection
  // and focus together. Handled here so the stage-level arrows don't also fire.
  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const last = controlSlides.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight") next = controlIndex === last ? 0 : controlIndex + 1;
    else if (event.key === "ArrowLeft") next = controlIndex === 0 ? last : controlIndex - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === null) return;

    event.preventDefault();
    event.stopPropagation();
    setWebIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!showControls) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  const renderArrows = () =>
    showControls ? (
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-between px-1 sm:px-2">
        <button
          type="button"
          className={cn("pointer-events-auto", arrowClassName)}
          aria-label="Previous screen"
          aria-controls={statusId}
          onClick={() => go(-1)}
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          className={cn("pointer-events-auto", arrowClassName)}
          aria-label="Next screen"
          aria-controls={statusId}
          onClick={() => go(1)}
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    ) : null;

  const tabs = showControls ? (
    <>
      <div className="mt-6 flex justify-center">
        <div
          role="tablist"
          aria-label="Choose a screen"
          onKeyDown={onTabKeyDown}
          className="flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-border/70 bg-surface/70 p-1 shadow-sm backdrop-blur-md"
        >
          {controlSlides.map((slide, slideIndex) => {
            const selected = slideIndex === controlIndex;
            return (
              <button
                key={slide.id}
                ref={(node) => {
                  tabRefs.current[slideIndex] = node;
                }}
                id={tabId(slideIndex)}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={statusId}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]",
                  selected
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
                )}
                onClick={() => select(slide.id)}
              >
                {slide.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  ) : null;

  // The captures themselves are inert pictures, so this line is what a screen reader gets.
  // It doubles as the live status when the pager changes the screen.
  const description = activeWeb ? (
    <p
      id={statusId}
      className="sr-only"
      role={showControls ? "tabpanel" : undefined}
      aria-labelledby={showControls ? tabId(controlIndex) : undefined}
      aria-live={showControls ? "polite" : undefined}
    >
      {`Web app screen: ${activeWeb.label}`}
      {layout === "hero" && activePhone ? `, with ${activePhone.label} on a phone` : ""}
      {showControls ? `. ${controlIndex + 1} of ${controlSlides.length}` : ""}
    </p>
  ) : null;

  // Slide wrappers are keyed by slide id: slides that share a capture shell would otherwise
  // keep the same DOM, and the build-up (useBuildUp in CaptureFrame) would not replay.
  return (
    <div
      className={cn("relative w-full", className)}
      data-device-stage=""
      // The floating mobile CTA steps aside while a hero stage is on screen (see MobileCta).
      data-inline-cta={layout === "hero" ? "" : undefined}
      role={showControls ? "group" : undefined}
      aria-roledescription={showControls ? "carousel" : undefined}
      aria-label={showControls ? "Product screens" : undefined}
      tabIndex={showControls ? 0 : undefined}
      onKeyDown={onKeyDown}
    >
      {description}
      {layout !== "row" && activeWeb ? (
        layout === "hero" && hasPhones ? (
          <>
            <div className="relative lg:hidden">
              <div className="overflow-visible pb-[12%]">
                <div className="relative">
                  <BrowserFrame url={activeWeb.url} tone={activeWeb.tone}>
                    <div key={activeWeb.id} className="pointer-events-none">{activeWeb.children}</div>
                  </BrowserFrame>
                  {renderArrows()}
                  {activePhone ? (
                    <div className="pointer-events-none absolute bottom-0 right-[2%] z-[1] w-[min(42%,10.25rem)] translate-y-[10%]">
                      <PhoneFrame
                        className="!w-full"
                        shellClassName={activePhone.shellClassName}
                        screenClassName={activePhone.screenClassName}
                        statusTone={activePhone.statusTone}
                      >
                        <div key={activePhone.id} className="pointer-events-none absolute inset-0">
                          {activePhone.children}
                        </div>
                      </PhoneFrame>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="relative hidden min-h-[640px] lg:block">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex h-full items-center justify-center">
                  <div className="relative aspect-[16/10] w-full max-h-[640px] max-w-[1100px]">
                    <div
                      className="pointer-events-none absolute left-1/2 top-[12px] w-[1000px] origin-top"
                      style={{ transform: "translateX(-50%) scale(0.78)" }}
                    >
                      <BrowserFrame url={activeWeb.url} tone={activeWeb.tone}>
                        <div key={activeWeb.id} className="pointer-events-none">{activeWeb.children}</div>
                      </BrowserFrame>
                    </div>

                    {activePhone ? (
                      <div
                        className="pointer-events-none absolute w-[270px]"
                        style={{
                          right: "5%",
                          bottom: "140px",
                          transform: "scale(0.66)",
                          transformOrigin: "bottom right",
                        }}
                      >
                        <PhoneFrame
                          shellClassName={activePhone.shellClassName}
                          screenClassName={activePhone.screenClassName}
                          statusTone={activePhone.statusTone}
                        >
                          <div key={activePhone.id} className="pointer-events-none absolute inset-0">
                            {activePhone.children}
                          </div>
                        </PhoneFrame>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              {renderArrows()}
            </div>
            {tabs}
          </>
        ) : (
          <div className="mx-auto w-full max-w-[1000px]">
            <div className="relative">
              <BrowserFrame url={activeWeb.url} tone={activeWeb.tone}>
                <div key={activeWeb.id} className="pointer-events-none">{activeWeb.children}</div>
              </BrowserFrame>
              {renderArrows()}
            </div>
            {tabs}
          </div>
        )
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
                <span className="sr-only">Phone screen: </span>
                {phone.label}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
