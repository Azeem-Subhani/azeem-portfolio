import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryCourse } from "@/components/industries/visuals/industry-course";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("education");

export default function EducationIndustryPage() {
  const industry = getIndustry("education");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryCourse />} />;
}
