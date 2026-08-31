"use client";

import { Printer } from "lucide-react";

import { Button } from "@/components/ui/button";

export function PrintButton() {
  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      onClick={() => window.print()}
    >
      <Printer aria-hidden="true" className="mr-2 size-4" />
      Print
    </Button>
  );
}
