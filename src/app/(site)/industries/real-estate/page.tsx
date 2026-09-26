import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryListings } from "@/components/industries/visuals/industry-listings";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("real-estate");

export default function RealEstateIndustryPage() {
  const industry = getIndustry("real-estate");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryListings />} />;
}
