"use client";

import { useEffect, useState } from "react";

import { MockupVoteRow } from "@/components/mockups/mockup-vote-row";
import {
  getSectionMockupGroups,
  type MockupSection,
} from "@/components/mockups/mockups-registry";
import { buildMockupVoteKey } from "@/components/mockups/mockup-votes";
import { useMockupVotes } from "@/hooks/use-mockup-votes";

const SHOW_DROPPED_STORAGE_KEY = "azeem-mockup-show-dropped";

type MockupsSectionListProps = {
  section: MockupSection;
};

export function MockupsSectionList({ section }: MockupsSectionListProps) {
  const { votes } = useMockupVotes();
  const [showDropped, setShowDropped] = useState(false);
  const groups = getSectionMockupGroups(section);

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

  return (
    <>
      {groups.map((group) => {
        const visibleMockups = group.mockups.filter((mockup) => {
          const key = buildMockupVoteKey(section, group.version, mockup.label);
          const dropped = votes[key] === "drop";
          return showDropped || !dropped;
        });

        if (visibleMockups.length === 0) {
          return null;
        }

        return (
          <div key={group.version}>
            <div className="sticky top-16 z-10 border-y border-border bg-background/90 px-4 py-3 backdrop-blur-sm sm:px-6">
              <div className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl tracking-tight">{group.version}</h2>
                <p className="text-xs text-muted-foreground">{group.description}</p>
              </div>
            </div>

            {visibleMockups.map((mockup, index) => {
              const Component = mockup.Component;

              return (
                <div key={`${group.version}-${mockup.label}`}>
                  {index > 0 ? <hr className="border-border" /> : null}
                  <MockupVoteRow
                    section={section}
                    version={group.version}
                    label={mockup.label}
                  >
                    <Component />
                  </MockupVoteRow>
                </div>
              );
            })}
          </div>
        );
      })}

      <ShowDroppedToggle
        section={section}
        showDropped={showDropped}
        onToggle={toggleShowDropped}
      />
    </>
  );
}

function ShowDroppedToggle({
  section,
  showDropped,
  onToggle,
}: {
  section: MockupSection;
  showDropped: boolean;
  onToggle: () => void;
}) {
  const { votes } = useMockupVotes();
  const groups = getSectionMockupGroups(section);

  let dropped = 0;
  for (const group of groups) {
    for (const mockup of group.mockups) {
      const key = buildMockupVoteKey(section, group.version, mockup.label);
      if (votes[key] === "drop") {
        dropped += 1;
      }
    }
  }

  if (dropped === 0) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <button
        type="button"
        onClick={onToggle}
        className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        {showDropped
          ? `Hide ${dropped} dropped mockup${dropped === 1 ? "" : "s"}`
          : `Show ${dropped} dropped mockup${dropped === 1 ? "" : "s"}`}
      </button>
    </div>
  );
}
