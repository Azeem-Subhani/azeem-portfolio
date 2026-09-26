import type { Metadata } from "next";

import {
  ProcessChanges,
  ProcessCta,
  ProcessHero,
  ProcessPipeline,
  ProcessPreProject,
  ProcessSprints,
} from "@/components/process/process-sections";
import { ProcessMotion } from "@/components/process/process-motion";
import { WhyMotion } from "@/components/why/why-motion";

export const metadata: Metadata = {
  title: "How I work",
  description:
    "Agreed scope up front, two-week agile sprints with a UAT build every sprint, four isolated environments, and change requests handled in the open.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <article className="mx-auto max-w-7xl overflow-x-clip px-6 pb-24 pt-32 lg:pt-40">
      {/* WhyMotion supplies the section fades and count-ups; ProcessMotion adds this page's hero, sprint chart, and route. */}
      <WhyMotion>
        <ProcessMotion>
          <ProcessHero />
          <ProcessPreProject />
          <ProcessSprints />
          <ProcessPipeline />
          <ProcessChanges />
          <ProcessCta />
        </ProcessMotion>
      </WhyMotion>
    </article>
  );
}
