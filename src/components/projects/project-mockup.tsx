"use client";

import Image from "next/image";
import { createElement, useEffect, useRef, useState } from "react";

import { BrowserFrame } from "@/components/projects/device-frames/browser-frame";
import { PhoneFrame } from "@/components/projects/device-frames/phone-frame";
import {
  getLivePhoneMockup,
  getLiveWebMockup,
} from "@/components/projects/mockups/registry";
import { cn } from "@/lib/utils";
import type { Project, ProjectScreen } from "@/types/content";

export type MockupDensity = "card" | "catalog" | "catalog-mobile" | "case-study";

type ProjectMockupProps = {
  project: Project;
  sizes: string;
  density?: MockupDensity;
  priority?: boolean;
  reverse?: boolean;
  hoverable?: boolean;
  /** Soft teal wash over the still. Off for catalog photography. */
  glow?: boolean;
  /** Use the project-provided descriptive alt text for still images. */
  descriptiveAlt?: boolean;
  className?: string;
};

const STAGE_MAX_HEIGHT: Record<MockupDensity, string> = {
  card: "max-h-[430px]",
  "case-study": "max-h-[520px]",
  catalog: "",
  "catalog-mobile": "max-h-[220px]",
};

const PHONE_POSITION: Record<
  MockupDensity,
  { bottom: string; scale: string; right?: string; left?: string }
> = {
  card: { bottom: "-56px", scale: "0.6", right: "12px" },
  "case-study": { bottom: "-56px", scale: "0.6", right: "12px" },
  catalog: { bottom: "-20px", scale: "0.62", right: "-4px" },
  "catalog-mobile": { bottom: "-24px", scale: "0.42", right: "4px" },
};

type CatalogComposition = {
  browserScale: number;
  browserX: string;
  browserY: string;
  phoneSide: "left" | "right";
  phoneOffset: string;
  phoneBottom: string;
  phoneScale: string;
};

const CATALOG_COMPOSITIONS: Record<string, CatalogComposition> = {
  "track-hero": {
    browserScale: 0.82,
    browserX: "50%",
    browserY: "50%",
    phoneSide: "right",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.62",
  },
  oxym: {
    browserScale: 0.76,
    browserX: "53%",
    browserY: "46%",
    phoneSide: "left",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.56",
  },
  "memorial-planning": {
    browserScale: 0.78,
    browserX: "47%",
    browserY: "52%",
    phoneSide: "right",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.6",
  },
  "gaming-global": {
    browserScale: 0.8,
    browserX: "52%",
    browserY: "48%",
    phoneSide: "right",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.58",
  },
  "woody-shop": {
    browserScale: 0.75,
    browserX: "48%",
    browserY: "45%",
    phoneSide: "left",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.56",
  },
  "real-time-chat": {
    browserScale: 0.8,
    browserX: "50%",
    browserY: "54%",
    phoneSide: "right",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.62",
  },
  "task-manager": {
    browserScale: 0.78,
    browserX: "50%",
    browserY: "48%",
    phoneSide: "right",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.58",
  },
  "smart-living": {
    browserScale: 0.76,
    browserX: "48%",
    browserY: "51%",
    phoneSide: "left",
    phoneOffset: "12px",
    phoneBottom: "32px",
    phoneScale: "0.58",
  },
};

function scaledSizes(sizes: string, scale: number): string {
  const factor = 1 / scale;
  return sizes.replace(/(\d+(?:\.\d+)?)(vw|px)/g, (_, n, unit) => {
    const value = Math.ceil(Number(n) * factor);
    return `${value}${unit}`;
  });
}

