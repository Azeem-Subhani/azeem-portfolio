import type { Metadata } from "next";

import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: `Privacy policy for ${profile.name}'s portfolio website and contact form.`,
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-32 sm:pt-40">
      <p className="font-mono text-xs tracking-[0.12em] text-accent-readable">
        Privacy
      </p>
      <h1 className="mt-5 font-display text-[clamp(3.5rem,8vw,6.5rem)] font-normal leading-[0.88] tracking-[-0.045em]">
        Privacy policy
      </h1>
      <p className="mt-6 text-sm text-muted-foreground">Last updated September 13, 2026.</p>

      <div className="mt-14 space-y-10 text-base leading-8 text-muted-foreground">
        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">What I collect</h2>
          <p className="mt-3">
            If you use the contact form, I receive the name, email address,
            optional phone number, and message that you submit. The form also
            uses a hidden anti-spam field; it is not used to profile visitors.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">How I use it</h2>
          <p className="mt-3">
            I use contact details only to respond to your enquiry and discuss
            potential work. Contact form delivery is handled through the email
            service configured for this site. I do not sell submitted details.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">Analytics and cookies</h2>
          <p className="mt-3">
            This site does not load analytics by default. If analytics are
            enabled for a deployment, Google Analytics loads only
            after you choose “Allow analytics” in the consent banner. Your
            choice is saved in a small consent cookie so the banner does not
            return on every visit. You can clear that cookie in your browser
            settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-normal text-foreground">Your choices</h2>
          <p className="mt-3">
            You can contact me at {" "}
            <a className="underline underline-offset-4" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            {" "}to ask what personal information I hold about you or to request
            a correction or deletion, subject to any legal obligations that
            apply.
          </p>
        </section>
      </div>
    </article>
  );
}
