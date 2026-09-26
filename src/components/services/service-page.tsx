import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getService } from "@/content/services";
import type { ServicePageContent, ServiceSlug } from "@/types/content";

export function serviceMetadata(slug: ServiceSlug): Metadata {
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.metaTitle} | Azeem Subhani`,
      description: service.metaDescription,
      url: `/services/${service.slug}`,
    },
  };
}

export function ServiceShell({
  service,
  children,
}: {
  service: ServicePageContent;
  children: ReactNode;
}) {
  return (
    <article className="service-page relative">
      {/* The cloud hero has a 3D scene; the grid wallpaper behind it read as noise. */}
      {service.slug === "cloud" ? null : (
        <div
          aria-hidden="true"
          className="service-grid-backdrop pointer-events-none absolute inset-x-0 top-0 h-[30rem] overflow-hidden"
        />
      )}
      {children}
    </article>
  );
}
