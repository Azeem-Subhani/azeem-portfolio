import { notFound } from "next/navigation";

import { WoodyShopCaseStudy } from "@/components/projects/case-studies/woody-shop-case-study";
import { ProjectStudy, projectMetadata } from "@/components/projects/project-study";
import { getProjectBySlug } from "@/content/projects";

export const metadata = projectMetadata("woody-shop");

export default function WoodyShopPage() {
  const project = getProjectBySlug("woody-shop");
  if (!project) notFound();

  return (
    <ProjectStudy>
      <WoodyShopCaseStudy project={project} />
    </ProjectStudy>
  );
}
