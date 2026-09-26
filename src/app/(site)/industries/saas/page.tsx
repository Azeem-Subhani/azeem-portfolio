import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryTenants } from "@/components/industries/visuals/industry-tenants";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("saas");

export default function SaasIndustryPage() {
  const industry = getIndustry("saas");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryTenants />} />;
}
