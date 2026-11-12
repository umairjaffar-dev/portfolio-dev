"use client";

import { useInView, useReducedMotion } from "motion/react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { skillIcons } from "@/lib/skill-icons";
import type { SkillGroup } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const CYCLE_SECONDS = 4;
const channelId = (i: number) => `ch-${String(i + 1).padStart(2, "0")}`;

/**
 * Skills as a CCTV channel switcher. Channels auto-advance while the section is
 * on screen; hovering/focusing pauses, and a manual pick stops auto-play.
 */
export function SkillsConsole({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(rootRef, { amount: 0.4 });
  const reduce = useReducedMotion();
  const baseId = useId();

  const running = autoPlay && !reduce;
  const paused = hovered || !inView;
  const group = groups[active];
  const GroupIcon = skillIcons[group.icon];

  // Keep the active channel visible in the horizontal (mobile) tab scroller.
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: tab.offsetLeft - list.offsetLeft - 4, behavior: "smooth" });
  }, [active]);

  const pick = (i: number) => {
    setAutoPlay(false);
    setActive(i);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = groups.length - 1;
    const next =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? i === last
          ? 0
          : i + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? i === 0
            ? last
            : i - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    pick(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="grid gap-4 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* channel list: horizontal scroller on mobile, vertical on desktop */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Skill categories"
        aria-orientation="vertical"
        className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {groups.map((g, i) => {
          const Icon = skillIcons[g.icon];
          const selected = i === active;
          return (
            <button
              key={g.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`${baseId}-tab-${i}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "flex shrink-0 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left font-mono text-xs whitespace-nowrap transition-colors",
                "focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                selected
                  ? "border-border bg-surface text-accent"
                  : "border-transparent text-muted hover:bg-surface/60 hover:text-text",
              )}
            >
              <Icon className="size-4 shrink-0" aria-hidden="true" />
              <span>
                {channelId(i)} · {g.label.toLowerCase()}
              </span>
              {g.highlight && (
                <span aria-hidden="true" className="ml-auto size-1.5 rounded-full bg-live" />
              )}
            </button>
          );
        })}
      </div>

      {/* active feed */}
      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${active}`}
        className={cn(
          "relative overflow-hidden rounded-xl border bg-surface p-5 pb-7 sm:min-h-72",
          group.highlight ? "border-accent/40" : "border-border",
        )}
      >
        <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
          <span aria-hidden="true" className="size-1.5 animate-live-pulse rounded-full bg-alert" />
          <span>
            REC · {channelId(active)} · {group.label.toLowerCase()}
          </span>
          <span className="ml-auto text-live">{group.items.length} signals</span>
        </div>

        <h3 className="mt-4 flex items-center gap-2 text-lg font-semibold text-text">
          <GroupIcon className="size-5 text-accent" aria-hidden="true" />
          {group.label}
        </h3>

        {/* key restarts the stagger animation on every channel switch */}
        <ul key={group.id} className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {group.items.map((item, i) => {
            const Icon = skillIcons[item.icon];
            return (
              <li
                key={item.name}
                className="flex animate-fade-up items-center gap-2.5 rounded-lg border border-border bg-bg px-3 py-2.5 font-mono text-xs text-text transition-colors hover:border-accent hover:text-accent"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="min-w-0">{item.name}</span>
              </li>
            );
          })}
        </ul>

        {/* auto-advance timer */}
        {running && (
          <div
            aria-hidden="true"
            className="absolute inset-x-5 bottom-3 h-0.5 overflow-hidden rounded-full bg-border"
          >
            <div
              key={active}
              className="h-full origin-left animate-progress bg-accent"
              style={{
                ["--progress-duration" as string]: `${CYCLE_SECONDS}s`,
                animationPlayState: paused ? "paused" : "running",
              }}
              onAnimationEnd={() => setActive((i) => (i + 1) % groups.length)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
