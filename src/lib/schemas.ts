import { z } from "zod";

// Accepts digits, spaces, and common separators (+, (), -, .), and requires
// a plausible number of digits so "abc" or "1" don't slip through while
// still allowing international formats like "+92 320 4406148".
const PHONE_FORMAT = /^[+]?[\d\s().-]+$/;

function digitCount(value: string) {
  return value.replace(/\D/g, "").length;
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your name.")
    .max(120, "Name is too long."),
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
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
