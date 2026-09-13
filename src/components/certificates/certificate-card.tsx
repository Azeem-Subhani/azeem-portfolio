import { ArrowUpRight, BadgeCheck } from "lucide-react";

import type { Certificate } from "@/types/content";

type CertificateCardProps = {
  certificate: Certificate;
};

export function CertificateCard({ certificate }: CertificateCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors hover:border-accent">
      <BadgeCheck aria-hidden="true" className="mb-8 size-7 text-accent" />

      <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {certificate.issuer}
      </p>
      <h3 className="mt-3 font-display text-2xl font-semibold leading-tight">
        {certificate.title}
      </h3>

      {certificate.issued ? (
        <p className="mt-3 text-sm text-muted-foreground">
          Issued {certificate.issued}
        </p>
      ) : null}

      <a
        href={certificate.verificationUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-medium text-accent hover:text-accent-strong"
        aria-label={`Verify credential for ${certificate.title}, opens in a new tab`}
      >
        Verify credential
        <ArrowUpRight aria-hidden="true" className="size-4" />
      </a>
    </article>
  );
}
