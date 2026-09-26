import { notFound } from "next/navigation";

import { ServiceShell, serviceMetadata } from "@/components/services/service-page";
import { WebServiceView } from "@/components/services/views/web-service-view";
import { getService } from "@/content/services";

export const metadata = serviceMetadata("web-development");

export default function WebServicePage() {
  const service = getService("web-development");
  if (!service) notFound();

  return (
    <ServiceShell service={service}>
      <WebServiceView service={service} />
    </ServiceShell>
  );
}
