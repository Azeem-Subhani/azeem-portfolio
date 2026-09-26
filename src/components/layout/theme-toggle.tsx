"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // next-themes only knows the resolved theme after the client mounts, so
    // this flips once to reveal the real icon and avoid a hydration
    // mismatch. There's no external system to synchronize with here, which
    // is what the lint rule normally guards against.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  // Until mount the active theme is unknown (the site defaults to dark), so the
  // pre-hydration label stays neutral instead of guessing wrong.
  const label = !mounted ? "Change theme" : isDark ? "Use light theme" : "Use dark theme";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="border-transparent bg-transparent hover:bg-background/50"
    >
      {mounted && isDark ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
    </Button>
  );
}
