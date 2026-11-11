"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { sections } from "@/lib/navigation";

/** Hamburger menu for small screens. Closes on link click, Escape, or resize to desktop. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onResize = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex size-9 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-surface-2 hover:text-text focus-visible:outline-2 focus-visible:outline-accent"
      >
        {open ? (
          <X className="size-4" aria-hidden="true" />
        ) : (
          <Menu className="size-4" aria-hidden="true" />
        )}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-16 border-b border-border bg-bg shadow-lg shadow-black/20"
        >
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`/#${s.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-2 py-3 text-text transition hover:bg-surface-2"
                >
                  <span className="font-mono text-xs text-accent">{s.index}</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