function ScreenImage({
  screen,
  alt,
  sizes,
  priority,
  className,
}: {
  screen: ProjectScreen;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={screen.src}
      alt={alt || screen.alt}
      width={screen.width}
      height={screen.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      unoptimized={process.env.NODE_ENV === "development"}
      className={cn("block h-full w-full object-cover object-top", className)}
    />
  );
}

function LiveWebScreen({ slug }: { slug: string }) {
  const Mock = getLiveWebMockup(slug);
  if (!Mock) return null;
  return createElement(Mock);
}

function LivePhoneScreen({ slug }: { slug: string }) {
  const Mock = getLivePhoneMockup(slug);
  if (!Mock) return null;
  return createElement(Mock);
}

export function ProjectMockup({
  project,
  sizes,
  density = "card",
  priority = false,
  reverse = false,
  hoverable = false,
  glow = true,
  descriptiveAlt = false,
  className,
}: ProjectMockupProps) {
  const { screens, productPath } = project;
  const isCatalog = density === "catalog";
  const catalogComposition =
    CATALOG_COMPOSITIONS[project.slug] ?? CATALOG_COMPOSITIONS["track-hero"];
  const stageRef = useRef<HTMLDivElement>(null);
  const [catalogSize, setCatalogSize] = useState({ width: 0, height: 0 });
  const [liveReady, setLiveReady] = useState(false);

  useEffect(() => {
    if (!isCatalog) return;

    const stage = stageRef.current;
    if (!stage) return;

    const measure = () => {
      setCatalogSize({ width: stage.clientWidth, height: stage.clientHeight });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(stage);

    return () => observer.disconnect();
  }, [isCatalog]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let frame: number | null = null;

    const hasIntersectionObserver =
      typeof window.IntersectionObserver === "function";

    if (!hasIntersectionObserver) {
      frame = window.requestAnimationFrame(() => setLiveReady(true));
      return () => {
        if (frame !== null) window.cancelAnimationFrame(frame);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        frame = window.requestAnimationFrame(() => setLiveReady(true));
        observer.disconnect();
      },
      { rootMargin: "240px" },
    );

    observer.observe(stage);
    return () => {
      observer.disconnect();
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  const catalogScale =
    isCatalog && catalogSize.width > 0 && catalogSize.height > 0
      ? Math.min(
          catalogComposition.browserScale,
          (catalogSize.width * 0.92) / 1000,
          (catalogSize.height * 0.9) / 960,
        )
      : catalogComposition.browserScale;
  const catalogPhoneScale =
    Number(catalogComposition.phoneScale) *
    (catalogScale / catalogComposition.browserScale);
  const phoneLayout = PHONE_POSITION[density];
  const browserScale =
    density === "catalog"
      ? catalogScale
      : density === "catalog-mobile"
        ? 0.42
        : density === "case-study"
          ? 0.58
        : 0.5;
  const stageClassName =
    density === "catalog"
      ? "relative h-full w-full max-w-[1000px]"
      : cn(
          "relative aspect-[16/10] w-full max-w-[1000px]",
          STAGE_MAX_HEIGHT[density],
        );
  const browserClassName = cn(
    "pointer-events-none absolute left-1/2 w-[1000px]",
    density === "catalog"
      ? "top-1/2 origin-center"
      : density === "case-study"
        ? "top-[20px] origin-top"
      : "top-[46px] origin-top",
  );
  const browserTransform = `translateX(-50%) scale(${browserScale})`;
  const catalogBrowserTransform = `translate(-50%, -50%) scale(${browserScale})`;
  const imageSizes = scaledSizes(sizes, browserScale);
  const webAlt = descriptiveAlt ? screens.web.alt : "";
  const phoneAlt = descriptiveAlt && screens.phone ? screens.phone.alt : "";
  const useLiveWeb = Boolean(
    liveReady && screens.liveWeb && getLiveWebMockup(project.slug),
  );
  const useLivePhone = Boolean(
    liveReady && screens.livePhone && getLivePhoneMockup(project.slug),
  );

  const phoneStyle = isCatalog
    ? {
        [catalogComposition.phoneSide]: catalogComposition.phoneOffset,
        bottom: catalogComposition.phoneBottom,
        transform: `scale(${catalogComposition.phoneScale})`,
        transformOrigin: `bottom ${catalogComposition.phoneSide}` as const,
      }
    : density === "case-study"
      ? {
          right: "7%",
          left: undefined as string | undefined,
          // Keep the phone's bottom edge level with the scaled browser frame.
          bottom: "139px",
          transform: "scale(0.52)",
          transformOrigin: "bottom right" as const,
        }
    : reverse
    ? {
        left: phoneLayout.left ?? phoneLayout.right ?? "12px",
        right: undefined as string | undefined,
        bottom: phoneLayout.bottom,
        transform: `scale(${phoneLayout.scale})`,
        transformOrigin: "bottom left" as const,
      }
    : {
        right: phoneLayout.right ?? "12px",
        left: undefined as string | undefined,
        bottom: phoneLayout.bottom,
        transform: `scale(${phoneLayout.scale})`,
        transformOrigin: "bottom right" as const,
      };

  return (
    <div
      className={cn(
        "relative min-h-[240px] aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[430px]",
        isCatalog ? "overflow-visible" : "overflow-hidden",
        className,
      )}
      ref={stageRef}
      style={
        isCatalog || density === "case-study"
          ? undefined
          : { backgroundColor: screens.backdrop }
      }
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          hoverable &&
            "origin-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transform-none motion-reduce:transition-none",
        )}
      >
        <div
          className={stageClassName}
        >
          <div
            className={browserClassName}
            style={{
              left: isCatalog ? catalogComposition.browserX : undefined,
              top: isCatalog ? catalogComposition.browserY : undefined,
              transform: isCatalog ? catalogBrowserTransform : browserTransform,
            }}
          >
            <BrowserFrame
              url={productPath}
              tone={
                project.slug === "track-hero"
                  ? "dark"
                  : project.slug === "oxym"
                    ? "oxym"
                  : project.slug === "gaming-global"
                    ? "ink"
                    : project.slug === "real-time-chat"
                      ? "walnut"
                      : project.slug === "memorial-planning"
                        ? "cream"
                        : project.slug === "task-manager"
                          ? "paper"
                          : project.slug === "woody-shop" ||
                            project.slug === "smart-living"
                            ? "white"
                            : "site"
              }
            >
              {useLiveWeb ? (
                <LiveWebScreen slug={project.slug} />
              ) : (
                <ScreenImage
                  screen={screens.web}
                  alt={webAlt}
                  sizes={imageSizes}
                  priority={priority}
                />
              )}
            </BrowserFrame>
          </div>

          {screens.phone ? (
            <div
              className={cn(
                "pointer-events-none absolute w-[270px]",
                isCatalog && "catalog-phone-frame",
              )}
              style={
                isCatalog
                  ? { ...phoneStyle, transform: `scale(${catalogPhoneScale})` }
                  : phoneStyle
              }
            >
              <PhoneFrame
                shellClassName={
                  project.slug === "oxym"
                    ? "bg-[#0C3B2E]"
                    : project.slug === "track-hero"
                      ? "bg-[#07080A]"
                      : project.slug === "gaming-global"
                        ? "bg-[#12110F]"
                        : project.slug === "real-time-chat"
                          ? "bg-[#14110E]"
                          : project.slug === "memorial-planning"
                            ? "bg-[#21483E]"
                            : project.slug === "woody-shop"
                              ? "bg-[#1A1A1A]"
                              : project.slug === "smart-living"
                                ? "bg-[#0F141B]"
                                : undefined
                }
                screenClassName={
                  project.slug === "track-hero"
                    ? "bg-[#07080A]"
                    : project.slug === "gaming-global"
                      ? "bg-[#12110F]"
                      : project.slug === "real-time-chat"
                        ? "bg-[#201B17]"
                        : project.slug === "memorial-planning"
                          ? "bg-[#F7F7F4]"
                          : project.slug === "woody-shop" ||
                            project.slug === "smart-living"
                            ? "bg-white"
                            : undefined
                }
                statusTone={
                  project.slug === "memorial-planning" ||
                  project.slug === "woody-shop" ||
                  project.slug === "smart-living"
                    ? "light"
                    : "dark"
                }
              >
                {useLivePhone ? (
                  <LivePhoneScreen slug={project.slug} />
                ) : (
                  <ScreenImage
                    screen={screens.phone}
                    alt={phoneAlt}
                    sizes={scaledSizes(sizes, Number(phoneLayout.scale))}
                    priority={priority}
                  />
                )}
              </PhoneFrame>
            </div>
          ) : null}
        </div>
      </div>

      {glow && density !== "case-study" ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: reverse
              ? "radial-gradient(circle at 60% 20%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)"
              : "radial-gradient(circle at 40% 20%, color-mix(in srgb, var(--accent) 16%, transparent), transparent 62%)",
          }}
        />
      ) : null}
    </div>
  );
}
