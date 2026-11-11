"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

/**
 * Reads the current theme from <html data-theme> at click time, so no React state
 * is needed and server/client markup always match. Icons are swapped with CSS.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next: Theme = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle color theme"
      className="border-border text-muted hover:bg-surface-2 hover:text-text focus-visible:outline-accent inline-flex size-9 items-center justify-center rounded-lg border transition focus-visible:outline-2"
    >
      <Sun className="hidden size-4 dark:block" aria-hidden="true" />
      <Moon className="size-4 dark:hidden" aria-hidden="true" />
    </button>
  );
}
