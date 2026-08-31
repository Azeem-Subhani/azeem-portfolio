import { z } from "zod";

export const contactServices = [
  "Full-Stack SaaS Development",
  "Payments and Stripe Integrations",
  "AI/LLM Integrations",
  "Real-Time Systems",
  "Technical Consultation",
] as const;

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
    .optional()
    .or(z.literal("")),
  service: z.enum(contactServices, {
    error: "Select a service.",
  }),
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
