"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

type SystemNode = {
  id: string;
  label: string;
  example: string;
};

const nodes: SystemNode[] = [
  {
    id: "interface",
    label: "Interface",
    example: "Customer booking and operator dashboards",
  },
  {
    id: "api",
    label: "API",
    example: "GraphQL, REST, and real-time services",
  },
  {
    id: "data",
    label: "Data",
    example: "PostgreSQL, MongoDB, and DynamoDB",
  },
  {
    id: "cloud",
    label: "Cloud",
    example: "AWS serverless and CI/CD",
  },
  {
    id: "ai",
    label: "AI",
    example: "RAG, tool calling, and MCP",
  },
];

/**
 * Every label and example below is real, visible text, not content hidden
 * behind hover or focus. Interaction only adds emphasis to the active node,
 * so the map stays legible with JavaScript or animation disabled.
 */
export function SystemsMap() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full max-w-[380px] rounded-lg border border-border bg-glass p-6 backdrop-blur-xl sm:p-8">
      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
        How the work connects
      </p>

      <div className="relative mt-6 pl-9">
        <div
          aria-hidden="true"
          className="absolute top-2 bottom-2 left-[7px] w-px bg-border"
        />

        <ol
          aria-label="Interface, API, Data, Cloud, and AI, connected end to end"
          className="flex flex-col gap-5"
        >
          {nodes.map((node, index) => {
            const isActive = index === activeIndex;

            return (
              <li key={node.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="group relative block w-full text-left"
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-1.5 -left-9 flex size-3.5 items-center justify-center rounded-full border-2 transition-colors",
                      isActive
                        ? "border-accent bg-accent"
                        : "border-border bg-surface group-hover:border-accent",
                    )}
                  />
                  <span
                    className={cn(
                      "font-display text-lg font-semibold transition-colors",
                      isActive ? "text-accent" : "text-foreground",
                    )}
                  >
                    {node.label}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted-foreground">
                    {node.example}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
