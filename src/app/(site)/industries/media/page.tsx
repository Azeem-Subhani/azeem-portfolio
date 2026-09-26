import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryStream } from "@/components/industries/visuals/industry-stream";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("media");

export default function MediaIndustryPage() {
  const industry = getIndustry("media");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryStream />} />;
}
