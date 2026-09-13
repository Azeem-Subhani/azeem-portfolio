"use client";

import type { ReactNode } from "react";

import { buildMockupVoteKey } from "@/components/mockups/mockup-votes";
import type { MockupSection, MockupVersion } from "@/components/mockups/mockups-registry";
import { useMockupVote } from "@/hooks/use-mockup-votes";

type MockupVoteRowProps = {
  section: MockupSection;
  version: MockupVersion;
  label: string;
  children: ReactNode;
};

function VoteButton({
  active,
  kind,
  onClick,
  label,
}: {
  active: boolean;
  kind: "keep" | "drop";
  onClick: () => void;
  label: string;
}) {
  const isKeep = kind === "keep";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      onClick={onClick}
      className={
        active
          ? isKeep
            ? "border-success/50 bg-success/15 text-success"
            : "border-error/50 bg-error/15 text-error"
          : "border-border bg-background text-muted-foreground hover:border-foreground/25 hover:text-foreground"
      }
      style={{
        width: "2rem",
        height: "2rem",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "0.375rem",
        borderWidth: "1px",
        fontSize: "0.875rem",
        lineHeight: 1,
        transition: "color 150ms, background-color 150ms, border-color 150ms",
      }}
    >
      {isKeep ? "✓" : "✗"}
    </button>
  );
}

export function MockupVoteRow({
  section,
  version,
  label,
  children,
}: MockupVoteRowProps) {
  const voteKey = buildMockupVoteKey(section, version, label);
  const { current, setKeep, setDrop } = useMockupVote(voteKey);

  return (
    <div
      data-mockup-vote={current ?? "unset"}
      className={
        current === "drop"
          ? "opacity-45"
          : current === "keep"
            ? "ring-1 ring-inset ring-success/25"
            : undefined
      }
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 pt-6 sm:px-6">
        <p
          className={
            current === "drop"
              ? "text-xs font-medium text-muted-foreground line-through"
              : current === "keep"
                ? "text-xs font-medium text-success"
                : "text-xs font-medium text-muted-foreground"
          }
        >
          {label}
        </p>
        <div className="flex shrink-0 items-center gap-1.5">
          <VoteButton
            kind="keep"
            active={current === "keep"}
            onClick={setKeep}
            label={current === "keep" ? "Clear keep vote" : "Keep this mockup"}
          />
          <VoteButton
            kind="drop"
            active={current === "drop"}
            onClick={setDrop}
            label={current === "drop" ? "Clear drop vote" : "Drop this mockup"}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
