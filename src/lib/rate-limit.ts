import { createHash } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_TRACKED_KEYS = 5000;

type Entry = {
  count: number;
  resetAt: number;
};

// In-memory only. Resets per server instance, which is fine for a low-traffic
// portfolio contact form; a shared store would be needed at real scale.
const hits = new Map<string, Entry>();

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

function prune(now: number) {
  if (hits.size < MAX_TRACKED_KEYS) return;
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  retryAfterMs?: number;
};

export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  prune(now);

  const key = hashIp(ip);
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
