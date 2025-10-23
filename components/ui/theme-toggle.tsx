"use client";

import * as React from "react";
import { MoonStar, SunDim } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const MODES = ["light", "dark", "system"] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [index, setIndex] = React.useState(() => {
    const initial = theme ?? "system";
    const modeIndex = MODES.indexOf(initial as (typeof MODES)[number]);
    return modeIndex === -1 ? 0 : modeIndex;
  });

  React.useEffect(() => {
    const mode = theme ?? "system";
    const modeIndex = MODES.indexOf(mode as (typeof MODES)[number]);
    if (modeIndex !== -1 && modeIndex !== index) {
      setIndex(modeIndex);
    }
  }, [theme, index]);

  const cycleTheme = React.useCallback(() => {
    const nextIndex = (index + 1) % MODES.length;
    setIndex(nextIndex);
    setTheme(MODES[nextIndex]);
  }, [index, setTheme]);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition-all duration-300 ease-out hover:border-brand-400 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-brand-300 dark:hover:text-brand-200",
        className
      )}
      aria-label="Toggle theme"
    >
      <SunDim
        className={cn(
          "h-5 w-5 transition-transform duration-300",
          isDark ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        )}
      />
      <MoonStar
        className={cn(
          "absolute h-5 w-5 transition-transform duration-300",
          isDark ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
