import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryCare } from "@/components/industries/visuals/industry-care";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("healthtech");

export default function HealthtechIndustryPage() {
  const industry = getIndustry("healthtech");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryCare />} />;
}
