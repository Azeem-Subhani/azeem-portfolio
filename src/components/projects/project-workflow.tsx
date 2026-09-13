"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useReducedMotion } from "motion/react";

import { StackIcon } from "@/components/projects/stack-icons";
import { getWorkflow } from "@/content/workflows";
import { cn } from "@/lib/utils";
import type { WorkflowTile } from "@/types/content";

type ProjectWorkflowProps = {
  slug: string;
  label: string;
  interactive?: boolean;
  className?: string;
};

const SPARKS = [
  { delay: "0s", duration: "18s", ring: "a" },
  { delay: "6s", duration: "18s", ring: "a" },
  { delay: "3s", duration: "22s", ring: "b" },
  { delay: "14s", duration: "22s", ring: "b" },
] as const;

function Tile({
  tile,
  hub,
  interactive,
  hot,
  delay,
  onHot,
}: {
  tile: WorkflowTile;
  hub?: boolean;
  interactive: boolean;
  hot: boolean;
  delay: string;
  onHot: (id: string | null) => void;
}) {
  return (
    <div
      data-tile={tile.id}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? tile.label : undefined}
      className={cn(
        "project-workflow-tile",
        hub && "is-hub",
        hot && "is-hot",
        interactive && "is-interactive",
      )}
      onMouseEnter={() => onHot(tile.id)}
      onMouseLeave={() => onHot(null)}
      onFocus={() => onHot(tile.id)}
      onBlur={() => onHot(null)}
    >
      <span className="project-workflow-bob" style={{ "--float-delay": delay } as CSSProperties}>
        <StackIcon id={tile.icon} label={tile.label} />
      </span>
    </div>
  );
}

export function ProjectWorkflow({
  slug,
  label,
  interactive = false,
  className,
}: ProjectWorkflowProps) {
  const workflow = getWorkflow(slug);
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [hot, setHot] = useState<string | null>(null);
  const [motionReady, setMotionReady] = useState(false);
  const allowMotion = motionReady && reduce === false;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMotionReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "80px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  if (!workflow) return null;

  const hotTile =
    workflow.hub.id === hot
      ? workflow.hub
      : workflow.orbit.find((tile) => tile.id === hot);
  const caption = hotTile?.label ?? workflow.hub.label;
  const count = workflow.orbit.length;

  return (
    <div
      ref={rootRef}
      aria-hidden={interactive ? undefined : true}
      role={interactive ? "group" : undefined}
      aria-label={interactive ? label : undefined}
      className={cn(
        "project-workflow",
        !visible && "is-paused",
        !allowMotion && "is-still",
        interactive && "is-detail",
        className,
      )}
    >
      <div className="project-workflow-stage">
        <div className="project-workflow-glow" />

        {allowMotion
          ? SPARKS.map((spark, index) => (
              <span
                key={`${spark.ring}-${index}`}
                className={cn("project-workflow-spark", `is-ring-${spark.ring}`)}
                style={
                  {
                    "--spark-delay": spark.delay,
                    "--spark-duration": spark.duration,
                  } as CSSProperties
                }
              />
            ))
          : null}

        <div className="project-workflow-orbit">
          {workflow.orbit.map((tile, index) => (
            <div
              key={tile.id}
              className="project-workflow-slot"
              style={
                {
                  "--angle": `${(index / count) * 360}deg`,
                } as CSSProperties
              }
            >
              <div className="project-workflow-face">
                <Tile
                  tile={tile}
                  interactive={interactive}
                  hot={hot === tile.id}
                  delay={`${(index * 0.35).toFixed(2)}s`}
                  onHot={setHot}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="project-workflow-hub">
          <Tile
            tile={workflow.hub}
            hub
            interactive={interactive}
            hot={hot === workflow.hub.id}
            delay="0.1s"
            onHot={setHot}
          />
        </div>
      </div>

      {interactive ? (
        <p className="project-workflow-caption">{caption}</p>
      ) : null}
    </div>
  );
}
