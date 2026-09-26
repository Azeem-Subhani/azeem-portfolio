import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The requested page could not be found.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.16em] text-accent-ink">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <Button asChild size="lg" className="mt-8">
        <Link href="/">Back to home</Link>
      </Button>
    </section>
  );
}
