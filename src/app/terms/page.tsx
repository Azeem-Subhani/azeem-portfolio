import type { Metadata } from "next";

import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description: `Terms and conditions for using ${profile.name}'s portfolio website.`,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-40">
      <p className="font-mono text-xs tracking-[0.12em] text-accent-readable">Terms</p>
      <h1 className="mt-5 font-display text-[clamp(3.5rem,8vw,6.5rem)] font-normal leading-[0.88] tracking-[-0.045em]">
        Terms and conditions
      </h1>
      <p className="mt-6 text-sm text-muted-foreground">Last updated September 13, 2026.</p>

      <div className="mt-14 space-y-10 text-base leading-8 text-muted-foreground">
        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">About this site</h2>
          <p className="mt-3">
            This is the portfolio website of {profile.name}. It shares project
            descriptions, technical capabilities, and a way to make contact.
            The site and its content are provided for general information and
            do not create a client relationship by themselves.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">Content and project work</h2>
          <p className="mt-3">
            Project names, product marks, screenshots, and descriptions may
            belong to their respective owners. Some client work is anonymized.
            Please do not copy, redistribute, or present this material as your
            own without permission from the relevant rights holder.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">Contacting me</h2>
          <p className="mt-3">
            Information sent through the contact form should be accurate and
            should not contain unlawful, harmful, or confidential material that
            you are not authorized to share. A message is an enquiry, not a
            guarantee that work will be accepted or started.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">External links and availability</h2>
          <p className="mt-3">
            This site may link to third-party websites. I do not control those
            sites or guarantee their content, availability, or privacy practices.
            I may update, suspend, or remove parts of this portfolio at any time.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">Questions</h2>
          <p className="mt-3">
            Questions about these terms can be sent to {" "}
            <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
        </section>
      </div>
    </article>
  );
}
