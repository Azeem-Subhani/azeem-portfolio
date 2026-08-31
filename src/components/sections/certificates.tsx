import { Reveal } from "@/components/motion/reveal";
import { CertificateGrid } from "@/components/certificates/certificate-grid";
import { certificates } from "@/content/certificates";

export function Certificates() {
  return (
    <section aria-labelledby="certificates-title" className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
          Credentials
        </p>
        <h2
          id="certificates-title"
          className="mt-3 text-balance font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none"
        >
          Certifications
        </h2>
      </Reveal>

      <div className="mt-12">
        <CertificateGrid certificates={certificates} />
      </div>
    </section>
  );
}
