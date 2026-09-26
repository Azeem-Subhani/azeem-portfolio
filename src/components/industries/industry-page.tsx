import type { Metadata } from "next";
import type { ReactNode } from "react";

import { IndustryMotion } from "@/components/industries/industry-motion";
import {
  IndustryBackdrop,
  IndustryChallenges,
  IndustryCta,
  IndustryHero,
  IndustryPractices,
  IndustryProof,
  IndustrySolutions,
  IndustryStack,
} from "@/components/industries/industry-sections";
import { getIndustry, industryPath } from "@/content/industries";
import type { IndustryPageContent, IndustrySlug } from "@/types/content";

export function industryMetadata(slug: IndustrySlug): Metadata {
  const industry = getIndustry(slug);
  if (!industry) return {};

  return {
    title: industry.metaTitle,
    description: industry.metaDescription,
    alternates: { canonical: industryPath(industry.slug) },
    openGraph: {
      title: `${industry.metaTitle} | Azeem Subhani`,
      description: industry.metaDescription,
      url: industryPath(industry.slug),
    },
  };
}

export function IndustryPage({
  industry,
  visual,
}: {
  industry: IndustryPageContent;
  visual: ReactNode;
}) {
  return (
    // data-industry-tone retints the accent tokens for this page (see globals.css).
    <article data-industry-tone={industry.tone} className="relative overflow-x-clip">
      <IndustryBackdrop industry={industry} />
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pt-40">
        <IndustryMotion>
          <IndustryHero industry={industry} visual={visual} />
          <IndustryProof industry={industry} />
          <IndustryChallenges industry={industry} />
          <IndustrySolutions industry={industry} />
          <IndustryStack industry={industry} />
          <IndustryPractices industry={industry} />
          <IndustryCta industry={industry} />
        </IndustryMotion>
      </div>
    </article>
  );
}
