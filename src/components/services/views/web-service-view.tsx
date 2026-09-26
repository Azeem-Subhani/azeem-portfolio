import { ServiceIntro } from "@/components/services/service-intro";
import { ServiceOutro } from "@/components/services/service-outro";
import { WebServiceBody } from "@/components/services/web-body";
import { WebGantryStackVisual } from "@/components/sections/web-gantry-stack-visual";
import type { ServicePageContent } from "@/types/content";

const heroFrame = "relative mx-auto max-w-7xl px-5 pb-4 pt-32 sm:px-8 lg:pt-40";

export function WebServiceView({ service }: { service: ServicePageContent }) {
  return (
    <>
      <div className={heroFrame}>
        <ServiceIntro service={service} visual={<WebGantryStackVisual />} />
      </div>
      <WebServiceBody service={service} />
      <ServiceOutro service={service} />
    </>
  );
}
