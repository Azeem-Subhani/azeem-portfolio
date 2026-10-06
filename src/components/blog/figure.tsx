import Image from "next/image";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type FigureProps = {
  caption: ReactNode;
  // Either an image file (with its intrinsic size) or rendered content such as a diagram.
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  children?: ReactNode;
  // Lets a figure break out of the 65ch text column on wide screens.
  wide?: boolean;
};

export function Figure({ caption, src, alt = "", width, height, children, wide }: FigureProps) {
  return (
    <figure className={cn("my-10", wide && "lg:-mx-16")}>
      <div className="overflow-hidden rounded-lg border border-border bg-foreground/[0.03]">
        {src && width && height ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 832px, 100vw"
            className="h-auto w-full"
            // SVGs skip the optimizer, which only rasterizes.
            unoptimized={src.endsWith(".svg")}
          />
        ) : (
          // Diagrams keep a minimum width (see kit.tsx), so narrow screens scroll the
          // figure sideways instead of shrinking the text below legibility.
          // tabIndex lets keyboard users scroll it on narrow screens. Each region is named
          // by its caption so landmarks stay distinct; the SVG's <title> describes the drawing.
          <div
            tabIndex={0}
            role="region"
            aria-label={typeof caption === "string" ? caption : "Diagram"}
            className="overflow-x-auto overscroll-x-contain p-3 focus-visible:outline-2 focus-visible:outline-ring sm:p-6"
          >
            {children}
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}
