"use client";

import { motion, useReducedMotion, useScroll, useSpring, type Variants } from "motion/react";
import { useRef } from "react";
import type { ProcessStage } from "@/lib/schemas";
import { skillIcons } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

const card: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 },
  },
};

const icon: Variants = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.25, ease: "easeOut" } },
};

/**
 * SDLC as a vertical timeline. The rail fills as you scroll; each stage card
 * fades in and pops its tool icons. Tool names show as tooltips on desktop and
 * as small labels on mobile, where hover doesn't exist.
 */
export function ProcessTimeline({ stages }: { stages: ProcessStage[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={listRef} className="relative space-y-4 pl-12 sm:pl-14">
      {/* rail */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[1.0625rem] w-0.5 rounded-full bg-border sm:left-[1.3125rem]"
      />
      <motion.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[1.0625rem] w-0.5 origin-top rounded-full bg-accent sm:left-[1.3125rem]"
        style={{ scaleY: reduce ? 1 : fill }}
      />

      {stages.map((stage, i) => {
        const StageIcon = skillIcons[stage.icon];
        return (
          <motion.li
            key={stage.id}
            className="relative"
            variants={card}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* node on the rail */}
            <span
              aria-hidden="true"
              className="absolute top-4 -left-12 flex size-9 items-center justify-center rounded-full border border-accent bg-surface text-accent sm:-left-14 sm:size-11"
            >
              <StageIcon className="size-4 sm:size-5" />
            </span>

            <div className="grid gap-4 rounded-xl border border-border bg-surface p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:gap-6 sm:p-5">
              <div>
                <p className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")} · {stage.label.toLowerCase()}
                </p>
                <h3 className="mt-1 text-base font-semibold text-text sm:text-lg">{stage.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{stage.description}</p>
              </div>

              <ul
                aria-label={`${stage.title} tools`}
                className={cn(
                  "grid gap-2",
                  "grid-cols-4 sm:gap-2",
                  stage.tools.length > 4 ? "sm:grid-cols-3" : "sm:grid-cols-2",
                )}
              >
                {stage.tools.map((tool) => {
                  const ToolIcon = skillIcons[tool.icon];
                  return (
                    <motion.li
                      key={tool.name}
                      variants={icon}
                      className="flex flex-col items-center gap-1"
                    >
                      <span
                        tabIndex={0}
                        aria-label={tool.name}
                        className="group/tool relative flex size-10 items-center justify-center rounded-lg border border-border bg-bg text-accent transition-[border-color,transform] duration-200 outline-none hover:-translate-y-0.5 hover:border-accent focus-visible:-translate-y-0.5 focus-visible:border-accent"
                      >
                        <ToolIcon className="size-5" aria-hidden="true" />
                        {/* desktop tooltip */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden -translate-x-1/2 rounded bg-text px-2 py-1 font-mono text-[11px] whitespace-nowrap text-bg opacity-0 transition-opacity group-hover/tool:opacity-100 group-focus-visible/tool:opacity-100 sm:block"
                        >
                          {tool.name}
                        </span>
                      </span>
                      {/* mobile label; the icon's aria-label is the accessible name */}
                      <span
                        aria-hidden="true"
                        className="max-w-16 text-center font-mono text-[10px] leading-tight text-muted sm:hidden"
                      >
                        {tool.name}
                      </span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
