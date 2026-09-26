// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/contact", () => ({ sendContactEmail: vi.fn() }));

import { POST } from "@/app/api/contact/route";
import { sendContactEmail } from "@/lib/contact";
import { checkRateLimit, rateLimitKey, resetRateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/schemas";

const sendMock = vi.mocked(sendContactEmail);

const validBody = {
  name: "Test Visitor",
  email: "visitor@example.com",
  phone: "",
  message: "I would like to talk about a booking platform.",
  company: "",
};

function contactRequest(
  body: unknown,
  {
    origin = "http://localhost:3000",
    contentType = "application/json",
    ip = "203.0.113.10",
  }: { origin?: string | null; contentType?: string; ip?: string } = {},
) {
  const headers = new Headers({ host: "localhost:3000", "x-forwarded-for": ip });
  if (origin) headers.set("origin", origin);
  if (contentType) headers.set("content-type", contentType);
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

describe("contactFormSchema", () => {
  it("accepts a filled honeypot so the route can drop it silently", () => {
    expect(contactFormSchema.safeParse({ ...validBody, company: "Acme" }).success).toBe(true);
  });

  it("rejects line breaks in the name", () => {
    const result = contactFormSchema.safeParse({ ...validBody, name: "Eve\r\nBcc: x@y.z" });
    expect(result.success).toBe(false);
  });

  it("validates phone digit counts", () => {
    expect(contactFormSchema.safeParse({ ...validBody, phone: "+1 555 010 0199" }).success).toBe(true);
    expect(contactFormSchema.safeParse({ ...validBody, phone: "123" }).success).toBe(false);
    expect(contactFormSchema.safeParse({ ...validBody, phone: "call me" }).success).toBe(false);
  });
});

describe("rate limit", () => {
  beforeEach(() => resetRateLimit());

  it("groups IPv6 addresses by /64", () => {
    expect(rateLimitKey("2001:db8:1:2:aaaa::1")).toBe(rateLimitKey("2001:db8:1:2:bbbb::9"));
    expect(rateLimitKey("2001:db8:1:2::1")).not.toBe(rateLimitKey("2001:db8:1:3::1"));
    expect(rateLimitKey("203.0.113.10")).toBe("203.0.113.10");
  });

  it("allows five requests per window, then reports a retry delay", () => {
    for (let i = 0; i < 5; i++) expect(checkRateLimit("198.51.100.1").allowed).toBe(true);
    const blocked = checkRateLimit("198.51.100.1");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => {
    resetRateLimit();
    sendMock.mockReset();
    sendMock.mockResolvedValue(undefined);
  });

  it("sends a valid same-origin submission", async () => {
    const response = await POST(contactRequest(validBody));
    expect(response.status).toBe(200);
    expect(sendMock).toHaveBeenCalledWith({
      name: validBody.name,
      email: validBody.email,
      phone: "",
      message: validBody.message,
    });
  });

  it("rejects cross-site and origin-less requests", async () => {
    expect((await POST(contactRequest(validBody, { origin: "https://evil.example" }))).status).toBe(403);
    expect((await POST(contactRequest(validBody, { origin: null }))).status).toBe(403);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("rejects non-JSON content types", async () => {
    const response = await POST(contactRequest(validBody, { contentType: "text/plain" }));
    expect(response.status).toBe(415);
  });

  it("rejects oversized bodies", async () => {
    const response = await POST(contactRequest({ ...validBody, message: "x".repeat(20_000) }));
    expect(response.status).toBe(413);
  });

  it("rejects malformed JSON and invalid fields", async () => {
    expect((await POST(contactRequest("{not json"))).status).toBe(400);
    expect((await POST(contactRequest({ ...validBody, email: "nope" }))).status).toBe(422);
  });

  it("fakes success for a filled honeypot without sending", async () => {
    const response = await POST(contactRequest({ ...validBody, company: "Acme" }));
    expect(response.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 429 with Retry-After once the limit is hit", async () => {
    for (let i = 0; i < 5; i++) await POST(contactRequest(validBody));
    const response = await POST(contactRequest(validBody));
    expect(response.status).toBe(429);
    expect(Number(response.headers.get("retry-after"))).toBeGreaterThan(0);
  });

  it("returns 502 when delivery fails", async () => {
    sendMock.mockRejectedValueOnce(new Error("down"));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const response = await POST(contactRequest(validBody));
    expect(response.status).toBe(502);
  });
});
