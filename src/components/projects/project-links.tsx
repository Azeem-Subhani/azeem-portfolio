import { ArrowUpRight } from "lucide-react";

import { GithubIcon } from "@/components/icons";
import type { Project } from "@/types/content";

type ProjectLinksProps = {
  project: Project;
  className?: string;
};

export function ProjectLinks({ project, className }: ProjectLinksProps) {
  if (!project.liveUrl && !project.repositoryUrl) {
    return null;
  }

  return (
    <div className={className}>
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
          aria-label={`${project.title} live site, opens in a new tab`}
        >
          Live site
          <ArrowUpRight aria-hidden="true" className="size-4" />
        </a>
      ) : null}

      {project.repositoryUrl ? (
        <a
          href={project.repositoryUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent"
          aria-label={`${project.title} source code, opens in a new tab`}
        >
          <GithubIcon className="size-4" />
          Source
        </a>
      ) : null}
    </div>
  );
}
