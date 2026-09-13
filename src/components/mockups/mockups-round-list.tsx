"use client";

import { useEffect, useState, type ReactNode } from "react";

import { MockupVoteRow } from "@/components/mockups/mockup-vote-row";
import type { MockupSection, MockupVersion } from "@/components/mockups/mockups-registry";
import { buildMockupVoteKey } from "@/components/mockups/mockup-votes";
import { useMockupVotes } from "@/hooks/use-mockup-votes";

const SHOW_DROPPED_STORAGE_KEY = "azeem-mockup-show-dropped";

type RoundMockupEntry = {
  label: string;
  component: ReactNode;
};

type RoundMockupGroup = {
  title: string;
  mockups: RoundMockupEntry[];
};

type MockupsRoundListProps = {
  version: MockupVersion;
  groups: RoundMockupGroup[];
};

export function MockupsRoundList({ version, groups }: MockupsRoundListProps) {
  const { votes } = useMockupVotes();
  const [showDropped, setShowDropped] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setShowDropped(window.localStorage.getItem(SHOW_DROPPED_STORAGE_KEY) === "true");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const toggleShowDropped = () => {
    const next = !showDropped;
    setShowDropped(next);
    window.localStorage.setItem(SHOW_DROPPED_STORAGE_KEY, String(next));
    window.dispatchEvent(new CustomEvent("mockup-votes-changed"));
  };

  let totalDropped = 0;

  for (const group of groups) {
    const section = group.title.toLowerCase() as MockupSection;
    for (const mockup of group.mockups) {
      const key = buildMockupVoteKey(section, version, mockup.label);
      if (votes[key] === "drop") {
        totalDropped += 1;
      }
    }
  }

  return (
    <>
      {groups.map((group) => {
        const section = group.title.toLowerCase() as MockupSection;
        const visibleMockups = group.mockups.filter((mockup) => {
          const key = buildMockupVoteKey(section, version, mockup.label);
          const dropped = votes[key] === "drop";
          return showDropped || !dropped;
        });

        if (visibleMockups.length === 0) {
          return null;
        }

        return (
          <div key={group.title}>
            <div className="sticky top-16 z-10 border-y border-border bg-background/90 px-4 py-3 backdrop-blur-sm sm:px-6">
              <h2 className="mx-auto max-w-7xl font-display text-xl tracking-tight">
                {group.title}
              </h2>
            </div>

            {visibleMockups.map((mockup, index) => (
              <div key={mockup.label}>
                {index > 0 ? <hr className="border-border" /> : null}
                <MockupVoteRow section={section} version={version} label={mockup.label}>
                  {mockup.component}
                </MockupVoteRow>
              </div>
            ))}
          </div>
        );
      })}

      {totalDropped > 0 ? (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <button
            type="button"
            onClick={toggleShowDropped}
            className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {showDropped
              ? `Hide ${totalDropped} dropped mockup${totalDropped === 1 ? "" : "s"}`
              : `Show ${totalDropped} dropped mockup${totalDropped === 1 ? "" : "s"}`}
          </button>
        </div>
      ) : null}
    </>
  );
}
