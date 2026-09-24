import { SERVICE_SLUGS, type ServicePageContent, type ServiceSlug } from "@/types/content";

import { cloudService } from "@/content/services/cloud";
import { dataService } from "@/content/services/data";
import { mobileService } from "@/content/services/mobile";
import { webService } from "@/content/services/web";

export { SERVICE_SLUGS, type ServiceSlug };

export const services: ServicePageContent[] = [
  cloudService,
  webService,
  mobileService,
  dataService,
];

const bySlug = new Map(services.map((service) => [service.slug, service]));

export function getService(slug: string): ServicePageContent | undefined {
  return bySlug.get(slug as ServiceSlug);
}

export function servicePath(slug: ServiceSlug) {
  return `/services/${slug}`;
}
