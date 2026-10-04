import { DataHeroVisual } from "@/components/sections/data-hero-visual";
import { DataServiceBody } from "@/components/services/data-body";
import { serviceSiblingLinks } from "@/content/services";
import { ServiceIntro } from "@/components/services/service-intro";
import { ServiceOutro } from "@/components/services/service-outro";
import type { ServicePageContent } from "@/types/content";

const heroFrame = "relative mx-auto max-w-7xl px-6 pb-4 pt-32 lg:pt-40";

export function DataServiceView({ service }: { service: ServicePageContent }) {
  return (
    <>
      <div className={heroFrame}>
        <ServiceIntro
          service={service}
          siblings={serviceSiblingLinks(service.slug)}
          visual={<DataHeroVisual />}
        />
      </div>
      <DataServiceBody service={service} />
      <ServiceOutro service={service} />
    </>
  );
}
