import Link from "next/link";

import { MockupVoteSummary } from "@/components/mockups/mockup-vote-summary";
import { MockupsSectionList } from "@/components/mockups/mockups-section-list";
import {
  sectionLinks,
  versionLinks,
  type MockupSection,
} from "@/components/mockups/mockups-registry";

type MockupsSectionViewProps = {
  section: MockupSection;
  title: string;
  description: string;
};

export function MockupsSectionView({
  section,
  title,
  description,
}: MockupsSectionViewProps) {
  return (
    <div className="border-b border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl tracking-tight">{title}</h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {description}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <nav
              aria-label="Mockup sections"
              className="flex gap-2 text-sm font-medium"
            >
              {sectionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={section === link.section ? "page" : undefined}
                  className={
                    section === link.section
                      ? "rounded-md bg-accent px-3 py-1.5 text-accent-foreground"
                      : "rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav
              aria-label="Mockup rounds"
              className="flex gap-2 text-xs font-medium text-muted-foreground"
            >
              {versionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-2 py-1 hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
        <MockupVoteSummary section={section} />
      </div>

      <MockupsSectionList section={section} />
    </div>
  );
}
