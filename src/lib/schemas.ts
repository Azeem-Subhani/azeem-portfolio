import { z } from "zod";

// Accepts digits, spaces, and common separators (+, (), -, .), and requires
// a plausible number of digits so "abc" or "1" don't slip through while
// still allowing international formats like "+1 555 010 0199".
const PHONE_FORMAT = /^[+]?[\d\s().-]+$/;

function digitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(120, "Name is too long.")
    // The name goes into the email subject, so line breaks and other control
    // characters are rejected rather than passed to the mail provider.
    .regex(/^[^\p{Cc}]*$/u, "Name can't contain line breaks or control characters."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .max(40, "Phone number is too long.")
    .refine(
      (value) =>
        value === "" ||
        (PHONE_FORMAT.test(value) && digitCount(value) >= 7 && digitCount(value) <= 15),
      { message: "Enter a valid phone number." },
    )
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message should be at least 10 characters.")
    .max(4000, "Message is too long."),
  // Honeypot. Left blank by real visitors; a filled value means a bot filled
  // every input it could find. Hidden from sight and from assistive tech.
  // Any value passes validation on purpose: the API route drops filled
  // submissions with a fake success, so bots get no signal about the trap.
  company: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
