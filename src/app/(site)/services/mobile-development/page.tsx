import { notFound } from "next/navigation";

import { ServiceShell, serviceMetadata } from "@/components/services/service-page";
import { MobileServiceView } from "@/components/services/views/mobile-service-view";
import { getService } from "@/content/services";

export const metadata = serviceMetadata("mobile-development");

export default function MobileServicePage() {
  const service = getService("mobile-development");
  if (!service) notFound();

  return (
    <ServiceShell service={service}>
      <MobileServiceView service={service} />
    </ServiceShell>
  );
}
