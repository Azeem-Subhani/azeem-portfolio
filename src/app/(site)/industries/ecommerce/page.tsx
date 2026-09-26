import { notFound } from "next/navigation";

import { IndustryPage, industryMetadata } from "@/components/industries/industry-page";
import { IndustryCheckout } from "@/components/industries/visuals/industry-checkout";
import { getIndustry } from "@/content/industries";

export const metadata = industryMetadata("ecommerce");

export default function EcommerceIndustryPage() {
  const industry = getIndustry("ecommerce");
  if (!industry) notFound();

  return <IndustryPage industry={industry} visual={<IndustryCheckout />} />;
}
