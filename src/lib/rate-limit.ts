import { createHash } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

type Entry = {
  count: number;
  resetAt: number;
};

// In-memory only. Counts reset per server instance, so on serverless hosts the
// effective cap is MAX_REQUESTS per warm instance. Pair it with the host's
// WAF rate-limit rules (or a shared store) if the form starts drawing abuse.
const hits = new Map<string, Entry>();

/**
 * Groups IPv6 addresses by their /64 prefix, since a single client usually
 * controls a whole /64 and could otherwise rotate addresses per request.
 * IPv4 addresses (including IPv4-mapped IPv6) are used as-is.
 */
export function rateLimitKey(ip: string): string {
  const address = ip.trim().toLowerCase();
  if (!address.includes(":") || address.startsWith("::ffff:")) return address;

  const [head, tail = ""] = address.split("::");
  const headParts = head ? head.split(":") : [];
  const tailParts = tail ? tail.split(":") : [];
  const missing = Math.max(0, 8 - headParts.length - tailParts.length);
  const groups = [...headParts, ...Array(missing).fill("0"), ...tailParts];
  return `${groups.slice(0, 4).join(":")}::/64`;
}

function hashKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

function prune(now: number) {
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
  // Still over the cap after dropping expired entries: evict the oldest
  // (Map iteration order is insertion order) so memory stays bounded.
  while (hits.size >= MAX_TRACKED_KEYS) {
    const oldest = hits.keys().next().value;
    if (oldest === undefined) break;
    hits.delete(oldest);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  retryAfterMs?: number;
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  if (hits.size >= MAX_TRACKED_KEYS) prune(now);

  const key = hashKey(rateLimitKey(ip));
  const entry = hits.get(key);

  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true };
}

/** Test-only: clears all tracked entries. */
export function resetRateLimit() {
  hits.clear();
}
