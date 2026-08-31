import { NextResponse } from "next/server";

import { sendContactEmail } from "@/lib/contact";
import { checkRateLimit } from "@/lib/rate-limit";
import { contactFormSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const rateLimit = checkRateLimit(ip);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { message: "Too many requests. Try again in a few minutes." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
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
        issues: parsed.error.flatten().fieldErrors,
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
