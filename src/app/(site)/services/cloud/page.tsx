import { notFound } from "next/navigation";

import { ServiceShell, serviceMetadata } from "@/components/services/service-page";
import { CloudServiceView } from "@/components/services/views/cloud-service-view";
import { getService } from "@/content/services";

export const metadata = serviceMetadata("cloud");

export default function CloudServicePage() {
  const service = getService("cloud");
  if (!service) notFound();

  return (
    <ServiceShell service={service}>
      <CloudServiceView service={service} />
    </ServiceShell>
  );
}
