"use client";

import {
  cloudMockups,
  dataMockups,
  webMockups,
  type MockupSection,
} from "@/components/mockups/mockups-registry";
import { buildMockupVoteKey } from "@/components/mockups/mockup-votes";
import { useMockupVotes } from "@/hooks/use-mockup-votes";

type MockupVoteSummaryProps = {
  section: MockupSection;
};

export function MockupVoteSummary({ section }: MockupVoteSummaryProps) {
  const { votes } = useMockupVotes();

  const mockups =
    section === "cloud"
      ? cloudMockups
      : section === "web"
        ? webMockups
        : dataMockups;

  let kept = 0;
  let dropped = 0;

  for (const mockup of mockups) {
    const key = buildMockupVoteKey(section, mockup.version, mockup.label);
    const vote = votes[key];

    if (vote === "keep") {
      kept += 1;
    } else if (vote === "drop") {
      dropped += 1;
    }
  }

  const undecided = mockups.length - kept - dropped;
  const visible = mockups.length - (dropped > 0 ? dropped : 0);

  return (
    <div className="mx-auto mt-4 max-w-7xl rounded-lg border border-border bg-background/80 px-4 py-3 text-sm sm:px-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-muted-foreground">
          <span className="font-medium text-success">{kept} kept</span>
          {" · "}
          <span className="font-medium text-error">{dropped} hidden</span>
          {" · "}
          <span>{undecided} undecided</span>
          {dropped > 0 ? (
            <>
              {" · "}
              <span>{visible} showing</span>
            </>
          ) : null}
        </p>
        <p className="text-xs text-muted-foreground">
          Dropped mockups are hidden. Use the link at the bottom to reveal them.
        </p>
      </div>
    </div>
  );
}
