import { Resend } from "resend";

export type ContactSubmission = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function sendContactEmail(submission: ContactSubmission) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    throw new Error(
      "Contact delivery is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    to,
    from,
    replyTo: submission.email,
    subject: `Portfolio inquiry from ${submission.name}`,
    text: [
      `Name: ${submission.name}`,
      `Email: ${submission.email}`,
      submission.phone ? `Phone: ${submission.phone}` : undefined,
      "",
      submission.message,
    ]
      .filter((line): line is string => Boolean(line))
      .join("\n"),
  });

  if (error) {
    throw new Error("Resend rejected the message.");
  }
}
