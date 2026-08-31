"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.16em] text-error">
        Error
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold sm:text-5xl">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        Try reloading the page. If the problem continues, reach out through
        the contact page.
      </p>
      <Button size="lg" className="mt-8" onClick={() => reset()}>
        Try again
      </Button>
    </section>
  );
}
