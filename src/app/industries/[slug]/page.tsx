import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
import { INDUSTRY_SLUGS, getIndustry, industryPath } from "@/content/industries";

type IndustryRouteProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return INDUSTRY_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: IndustryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    return {};
  }

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

export default async function IndustryRoute({ params }: IndustryRouteProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) {
    notFound();
  }

  return (
    // data-industry-tone retints the accent tokens for this page (see globals.css).
    <article data-industry-tone={industry.tone} className="relative overflow-x-clip">
      <IndustryBackdrop industry={industry} />
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-32 lg:pt-40">
        <IndustryMotion>
          <IndustryHero industry={industry} />
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
