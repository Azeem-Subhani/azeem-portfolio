import { CertificateCard } from "@/components/certificates/certificate-card";
import type { Certificate } from "@/types/content";

type CertificateGridProps = {
  certificates: Certificate[];
};

export function CertificateGrid({ certificates }: CertificateGridProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((certificate) => (
        <li key={certificate.verificationUrl}>
          <CertificateCard certificate={certificate} />
        </li>
      ))}
    </ul>
  );
}
