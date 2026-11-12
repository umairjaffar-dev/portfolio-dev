"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { CountUp } from "@/components/ui/count-up";
import { LiveDot } from "@/components/ui/live-dot";
import type { Experience } from "@/lib/schemas";
import { skillIcons } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

/** Must match the sticky `top` classes below (navbar 4rem + 1rem, +2.75rem per card). */
const STICK_BASE_REM = 5;
const PEEK_REM = 2.75;
const DESKTOP = "(min-width: 1024px)";

/**
 * Experience cards start as a normal list. On desktop, scrolling pins each card
 * near the top and the next card slides up over it; the covered card dims,
 * shrinks slightly and is clipped so only its header strip peeks out.
 * Mobile and reduced-motion users get a plain list (tall cards would be unreadable when pinned).
 */
export function ExperienceStack({ jobs }: { jobs: Experience[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const list = listRef.current;
    if (!list || reduce) return;
    const mq = window.matchMedia(DESKTOP);
    const cards = Array.from(list.querySelectorAll<HTMLElement>("[data-stack-card]"));
    let frame = 0;

    const reset = () =>
      cards.forEach((c) => {
        c.style.transform = "";
        c.style.filter = "";
        c.style.clipPath = "";
      });

    const update = () => {
      frame = 0;
      if (!mq.matches) return reset();
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        // 0 → next card still in its natural spot below; 1 → next card fully stacked on top.
        const nextPinnedTop = (STICK_BASE_REM + (i + 1) * PEEK_REM) * rem;
        const travel = card.offsetHeight + 1.5 * rem;
        const covered = Math.min(1, Math.max(0, 1 - (b.top - nextPinnedTop) / travel));
        const visible = b.top - a.top + 6;
        const clip = Math.max(0, card.offsetHeight - visible);
        card.style.transform = covered ? `scale(${1 - covered * 0.04})` : "";
        card.style.filter = covered ? `brightness(${1 - covered * 0.35})` : "";
        card.style.clipPath = clip ? `inset(0 0 ${clip}px 0 round 0.75rem)` : "";
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      reset();
    };
  }, [reduce]);

  return (
    <ol ref={listRef} className="space-y-6">
      {jobs.map((job, i) => {
        const current = job.end === null;
        return (
          <li
            key={job.company}
            data-stack-card
            className={cn(
              "group origin-top rounded-xl border bg-surface p-5 transition-[border-color] duration-300 hover:border-accent/60 sm:p-6",
              current ? "border-accent/30" : "border-border",
              !reduce && "lg:sticky",
            )}
            style={{ top: `${STICK_BASE_REM + i * PEEK_REM}rem`, zIndex: i + 1 }}
          >
            <p className="flex items-center gap-2 font-mono text-xs text-muted">
              {current ? (
                <LiveDot />
              ) : (
                <span aria-hidden="true" className="size-2 rounded-full bg-muted" />
              )}
              {job.start} → {current ? "present" : job.end} · {job.location}
            </p>
            <h3 className="mt-2 text-lg font-semibold">
              {job.role} <span className="text-accent">@ {job.company}</span>
            </h3>

            {job.metrics.length > 0 && (
              <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {job.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="flex flex-col-reverse rounded-lg border border-border bg-bg px-3 py-2 transition-colors group-hover:border-accent/30"
                  >
                    <dt className="font-mono text-[11px] text-muted">{m.label}</dt>
                    <dd className="text-xl font-semibold text-text">
                      <CountUp value={m.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-4 space-y-2">
              {job.highlights.map((h) => {
                const Icon = skillIcons[h.icon];
                return (
                  <li key={h.text} className="flex gap-3 text-sm leading-relaxed text-muted">
                    <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{h.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {job.stack.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
