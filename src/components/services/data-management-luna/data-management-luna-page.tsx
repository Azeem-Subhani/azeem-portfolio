"use client";

import { DataServiceBody } from "@/components/services/data-body";
import { ServiceOutro } from "@/components/services/service-sections";
import { dataService } from "@/content/services/data";

import { DataHeroLuna } from "./data-hero-luna";

export function DataManagementLunaPage() {
  return (
    <article className="data-management-luna-page">
      <DataHeroLuna />
      <section className="data-luna-service-body">
        <DataServiceBody service={dataService} />
      </section>
      <ServiceOutro service={dataService} />
    </article>
  );
}
