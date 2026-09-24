"use client";

import { DataHeroGemini } from "./data-hero-gemini";
import { DataServiceBody } from "@/components/services/data-body";
import { ServiceOutro } from "@/components/services/service-sections";
import { dataService } from "@/content/services/data";

export function DataManagementGeminiPage() {
  return (
    <article className="data-management-gemini-page relative min-h-screen bg-[#061517] text-[#f2eee5] overflow-x-clip">
      {/* 100vh Art-Directed Hero */}
      <DataHeroGemini />

      {/* Service Chapters & Architectural Deep Dive */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-16 pt-20 sm:px-8">
        <DataServiceBody service={dataService} />
      </section>

      {/* Service Outro & Contact */}
      <ServiceOutro service={dataService} />
    </article>
  );
}
