import { MobileVisual } from "@/components/sections/mobile-visual";
import { MobileServiceBody } from "@/components/services/mobile-body";
import { ServiceIntro } from "@/components/services/service-intro";
import { ServiceOutro } from "@/components/services/service-outro";
import type { ServicePageContent } from "@/types/content";

const heroFrame = "relative mx-auto max-w-7xl px-5 pb-4 pt-32 sm:px-8 lg:pt-40";

export function MobileServiceView({ service }: { service: ServicePageContent }) {
  return (
    <>
      <div className={heroFrame}>
        <ServiceIntro service={service} visual={<MobileVisual />} />
      </div>
      <MobileServiceBody service={service} />
      <ServiceOutro service={service} />
    </>
  );
}
