"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type SystemNode = {
  id: string;
  label: string;
  example: string;
};

const nodes: SystemNode[] = [
  {
    id: "interface",
    label: "Interface",
    example: "Customer booking and operator dashboards",
  },
  {
    id: "api",
    label: "API",
    example: "GraphQL, REST, and real-time services",
  },
  {
    id: "data",
    label: "Data",
    example: "PostgreSQL, MongoDB, and DynamoDB",
  },
  {
    id: "cloud",
    label: "Cloud",
    example: "AWS serverless and CI/CD",
  },
  {
    id: "ai",
    label: "AI",
    example: "RAG, tool calling, and MCP",
  },
];

const STEP_MS = 2200;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Every label and example below is real, visible text, not content hidden
 * behind hover or focus. Interaction only adds emphasis to the active node,
 * so the map stays legible with JavaScript or animation disabled.
 */
export function SystemsMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userSelected, setUserSelected] = useState(false);
  const [fillHeight, setFillHeight] = useState(0);
  const [trackTop, setTrackTop] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const measure = useCallback((index: number) => {
    const track = trackRef.current;
    const first = nodeRefs.current[0];
    const last = nodeRefs.current[nodes.length - 1];
    const active = nodeRefs.current[index];
    if (!track || !first || !last || !active) return;

    const trackBox = track.getBoundingClientRect();
    const firstBox = first.getBoundingClientRect();
    const lastBox = last.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();

    const firstCenter = firstBox.top - trackBox.top + firstBox.height / 2;
    const lastCenter = lastBox.top - trackBox.top + lastBox.height / 2;
    const activeCenter = activeBox.top - trackBox.top + activeBox.height / 2;
    const span = Math.max(0, lastCenter - firstCenter);

    setTrackTop(firstCenter);
    setTrackHeight(span);
    setFillHeight(Math.min(span, Math.max(0, activeCenter - firstCenter)));
  }, []);

  useLayoutEffect(() => {
    measure(activeIndex);
  }, [activeIndex, measure]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new ResizeObserver(() => measure(activeIndex));
    observer.observe(track);
    return () => observer.disconnect();
  }, [activeIndex, measure]);

  useEffect(() => {
    if (paused) return;

    let id: number | undefined;

    const stop = () => {
      if (id !== undefined) window.clearInterval(id);
      id = undefined;
    };

    const start = () => {
      if (prefersReducedMotion() || document.hidden) return;
      stop();
      id = window.setInterval(() => {
        setActiveIndex((current) => (current + 1) % nodes.length);
      }, STEP_MS);
    };

    const onVisibility = () => {
      stop();
      if (!document.hidden) start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [paused]);

  function pause() {
    setPaused(true);
  }

  function resumeIfIdle() {
    const root = rootRef.current;
    if (root?.contains(document.activeElement)) return;
    setPaused(false);
    setUserSelected(false);
  }

  function selectIndex(index: number) {
    setActiveIndex(index);
    setUserSelected(true);
    pause();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    const last = nodes.length - 1;
    let next = index;

    if (event.key === "ArrowDown") next = Math.min(last, index + 1);
    else if (event.key === "ArrowUp") next = Math.max(0, index - 1);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;

    event.preventDefault();
    selectIndex(next);
    buttonRefs.current[next]?.focus();
  }

  return (
    <div
      ref={rootRef}
      className="systems-map w-full max-w-[380px] rounded-lg border border-border p-6 sm:p-8"
      onPointerEnter={pause}
      onPointerLeave={resumeIfIdle}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          resumeIfIdle();
        }
      }}
      style={
        {
          "--systems-fill": `${fillHeight}px`,
          "--systems-track-top": `${trackTop}px`,
          "--systems-track-height": `${trackHeight}px`,
        } as React.CSSProperties
      }
    >
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        How the work connects
      </p>

      <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
        {nodes.map((node, index) => (
          <span key={node.id}>
            {index > 0 ? " → " : null}
            <span className={index === activeIndex ? "text-accent" : undefined}>
              {node.label}
            </span>
          </span>
        ))}
      </p>

      <div ref={trackRef} className="relative mt-6 pl-9">
        <div
          aria-hidden="true"
          className="systems-map-track absolute left-[7px] w-px overflow-hidden bg-border"
        >
          <span className="systems-map-fill absolute top-0 left-0 w-full bg-accent" />
        </div>

        <ol
          aria-label="Interface, API, Data, Cloud, and AI, connected end to end"
          className="flex flex-col gap-5"
        >
          {nodes.map((node, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={node.id}>
                <button
                  ref={(element) => {
                    buttonRefs.current[index] = element;
                  }}
                  type="button"
                  aria-pressed={userSelected ? isActive : false}
                  onMouseEnter={() => selectIndex(index)}
                  onFocus={() => selectIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className="group relative block w-full text-left"
                >
                  <span
                    ref={(element) => {
                      nodeRefs.current[index] = element;
                    }}
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1.5 -left-9 flex size-3.5 items-center justify-center rounded-full border-2 transition-colors duration-300",
                      isActive
                        ? "systems-map-ping border-accent bg-accent"
                        : "border-border bg-background group-hover:border-accent",
                    )}
                  />
                  <span
                    className={cn(
                      "flex items-baseline gap-2 font-display text-lg transition-colors duration-300",
                      isActive ? "text-accent" : "text-foreground",
                    )}
                  >
                    <span className="font-mono text-[0.65rem] tracking-[0.14em] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {node.label}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block text-sm transition-colors duration-300",
                      isActive ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {node.example}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
