"use client";

import { useEffect, useRef, useState } from "react";

import {
  createGlassStack,
  type AnchorName,
  type GlassStack,
} from "@/components/services/data-management-grok/create-glass-stack";

const CALLOUTS: Array<{ name: AnchorName; label: string }> = [
  { name: "postgres", label: "Postgres" },
  { name: "writes", label: "Live writes" },
  { name: "warehouse", label: "Warehouse" },
];

export function GlassStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    let stack: GlassStack;
    try {
      stack = createGlassStack(canvas);
    } catch {
      // WebGL context creation is an external system; record its failure once.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFailed(true);
      return;
    }

    const stage = canvas.parentElement;
    if (!stage) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lines = CALLOUTS.map((item) =>
      overlay.querySelector<SVGLineElement>(`[data-leader="${item.name}"]`),
    );
    const dots = CALLOUTS.map((item) =>
      overlay.querySelector<SVGCircleElement>(`[data-dot="${item.name}"]`),
    );
    const labels = CALLOUTS.map((item) =>
      overlay.querySelector<HTMLElement>(`[data-label="${item.name}"]`),
    );

    let frames = 0;
    let running = true;
    let widthSeen = 0;
    let heightSeen = 0;
    const started = performance.now();

    const paint = (now: number) => {
      if (!running) return;
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      if (width > 0 && height > 0) {
        if (width !== widthSeen || height !== heightSeen) {
          widthSeen = width;
          heightSeen = height;
          stack.resize(width, height);
        }
        stack.render((now - started) / 1000, reduced);
        const gap = Math.min(108, Math.max(64, width * 0.11));
        CALLOUTS.forEach((item, index) => {
          const point = stack.project(item.name, width, height);
          const label = labels[index];
          const line = lines[index];
          const dot = dots[index];
          if (!label || !line || !dot) return;
          const labelWidth = label.offsetWidth || 110;
          const x2 = Math.min(point.x + gap, width - labelWidth - 8);
          const shown = point.visible && x2 > point.x + 24;
          label.dataset.hidden = shown ? "false" : "true";
          line.style.display = shown ? "" : "none";
          dot.style.display = shown ? "" : "none";
          if (!shown) return;
          label.style.setProperty("--x", `${x2 + 14}px`);
          label.style.setProperty("--y", `${point.y}px`);
          line.setAttribute("x1", point.x.toFixed(1));
          line.setAttribute("y1", point.y.toFixed(1));
          line.setAttribute("x2", (x2 - 2).toFixed(1));
          line.setAttribute("y2", point.y.toFixed(1));
          dot.setAttribute("cx", point.x.toFixed(1));
          dot.setAttribute("cy", point.y.toFixed(1));
        });
        overlay.dataset.ready = "true";
      }

      frames += 1;
      if (!reduced || frames < 3) {
        request = window.requestAnimationFrame(paint);
      }
    };

    let request = window.requestAnimationFrame(paint);

    const onResize = () => {
      widthSeen = 0;
      heightSeen = 0;
      if (reduced) {
        frames = 0;
        running = true;
        window.cancelAnimationFrame(request);
        request = window.requestAnimationFrame(paint);
      }
    };
    const observer = new ResizeObserver(onResize);
    observer.observe(stage);

    const onHide = () => {
      if (document.hidden) {
        running = false;
        window.cancelAnimationFrame(request);
        return;
      }
      if (!running) {
        running = true;
        request = window.requestAnimationFrame(paint);
      }
    };
    document.addEventListener("visibilitychange", onHide);

    return () => {
      running = false;
      window.cancelAnimationFrame(request);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onHide);
      stack.dispose();
    };
  }, []);

  if (failed) {
    return (
      <p className="grok-fallback">
        Postgres on the top plate, live writes through the middle, the warehouse
        underneath.
      </p>
    );
  }

  return (
    <div className="grok-stage">
      <canvas ref={canvasRef} aria-hidden="true" />
      <p className="grok-sr">
        Three glass plates. Postgres is the drum on the top plate. Live writes
        pass through the middle plate. The warehouse is the violet plate below.
      </p>
      <div className="grok-callouts" ref={overlayRef}>
        <svg className="grok-leaders" aria-hidden="true">
          {CALLOUTS.map((item) => (
            <g key={item.name}>
              <circle data-dot={item.name} r="3.5" />
              <line data-leader={item.name} />
            </g>
          ))}
        </svg>
        {CALLOUTS.map((item) => (
          <p key={item.name} className="grok-label" data-label={item.name} data-hidden="true">
            <span className="grok-label__tick" aria-hidden="true" />
            {item.label}
          </p>
        ))}
      </div>
    </div>
  );
}
