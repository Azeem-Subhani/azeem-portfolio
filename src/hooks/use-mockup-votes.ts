"use client";

import { useCallback, useEffect, useState } from "react";

import {
  readMockupVotes,
  setMockupVote,
  type MockupVote,
  type MockupVoteMap,
} from "@/components/mockups/mockup-votes";

export function useMockupVotes() {
  const [votes, setVotes] = useState<MockupVoteMap>(() =>
    typeof window === "undefined" ? {} : readMockupVotes(),
  );

  useEffect(() => {
    const sync = () => setVotes(readMockupVotes());
    window.addEventListener("mockup-votes-changed", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("mockup-votes-changed", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const vote = useCallback((key: string, next: MockupVote | null) => {
    setMockupVote(key, next);
    setVotes(readMockupVotes());
  }, []);

  return { votes, vote };
}

export function useMockupVote(key: string) {
  const { votes, vote } = useMockupVotes();
  const current = votes[key] ?? null;

  const setKeep = useCallback(() => {
    vote(key, current === "keep" ? null : "keep");
  }, [current, key, vote]);

  const setDrop = useCallback(() => {
    vote(key, current === "drop" ? null : "drop");
  }, [current, key, vote]);

  return { current, setKeep, setDrop };
}
