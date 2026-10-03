import { CloudServiceBody } from "@/components/services/cloud-body";
import { CloudServiceHero } from "@/components/services/cloud-service-hero";
import { ServiceOutro } from "@/components/services/service-outro";
import type { ServicePageContent } from "@/types/content";

const heroFrame = "relative mx-auto max-w-7xl px-6 pb-4 pt-32 lg:pt-40";

export function CloudServiceView({ service }: { service: ServicePageContent }) {
  return (
    <>
      <div className={heroFrame}>
        <CloudServiceHero service={service} />
      </div>
      <CloudServiceBody service={service} />
      <ServiceOutro service={service} />
    </>
  );
}
