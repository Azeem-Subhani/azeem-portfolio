import { notFound } from "next/navigation";

import { ServiceShell, serviceMetadata } from "@/components/services/service-page";
import { DataServiceView } from "@/components/services/views/data-service-view";
import { getService } from "@/content/services";

export const metadata = serviceMetadata("data-management");

export default function DataServicePage() {
  const service = getService("data-management");
  if (!service) notFound();

  return (
    <ServiceShell service={service}>
      <DataServiceView service={service} />
    </ServiceShell>
  );
}
