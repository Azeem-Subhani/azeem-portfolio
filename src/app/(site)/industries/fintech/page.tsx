import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryLedger } from "@/components/industries/industry-ledger";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("fintech");

export default function FintechIndustryPage() {
  const industry = getIndustry("fintech");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryLedger />} />;
}
