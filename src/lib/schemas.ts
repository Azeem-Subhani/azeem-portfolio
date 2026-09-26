import * as z from "zod/mini";

// Accepts digits, spaces, and common separators (+, (), -, .), and requires
// a plausible number of digits so "abc" or "1" don't slip through while
// still allowing international formats like "+1 555 010 0199".
const PHONE_FORMAT = /^[+]?[\d\s().-]+$/;

function digitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

// zod/mini instead of the full library: this schema is four fields, and the
// full build was a 106 KB gzip chunk on the contact page.
export const contactFormSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, { error: "Enter your name." }),
      z.maxLength(120, { error: "Name is too long." }),
      // The name goes into the email subject, so line breaks and other control
      // characters are rejected rather than passed to the mail provider.
      z.regex(/^[^\p{Cc}]*$/u, {
        error: "Name can't contain line breaks or control characters.",
      }),
    ),
  email: z
    .string()
    .check(
      z.trim(),
      z.minLength(1, { error: "Enter your email." }),
      z.email({ error: "Enter a valid email address." }),
    ),
  phone: z.optional(
    z
      .string()
      .check(
        z.trim(),
        z.maxLength(40, { error: "Phone number is too long." }),
        z.refine(
          (value) =>
            value === "" ||
            (PHONE_FORMAT.test(value) && digitCount(value) >= 7 && digitCount(value) <= 15),
          { error: "Enter a valid phone number." },
        ),
      ),
  ),
  message: z
    .string()
    .check(
      z.trim(),
      z.minLength(10, { error: "Message should be at least 10 characters." }),
      z.maxLength(4000, { error: "Message is too long." }),
    ),
  // Honeypot. Left blank by real visitors; a filled value means a bot filled
  // every input it could find. Hidden from sight and from assistive tech.
  // Any value passes validation on purpose: the API route drops filled
  // submissions with a fake success, so bots get no signal about the trap.
  company: z.optional(z.string()),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
