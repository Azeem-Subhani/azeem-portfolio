import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryRoutes } from "@/components/industries/visuals/industry-routes";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("logistics");

export default function LogisticsIndustryPage() {
  const industry = getIndustry("logistics");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryRoutes />} />;
}
