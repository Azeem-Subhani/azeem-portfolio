import { INDUSTRY_SLUGS, type IndustryPageContent, type IndustrySlug } from "@/types/content";

import { ecommerceIndustry } from "@/content/industries/ecommerce";
import { educationIndustry } from "@/content/industries/education";
import { fintechIndustry } from "@/content/industries/fintech";
import { healthtechIndustry } from "@/content/industries/healthtech";
import { logisticsIndustry } from "@/content/industries/logistics";
import { mediaIndustry } from "@/content/industries/media";
import { realEstateIndustry } from "@/content/industries/real-estate";
import { saasIndustry } from "@/content/industries/saas";

export { INDUSTRY_SLUGS, type IndustrySlug };

// Same order as the Industries menu.
export const industries: IndustryPageContent[] = [
  fintechIndustry,
  healthtechIndustry,
  ecommerceIndustry,
  saasIndustry,
  educationIndustry,
  realEstateIndustry,
  logisticsIndustry,
  mediaIndustry,
];

const bySlug = new Map(industries.map((industry) => [industry.slug, industry]));

export function getIndustry(slug: string): IndustryPageContent | undefined {
  return bySlug.get(slug as IndustrySlug);
}

export function industryPath(slug: IndustrySlug) {
  return `/industries/${slug}`;
}
