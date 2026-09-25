"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import type { CloudScene } from "@/components/services/cloud-hero/cloud-point-scene";
import { cn } from "@/lib/utils";

/**
 * Stage geometry shared by the DOM layer (wires, providers, packets) and the
 * WebGL cloud. The scene frames its camera so the cloud's flat base lands on
 * BASE_Y and each provider stream starts at its wire's TERMINAL_Y.
 */
const PROVIDERS = [
  { name: "AWS", x: 0.3 },
  { name: "Azure", x: 0.5 },
  { name: "GCP", x: 0.7 },
] as const;
const BASE_Y = 0.56;
const TERMINAL_Y = 0.86;
/** Wires tuck a little way into the cloud so they read as coming out of it. */
const WIRE_TOP = BASE_Y - 0.03;

const reducedQuery = "(prefers-reduced-motion: reduce)";

const pct = (fraction: number) => `${fraction * 100}%`;

export function CloudStage({ className }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const reduced = window.matchMedia(reducedQuery).matches;
    const root = document.documentElement;
    const isDark = () => root.classList.contains("dark");
    const wires = Array.from(stage.querySelectorAll<HTMLElement>("[data-cloud-wire]"));
    const terminals = Array.from(stage.querySelectorAll<HTMLElement>("[data-cloud-terminal]"));
    const packets = Array.from(stage.querySelectorAll<HTMLElement>("[data-cloud-packet]"));
    const rings = Array.from(stage.querySelectorAll<HTMLElement>("[data-cloud-ring]"));

    let scene: CloudScene | null = null;
    let cancelled = false;
    let visible = true;
    let introDue = false;
    let idleCall: gsap.core.Tween | null = null;
    const cleanups: Array<() => void> = [];

    // One packet down a wire, and the provider's joint answers when it lands.
    const ship = (index: number, delay = 0) => {
      const packet = packets[index];
      const ring = rings[index];
      if (!packet || !ring) return;
      gsap
        .timeline({ delay })
        .fromTo(
          packet,
          { top: pct(WIRE_TOP + 0.02), opacity: 0 },
          { top: pct(TERMINAL_Y), opacity: 1, duration: 0.9, ease: "power2.in" },
        )
        .to(packet, { opacity: 0, duration: 0.15 })
        .fromTo(ring, { scale: 1, opacity: 0.8 }, { scale: 2.6, opacity: 0, duration: 0.7, ease: "power2.out" }, "<");
    };

    // After the first deploy, an occasional packet keeps the stack visibly live.
    const scheduleIdle = () => {
      idleCall = gsap.delayedCall(3.5 + Math.random() * 3.5, () => {
        if (visible && !document.hidden) ship(Math.floor(Math.random() * PROVIDERS.length));
        scheduleIdle();
      });
    };

    const onConverged = () => {
      PROVIDERS.forEach((_, index) => ship(index, index * 0.18));
      scheduleIdle();
    };

    // Terminals appear, wires draw up toward the cloud, then the cloud forms.
    const intro = gsap.timeline({ paused: true });
    if (!reduced) {
      gsap.set(terminals, { opacity: 0, y: 6 });
      gsap.set(wires, { scaleY: 0, transformOrigin: "center bottom" });
      intro
        .to(terminals, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power3.out" }, 0.2)
        .to(wires, { scaleY: 1, duration: 0.7, stagger: 0.08, ease: "power2.inOut" }, 0.4)
        .call(() => {
          introDue = true;
          scene?.startIntro();
        }, [], 0.85);
    }

    void import("@/components/services/cloud-hero/cloud-point-scene").then(({ createCloudScene }) => {
      if (cancelled) return;
      try {
        scene = createCloudScene({
          canvas,
          wireX: PROVIDERS.map((p) => p.x),
          baseY: BASE_Y,
          terminalY: TERMINAL_Y,
          dark: isDark(),
          reduced,
          onConverged,
        });
      } catch {
        // No WebGL: the wires and providers still carry the diagram.
        setFallback(true);
        return;
      }

      const current = scene;
      const size = () => current.resize(stage.clientWidth, stage.clientHeight);
      size();
      const resizeObserver = new ResizeObserver(size);
      resizeObserver.observe(stage);
      cleanups.push(() => resizeObserver.disconnect());

      const themeObserver = new MutationObserver(() => current.setDark(isDark()));
      themeObserver.observe(root, { attributes: true, attributeFilter: ["class"] });
      cleanups.push(() => themeObserver.disconnect());

      if (reduced) return;

      // Only run the loop while the stage is on screen and the tab is visible.
      const sync = () => (visible && !document.hidden ? current.play() : current.pause());
      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        sync();
      });
      io.observe(stage);
      document.addEventListener("visibilitychange", sync);
      cleanups.push(() => {
        io.disconnect();
        document.removeEventListener("visibilitychange", sync);
      });

      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = stage.getBoundingClientRect();
        current.setPointer({
          x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
          y: -(((event.clientY - rect.top) / rect.height) * 2 - 1),
        });
      };
      const leave = () => current.setPointer(null);
      stage.addEventListener("pointermove", move);
      stage.addEventListener("pointerleave", leave);
      cleanups.push(() => {
        stage.removeEventListener("pointermove", move);
        stage.removeEventListener("pointerleave", leave);
      });

      sync();
      // The DOM intro may have finished before three.js arrived.
      if (introDue) current.startIntro();
    });

    intro.play();

    return () => {
      cancelled = true;
      intro.kill();
      idleCall?.kill();
      gsap.killTweensOf([...packets, ...rings]);
      gsap.set([...terminals, ...wires], { clearProps: "opacity,transform" });
      cleanups.forEach((fn) => fn());
      scene?.dispose();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label="AWS, Azure, and GCP feeding one cloud stack"
      className={cn("relative aspect-[10/9] w-full select-none", className)}
    >
      {/* Wires sit under the canvas so the cloud's points cover their tops. */}
      {PROVIDERS.map((provider) => (
        <span
          key={provider.name}
          aria-hidden
          data-cloud-wire
          className="absolute w-px bg-foreground/20"
          style={{
            left: pct(provider.x),
            top: pct(WIRE_TOP),
            height: pct(TERMINAL_Y - WIRE_TOP),
          }}
        />
      ))}

      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />

      {fallback ? (
        <span
          aria-hidden
          className="absolute inset-x-[14%] top-[12%] bottom-[44%] rounded-[45%_45%_12%_12%] bg-[radial-gradient(ellipse_at_50%_40%,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)]"
        />
      ) : null}

      {PROVIDERS.map((provider) => (
        <span
          key={provider.name}
          aria-hidden
          data-cloud-packet
          className="pointer-events-none absolute size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 shadow-[0_0_10px_var(--accent)]"
          style={{ left: pct(provider.x), top: pct(WIRE_TOP) }}
        />
      ))}

      {PROVIDERS.map((provider) => (
        // The outer box centers on the wire; GSAP only animates the inner one,
        // because it folds a CSS `translate` into its own transform otherwise.
        <div
          key={provider.name}
          className="absolute -translate-x-1/2"
          style={{ left: pct(provider.x), top: pct(TERMINAL_Y) }}
        >
          <div data-cloud-terminal className="flex flex-col items-center">
            <span aria-hidden className="relative -mt-[3.5px] block size-[7px] rounded-full border border-accent bg-background">
              <span data-cloud-ring className="absolute -inset-px rounded-full border border-accent opacity-0" />
            </span>
            <span className="mt-3 text-[13px] font-medium text-muted-foreground">{provider.name}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
