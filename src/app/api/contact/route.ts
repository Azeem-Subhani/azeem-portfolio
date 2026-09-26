import { NextResponse } from "next/server";

import { flattenError } from "zod/mini";

import { sendContactEmail } from "@/lib/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/schemas";

// The form's largest payload (4000-character message plus short fields) is
// well under this; anything bigger is not from the form.
const MAX_BODY_BYTES = 16 * 1024;

/**
 * Rejects cross-site submissions. Browsers always send Origin on a POST from
 * fetch, so a missing or foreign Origin means the request did not come from
 * this site's own form (for example a hostile page posting with no-cors).
 */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ message: "Forbidden." }, { status: 403 });
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return NextResponse.json(
      { message: "Unsupported content type." },
      { status: 415 },
    );
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    const retryAfterSeconds = Math.ceil((rateLimit.retryAfterMs ?? 0) / 1000);
    return NextResponse.json(
      { message: "Too many requests. Try again in a few minutes." },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } },
    );
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json({ message: "Request too large." }, { status: 413 });
  }

  let payload: unknown;
  try {
    // Content-Length can be absent (chunked bodies), so check the real size too.
    const body = await request.text();
    if (new TextEncoder().encode(body).length > MAX_BODY_BYTES) {
      return NextResponse.json({ message: "Request too large." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Please check the form and try again.",
        issues: flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const { company, ...submission } = parsed.data;

  // Honeypot tripped. Report success without sending anything, so scripted
  // submissions have no signal to learn from.
  if (company) {
    return NextResponse.json({ message: "Message sent." }, { status: 200 });
  }

  try {
    await sendContactEmail(submission);
  } catch {
    // Never log submission contents: no name, email, phone, or message.
    console.error("Contact form delivery failed.");
    return NextResponse.json(
      {
        message:
          "Something went wrong sending your message. Please email me directly instead.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ message: "Message sent." }, { status: 200 });
}
