import type { MockupSection, MockupVersion } from "@/components/mockups/mockups-registry";

export type MockupVote = "keep" | "drop";

export type MockupVoteMap = Record<string, MockupVote>;

export const MOCKUP_VOTES_STORAGE_KEY = "azeem-mockup-votes";

export function buildMockupVoteKey(
  section: MockupSection,
  version: MockupVersion,
  label: string,
) {
  return `${section}:${version}:${label}`;
}

export function readMockupVotes(): MockupVoteMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(MOCKUP_VOTES_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") {
      return {};
    }

    const votes: MockupVoteMap = {};

    for (const [key, value] of Object.entries(parsed)) {
      if (value === "keep" || value === "drop") {
        votes[key] = value;
      }
    }

    return votes;
  } catch {
    return {};
  }
}

export function writeMockupVotes(votes: MockupVoteMap) {
  window.localStorage.setItem(MOCKUP_VOTES_STORAGE_KEY, JSON.stringify(votes));
}

export function setMockupVote(key: string, vote: MockupVote | null) {
  const votes = readMockupVotes();

  if (vote === null) {
    delete votes[key];
  } else {
    votes[key] = vote;
  }

  writeMockupVotes(votes);
  window.dispatchEvent(new CustomEvent("mockup-votes-changed"));
}

export function getDroppedMockupKeys(votes: MockupVoteMap = readMockupVotes()) {
  return Object.entries(votes)
    .filter(([, vote]) => vote === "drop")
    .map(([key]) => key);
}

export function getKeptMockupKeys(votes: MockupVoteMap = readMockupVotes()) {
  return Object.entries(votes)
    .filter(([, vote]) => vote === "keep")
    .map(([key]) => key);
}
