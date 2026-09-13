import Link from "next/link";

import { MockupsRoundList } from "@/components/mockups/mockups-round-list";
import { sectionLinks, versionLinks } from "@/components/mockups/mockups-registry";

type MockupEntry = {
  label: string;
  component: React.ReactNode;
};

type MockupGroup = {
  title: string;
  mockups: MockupEntry[];
};

type MockupsRoundViewProps = {
  version: "v1" | "v2" | "v3" | "v4" | "v5";
  title: string;
  description: string;
  groups: MockupGroup[];
};

export function MockupsRoundView({
  version,
  title,
  description,
  groups,
}: MockupsRoundViewProps) {
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
                  className="rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav
              aria-label="Mockup rounds"
              className="flex gap-2 text-sm font-medium"
            >
              {versionLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={version === link.version ? "page" : undefined}
                  className={
                    version === link.version
                      ? "rounded-md bg-accent px-3 py-1.5 text-accent-foreground"
                      : "rounded-md px-3 py-1.5 text-muted-foreground hover:text-foreground"
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <MockupsRoundList version={version} groups={groups} />
    </div>
  );
}
