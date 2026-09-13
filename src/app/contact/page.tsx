import type { Metadata } from "next";

import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Azeem Subhani about full-stack, payments, real-time, or AI application engineering work.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact | Azeem Subhani",
    description:
      "Get in touch about full-stack, payments, real-time, or AI application engineering work.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
