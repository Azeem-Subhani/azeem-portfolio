import { CloudServiceBody } from "@/components/services/cloud-body";
import { CloudServiceHero } from "@/components/services/cloud-service-hero";
import { ServiceIntro } from "@/components/services/service-intro";
import { DataServiceBody } from "@/components/services/data-body";
import { MobileServiceBody } from "@/components/services/mobile-body";
import { WebServiceBody } from "@/components/services/web-body";
import { ServiceOutro, ServiceSections } from "@/components/services/service-sections";
import type { ServicePageContent } from "@/types/content";

export function ServicePage({ service }: { service: ServicePageContent }) {
  const cloud = service.slug === "cloud";
  const mobile = service.slug === "mobile-development";
  const web = service.slug === "web-development";
  const data = service.slug === "data-management";

  return (
    <article className="service-page relative">
      {/* The cloud hero has a 3D scene; the grid wallpaper behind it read as noise. */}
      {cloud ? null : (
        <div
          aria-hidden="true"
          className="service-grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-[30rem] overflow-hidden"
        />
      )}

      {cloud ? (
        <div className="relative mx-auto max-w-7xl px-5 pb-4 pt-32 sm:px-8 lg:pt-40">
          <CloudServiceHero service={service} />
        </div>
      ) : (
        <div className="relative mx-auto max-w-7xl px-5 pb-4 pt-32 sm:px-8 lg:pt-40">
          <ServiceIntro service={service} />
        </div>
      )}

      {cloud ? (
        <CloudServiceBody service={service} />
      ) : mobile ? (
        <MobileServiceBody service={service} />
      ) : web ? (
        <WebServiceBody service={service} />
      ) : data ? (
        <DataServiceBody service={service} />
      ) : (
        <ServiceSections service={service} />
      )}

      <ServiceOutro service={service} />
    </article>
  );
}
