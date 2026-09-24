import {
  CaseStudyBrief,
  CaseStudyOutcomes,
  CaseStudyStack,
} from "@/components/projects/case-studies/case-study-sections";
import { ProjectCloser } from "@/components/projects/project-closer";
import { ProjectDetailIntro } from "@/components/projects/project-detail-intro";
import { ProjectMockup } from "@/components/projects/project-mockup";
import type { Project } from "@/types/content";

type FallbackCaseStudyProps = {
  project: Project;
};

/** Original shared project page. Used until a slug has its own case study. */
export function FallbackCaseStudy({ project }: FallbackCaseStudyProps) {
  return (
    <article className="mx-auto max-w-7xl px-6 pb-8 pt-32">
      <ProjectDetailIntro project={project} />

      <div className="mx-auto mt-12 max-w-case overflow-hidden rounded-[26px]">
        <ProjectMockup
          project={project}
          density="case-study"
          descriptiveAlt
          className="lg:min-h-[520px]"
        />
      </div>

      <CaseStudyBrief
        problem={[project.context]}
        solution={[project.role]}
        points={project.approach}
      />
      <CaseStudyStack items={project.stack} />
      <CaseStudyOutcomes project={project} />
      <ProjectCloser slug={project.slug} />
    </article>
  );
}
